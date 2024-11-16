import { Mock, mock } from 'ts-jest-mocker';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { ComponentWriteRepoPort } from '../../ports/component-write.repo-port';
import { Application, ok, fail } from '@bitloops/bl-boilerplate-core';
import { resolve } from 'path';

import { ComponentEntity } from '../../domain/component.entity';

import { MOCK_USER_ID } from './mocks/common';
import { mockAsyncLocalStorage } from '@src/bounded-contexts/d2c/common/__tests__/mocks/asyncLocalStorage.mock';

import {
  MOCK_COMPONENT_PRIMITIVES_DYNAMIC,
  MOCK_COMPONENT_PRIMITIVES_DYNAMIC2,
} from './mocks/component';
import { ApplicationErrors } from '../../application/errors';
import { ChangeComponentPropNamesCommand } from '../../commands/change-component-prop-names.command';
import { ChangeComponentPropNamesCommandHandler } from '../../application/command-handlers/change-component-prop-name.handler';

const feature = loadFeature(resolve(__dirname, 'propName-change.feature'));

defineFeature(feature, (test) => {
  let changePropNameCommand: Mock<ChangeComponentPropNamesCommand>;

  let successResult;
  let componentNotFoundError;
  let unexpectedError;
  let componentPropsNotExistError;

  let componentWriteRepo: Mock<ComponentWriteRepoPort>;

  let changePropNameCommandHandler: ChangeComponentPropNamesCommandHandler;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Changing the propName of the component', ({ given, when, then }) => {
    given(
      'Data for component propName change',
      async ([changePropNameData]) => {
        componentWriteRepo = mock<ComponentWriteRepoPort>();

        mockAsyncLocalStorage(MOCK_USER_ID);

        const { elements, componentId } = changePropNameData;
        const parsedElements = JSON.parse(elements);

        const componentMockedEntity = ComponentEntity.fromPrimitives(
          MOCK_COMPONENT_PRIMITIVES_DYNAMIC,
        );
        componentWriteRepo.getByIds.mockReturnValue(
          Promise.resolve(ok([componentMockedEntity])),
        );

        componentWriteRepo.updateMany.mockResolvedValue(
          ok<void, any>(undefined),
        );

        //const parsedElements = JSON.parse(changePropNameData.elements);
        changePropNameCommand = new ChangeComponentPropNamesCommand({
          elements: parsedElements,
          componentId: componentId,
        });
        changePropNameCommandHandler =
          new ChangeComponentPropNamesCommandHandler(componentWriteRepo);
      },
    );

    when('I try to change the propName', async () => {
      successResult = await changePropNameCommandHandler.execute(
        changePropNameCommand,
      );
    });
    then('The updateMany work correctly', () => {
      expect(successResult).toBeTruthy();

      const componentMockedEntity = ComponentEntity.fromPrimitives(
        MOCK_COMPONENT_PRIMITIVES_DYNAMIC,
      );
      expect(componentWriteRepo.updateMany).toHaveBeenCalledWith([
        componentMockedEntity,
      ]);

      const componentMockedEntity2 = ComponentEntity.fromPrimitives(
        MOCK_COMPONENT_PRIMITIVES_DYNAMIC2,
      );
      expect(componentWriteRepo.updateMany).not.toHaveBeenCalledWith([
        componentMockedEntity2,
      ]);
    });
  });

  test('Try to change propName and component not found', ({
    given,
    when,
    then,
  }) => {
    given(
      'Data for component propName change',
      async ([changePropNameData]) => {
        componentWriteRepo = mock<ComponentWriteRepoPort>();

        mockAsyncLocalStorage(MOCK_USER_ID);

        const { elements, componentId } = changePropNameData;
        const parsedElements = JSON.parse(elements);

        componentWriteRepo.getByIds.mockReturnValue(Promise.resolve(ok([])));

        changePropNameCommand = new ChangeComponentPropNamesCommand({
          elements: parsedElements,
          componentId: componentId,
        });
        changePropNameCommandHandler =
          new ChangeComponentPropNamesCommandHandler(componentWriteRepo);
      },
    );

    when('I try to change the propName', async () => {
      componentNotFoundError = await changePropNameCommandHandler.execute(
        changePropNameCommand,
      );
    });
    then('I should get a ApplicationErrors.ComponentNotFoundError', () => {
      expect(componentNotFoundError.value).toBeInstanceOf(
        ApplicationErrors.ComponentNotFoundError,
      );
    });
  });

  test('Try to change propName of an component and fail unexpected', ({
    given,
    when,
    then,
  }) => {
    given(
      'Data for component propName change',
      async ([changePropNameData]) => {
        componentWriteRepo = mock<ComponentWriteRepoPort>();

        mockAsyncLocalStorage(MOCK_USER_ID);

        const { elements, componentId } = changePropNameData;
        const parsedElements = JSON.parse(elements);

        componentWriteRepo.getByIds.mockReturnValue(
          Promise.resolve(fail(new Application.Repo.Errors.Unexpected())),
        );
        changePropNameCommand = new ChangeComponentPropNamesCommand({
          elements: parsedElements,
          componentId: componentId,
        });
        changePropNameCommandHandler =
          new ChangeComponentPropNamesCommandHandler(componentWriteRepo);
      },
    );

    when('I try to change the propName', async () => {
      unexpectedError = await changePropNameCommandHandler.execute(
        changePropNameCommand,
      );
    });
    then('I should get a Application.Repo.Errors.Unexpected', () => {
      expect(unexpectedError.value).toBeInstanceOf(
        Application.Repo.Errors.Unexpected,
      );
    });
  });

  test('Try to change propName and componentProps does not exist', ({
    given,
    when,
    then,
  }) => {
    given(
      'Data for component propName change',
      async ([changePropNameData]) => {
        componentWriteRepo = mock<ComponentWriteRepoPort>();

        mockAsyncLocalStorage(MOCK_USER_ID);

        const { elements, componentId } = changePropNameData;
        const parsedElements = JSON.parse(elements);

        const componentMockedEntity = ComponentEntity.fromPrimitives(
          MOCK_COMPONENT_PRIMITIVES_DYNAMIC,
        );
        componentWriteRepo.getByIds.mockReturnValue(
          Promise.resolve(ok([componentMockedEntity])),
        );

        //const parsedElements = JSON.parse(changePropNameData.elements);
        changePropNameCommand = new ChangeComponentPropNamesCommand({
          elements: parsedElements,
          componentId: componentId,
        });
        changePropNameCommandHandler =
          new ChangeComponentPropNamesCommandHandler(componentWriteRepo);
      },
    );

    when('I try to change the propName', async () => {
      componentPropsNotExistError = await changePropNameCommandHandler.execute(
        changePropNameCommand,
      );
    });
    then(
      'I should get a ApplicationErrors.ComponentPropsElementDoesNotExistError',
      () => {
        expect(componentPropsNotExistError.value).toBeInstanceOf(
          ApplicationErrors.ComponentPropsElementDoesNotExistError,
        );
      },
    );
  });
});
