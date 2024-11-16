import { Mock, mock } from 'ts-jest-mocker';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { DesignElementWriteRepoPort } from '../../ports/design-element-write.repo-port';
import { ComponentWriteRepoPort } from '../../ports/component-write.repo-port';
import { ok, Application, fail } from '@bitloops/bl-boilerplate-core';
import { resolve } from 'path';

import { ComponentEntity } from '../../domain/component.entity';
import { TextElementEntity } from '../../domain/text-element.entity';

import {
  getDynamicMockedTextElements,
  MOCK_SUBTITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES,
  MOCK_TITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES_DYNAMIC,
  MOCK_TITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES_STATIC,
} from './mocks/design-element';
import { MOCK_USER_ID } from './mocks/common';
import { mockAsyncLocalStorage } from '@src/bounded-contexts/d2c/common/__tests__/mocks/asyncLocalStorage.mock';

import { DomainErrors } from '@src/bounded-contexts/d2c/design-building-blocks/domain/errors';
import { ApplicationErrors } from '@src/bounded-contexts/d2c/design-building-blocks/application/errors';
import {
  getMockedComponent,
  MOCK_COMPONENT_PRIMITIVES_DYNAMIC,
  MOCK_COMPONENT_PRIMITIVES_STATIC,
} from './mocks/component';
import { ChangeTextsTypeCommand } from '../../commands/change-texts-dynamic-static.command';
import { ChangeTextsTypeCommandHandler } from '../../application/command-handlers/change-texts-dynamic-static-text.handler';

const feature = loadFeature(resolve(__dirname, 'conversion.feature'));

defineFeature(feature, (test) => {
  let makingTextStaticCommand: Mock<ChangeTextsTypeCommand>;
  let makingTextDynamicCommand: Mock<ChangeTextsTypeCommand>;

  let successResultStatic;
  let successResultDynamic;
  let notADynamicElementError;
  let notAStaticElementError;
  let designElementsNotFoundError;
  let unexpectedError;
  let componentNotFoundError;

  let designElementRepo: Mock<DesignElementWriteRepoPort>;
  let componentWriteRepo: Mock<ComponentWriteRepoPort>;

  let makingTextStaticCommandHandler: ChangeTextsTypeCommandHandler;
  let makingTextDynamicCommandHandler: ChangeTextsTypeCommandHandler;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Making A Text Dynamic To Static', ({ given, when, then }) => {
    given(
      'Data for text dynamic type change to static text',
      async ([makeTextStaticData]) => {
        designElementRepo = mock<DesignElementWriteRepoPort>();
        componentWriteRepo = mock<ComponentWriteRepoPort>();

        mockAsyncLocalStorage(MOCK_USER_ID);

        const { elements, componentId } = makeTextStaticData;
        const designElementMockedEntity = TextElementEntity.fromPrimitives(
          MOCK_TITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES_DYNAMIC,
        );

        designElementRepo.getByIds.mockReturnValue(
          Promise.resolve(ok([designElementMockedEntity])),
        );

        const componentMockedEntity = ComponentEntity.fromPrimitives(
          MOCK_COMPONENT_PRIMITIVES_DYNAMIC,
        );
        componentWriteRepo.getByIds.mockReturnValue(
          Promise.resolve(ok([componentMockedEntity])),
        );

        componentWriteRepo.update.mockResolvedValue(ok<void, any>(undefined));
        designElementRepo.updateMany.mockResolvedValue(
          ok<void, any>(undefined),
        );

        const parsedElements = JSON.parse(elements);
        makingTextStaticCommand = new ChangeTextsTypeCommand({
          elements: parsedElements,
          componentId: componentId,
        });
        makingTextStaticCommandHandler = new ChangeTextsTypeCommandHandler(
          designElementRepo,
          componentWriteRepo,
        );
      },
    );

    when('I try to change the text type', async () => {
      successResultStatic = await makingTextStaticCommandHandler.execute(
        makingTextStaticCommand,
      );
    });
    then('The update and updateMany work correctly', () => {
      expect(successResultStatic).toBeTruthy();
      const textMockedEntities = [
        TextElementEntity.fromPrimitives(
          MOCK_TITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES_STATIC,
        ),
      ];
      const expectedMockedTextEntities = textMockedEntities.map(() =>
        expect.objectContaining({
          designElementFunction: expect.objectContaining({
            implementation: expect.any(String),
            propIds: expect.arrayContaining([expect.any(String)]),
          }),
        }),
      );
      const componentMockedEntity = ComponentEntity.fromPrimitives(
        MOCK_COMPONENT_PRIMITIVES_STATIC,
      );
      expect(componentWriteRepo.update).toHaveBeenCalledWith(
        componentMockedEntity,
      );
      expect(designElementRepo.updateMany).toHaveBeenCalledWith(
        expectedMockedTextEntities,
      );
    });
  });
  test('Try To Make A Static Text To Static', ({ given, when, then }) => {
    given(
      'Data for text static type change to static text',
      async ([makeTextStaticData]) => {
        designElementRepo = mock<DesignElementWriteRepoPort>();
        componentWriteRepo = mock<ComponentWriteRepoPort>();

        const designElementMockedEntity = TextElementEntity.fromPrimitives(
          MOCK_SUBTITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES,
        );
        designElementRepo.getByIds.mockReturnValue(
          Promise.resolve(ok([designElementMockedEntity])),
        );

        designElementRepo.updateMany.mockResolvedValue(
          Promise.resolve(ok<void, any>(undefined)),
        );

        const componentMockedEntity = ComponentEntity.fromPrimitives(
          MOCK_COMPONENT_PRIMITIVES_STATIC,
        );

        componentWriteRepo.getByIds.mockReturnValue(
          Promise.resolve(ok([componentMockedEntity])),
        );
        componentWriteRepo.update.mockReturnValue(
          Promise.resolve(ok<void, any>(undefined)),
        );

        const { elements, componentId } = makeTextStaticData;

        const parsedElements = JSON.parse(elements);

        makingTextStaticCommand = new ChangeTextsTypeCommand({
          elements: parsedElements,
          componentId: componentId,
        });
        makingTextStaticCommandHandler = new ChangeTextsTypeCommandHandler(
          designElementRepo,
          componentWriteRepo,
        );
      },
    );
    when('I try to change the text type', async () => {
      notADynamicElementError = await makingTextStaticCommandHandler.execute(
        makingTextStaticCommand,
      );
      console.log(notADynamicElementError);
    });
    then('I should get a DomainErrors.NotADynamicElementError', () => {
      console.log(notADynamicElementError);
      expect(notADynamicElementError.value).toBeInstanceOf(
        DomainErrors.NotADynamicElementError,
      );
    });
  });

  test('Try To Change The (Dynamic/Static) Type Of A Text Which Does Not Exist In The Repository', ({
    given,
    when,
    then,
  }) => {
    given(
      'A (Dynamic/Static) change is requested for a non existent text element',
      async ([makeTextStaticData]) => {
        designElementRepo = mock<DesignElementWriteRepoPort>();
        componentWriteRepo = mock<ComponentWriteRepoPort>();

        designElementRepo.getByIds.mockReturnValue(Promise.resolve(ok([])));

        designElementRepo.updateMany.mockResolvedValue(
          Promise.resolve(ok<void, any>(undefined)),
        );

        const componentMockedEntity = ComponentEntity.fromPrimitives(
          MOCK_COMPONENT_PRIMITIVES_STATIC,
        );

        componentWriteRepo.getByIds.mockReturnValue(
          Promise.resolve(ok([componentMockedEntity])),
        );

        const { elements, componentId } = makeTextStaticData;

        const parsedElements = JSON.parse(elements);

        makingTextStaticCommand = new ChangeTextsTypeCommand({
          elements: parsedElements,
          componentId: componentId,
        });
        makingTextStaticCommandHandler = new ChangeTextsTypeCommandHandler(
          designElementRepo,
          componentWriteRepo,
        );
      },
    );
    when('I try to change the text type', async () => {
      designElementsNotFoundError =
        await makingTextStaticCommandHandler.execute(makingTextStaticCommand);
    });
    then('I should get a ApplicationErrors.DesignElementsNotFoundError', () => {
      expect(designElementsNotFoundError.value).toBeInstanceOf(
        ApplicationErrors.DesignElementsNotFoundError,
      );
    });
  });

  test('Try To Change A Static Text And Fail Unexpected', ({
    given,
    when,
    then,
  }) => {
    given('Data for text static type change', async ([makeTextStaticData]) => {
      designElementRepo = mock<DesignElementWriteRepoPort>();
      componentWriteRepo = mock<ComponentWriteRepoPort>();

      designElementRepo.getByIds.mockReturnValue(
        Promise.resolve(
          fail(
            new Application.Repo.Errors.Unexpected(
              'Getting Text Elements Failed',
            ),
          ),
        ),
      );

      const { elements, componentId } = makeTextStaticData;

      const parsedElements = JSON.parse(elements);

      makingTextStaticCommand = new ChangeTextsTypeCommand({
        elements: parsedElements,
        componentId: componentId,
      });
      makingTextStaticCommandHandler = new ChangeTextsTypeCommandHandler(
        designElementRepo,
        componentWriteRepo,
      );
    });
    when('I try to change the text type', async () => {
      unexpectedError = await makingTextStaticCommandHandler.execute(
        makingTextStaticCommand,
      );
    });
    then('I should get a Application.Repo.Errors.Unexpected', () => {
      expect(unexpectedError.value).toBeInstanceOf(
        Application.Repo.Errors.Unexpected,
      );
    });
  });

  test('Try To Change A Static Text And Component Not Found', ({
    given,
    when,
    then,
  }) => {
    given('Data for text static type change', async ([makeTextStaticData]) => {
      designElementRepo = mock<DesignElementWriteRepoPort>();
      componentWriteRepo = mock<ComponentWriteRepoPort>();
      const designMockedEntity = TextElementEntity.fromPrimitives(
        MOCK_TITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES_DYNAMIC,
      );

      designElementRepo.getByIds.mockReturnValue(
        Promise.resolve(ok([designMockedEntity])),
      );

      designElementRepo.updateMany.mockResolvedValue(
        Promise.resolve(ok<void, any>(undefined)),
      );

      const { elements, componentId } = makeTextStaticData;

      componentWriteRepo.getByIds.mockReturnValue(Promise.resolve(ok([])));

      const parsedElements = JSON.parse(elements);

      makingTextStaticCommand = new ChangeTextsTypeCommand({
        elements: parsedElements,
        componentId: componentId,
      });
      makingTextStaticCommandHandler = new ChangeTextsTypeCommandHandler(
        designElementRepo,
        componentWriteRepo,
      );
    });
    when('I try to change the text type', async () => {
      componentNotFoundError = await makingTextStaticCommandHandler.execute(
        makingTextStaticCommand,
      );
    });
    then('I should get a ApplicationErrors.ComponentNotFoundError', () => {
      expect(componentNotFoundError.value).toBeInstanceOf(
        ApplicationErrors.ComponentNotFoundError,
      );
    });
  });

  test('Making A Text Static To Dynamic', ({ given, when, then }) => {
    given(
      'Data for text static type change to dynamic text',
      async ([makeTextDynamicData]) => {
        designElementRepo = mock<DesignElementWriteRepoPort>();
        componentWriteRepo = mock<ComponentWriteRepoPort>();
        mockAsyncLocalStorage(MOCK_USER_ID);

        const { elements, componentId } = makeTextDynamicData;
        const designElementMockedEntity = TextElementEntity.fromPrimitives(
          MOCK_TITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES_STATIC,
        );

        designElementRepo.getByIds.mockReturnValue(
          Promise.resolve(ok([designElementMockedEntity])),
        );

        const componentMockedEntity = ComponentEntity.fromPrimitives(
          MOCK_COMPONENT_PRIMITIVES_STATIC,
        );
        componentWriteRepo.getByIds.mockReturnValue(
          Promise.resolve(ok([componentMockedEntity])),
        );

        componentWriteRepo.update.mockResolvedValue(ok<void, any>(undefined));
        designElementRepo.updateMany.mockResolvedValue(
          ok<void, any>(undefined),
        );

        const parsedElements = JSON.parse(elements);
        makingTextDynamicCommand = new ChangeTextsTypeCommand({
          elements: parsedElements,
          componentId: componentId,
        });
        makingTextDynamicCommandHandler = new ChangeTextsTypeCommandHandler(
          designElementRepo,
          componentWriteRepo,
        );
      },
    );

    when('I try to change the text type', async () => {
      successResultDynamic = await makingTextDynamicCommandHandler.execute(
        makingTextDynamicCommand,
      );
    });
    then('The update and updateMany work correctly', () => {
      expect(successResultDynamic.isOk()).toBeTruthy();

      const textMockedEntities = getDynamicMockedTextElements();
      const expectedTextMockedEntities = textMockedEntities.map(() =>
        expect.objectContaining({
          props: expect.objectContaining({
            propId: expect.any(String),
          }),
        }),
      );

      expect(designElementRepo.updateMany).toHaveBeenCalledWith(
        expectedTextMockedEntities,
      );

      const componentMockedEntity = getMockedComponent();

      const expectedComponentMockedEntity = {
        ...componentMockedEntity,
        props: {
          ...componentMockedEntity.props,
          componentProps: componentMockedEntity.props.componentProps.map(
            (prop) => ({
              ...prop,
              id: expect.anything(),
            }),
          ),
        },
      };

      expect(componentWriteRepo.update).toHaveBeenCalledWith(
        expectedComponentMockedEntity,
      );
    });
  });
  test('Try To Make A Dynamic Text To Dynamic', ({ given, when, then }) => {
    given(
      'Data for text dynamic type change to dynamic text',
      async ([makeTextDynamicData]) => {
        designElementRepo = mock<DesignElementWriteRepoPort>();
        componentWriteRepo = mock<ComponentWriteRepoPort>();

        const designElementMockedEntity = TextElementEntity.fromPrimitives(
          MOCK_TITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES_DYNAMIC,
        );
        designElementRepo.getByIds.mockReturnValue(
          Promise.resolve(ok([designElementMockedEntity])),
        );

        designElementRepo.updateMany.mockResolvedValue(
          Promise.resolve(ok<void, any>(undefined)),
        );

        const component = ComponentEntity.fromPrimitives(
          MOCK_COMPONENT_PRIMITIVES_DYNAMIC,
        );

        componentWriteRepo.getByIds.mockReturnValue(
          Promise.resolve(ok([component])),
        );

        componentWriteRepo.update.mockResolvedValue(ok<void, any>(undefined));
        const { elements, componentId } = makeTextDynamicData;

        const parsedElements = JSON.parse(elements);

        makingTextDynamicCommand = new ChangeTextsTypeCommand({
          elements: parsedElements,
          componentId: componentId,
        });
        makingTextDynamicCommandHandler = new ChangeTextsTypeCommandHandler(
          designElementRepo,
          componentWriteRepo,
        );
      },
    );
    when('I try to change the text type', async () => {
      notAStaticElementError = await makingTextDynamicCommandHandler.execute(
        makingTextDynamicCommand,
      );
    });
    then('I should get a DomainErrors.NotAStaticElementError', () => {
      expect(notAStaticElementError.value).toBeInstanceOf(
        DomainErrors.NotAStaticElementError,
      );
      expect(componentWriteRepo.getByIds).toHaveBeenCalled();
    });
  });
});
