import { Mock, mock } from 'ts-jest-mocker';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { ComponentWriteRepoPort } from '../../ports/component-write.repo-port';
import {
  ok,
  fail,
  Infra,
  Application,
  Domain,
} from '@bitloops/bl-boilerplate-core';
import { resolve } from 'path';
import { DeleteComponentCommand } from '../../commands/delete-component.command';
import { DeleteComponentCommandHandler } from '../../application/command-handlers/delete-component.handler';
import { DesignElementWriteRepoPort } from '../../ports/design-element-write.repo-port';
import { createComponentEntity } from '../mocks/component';
import {
  MOCK_ITLE_TEXT_ORIGIN_REFERENCE_ID,
  MOCK_SUBTITLE_TEXT_DESIGN_ELEMENT_ID,
  MOCK_SUBTITLE_TEXT_ORIGIN_REFERENCE_ID,
  MOCK_TITLE_TEXT_DESIGN_ELEMENT_ID,
  mockComponentInstanceElementEntity,
  mockContainerDesignElementWithTwoTexts,
  mockTitleDesignElementOfContainer,
  mockSubtitleDesignElementOfContainer,
} from '../mocks/design-element';
import { DesignElementsDeletedDomainEvent } from '../../domain/events/design-elements-deleted.domain-event';
import { ComponentPBTWriteRepoPort } from '../../ports/component-pbt-write.repo-port';

const feature = loadFeature(resolve(__dirname, 'delete-component.feature'));

defineFeature(feature, (test) => {
  let deleteComponentCommandHandler: DeleteComponentCommandHandler;

  test('Deleting a component that does not exist', ({ given, when, then }) => {
    let deleteComponentCommand;
    let deleteComponentResult;
    const designElementRepo = mock<DesignElementWriteRepoPort>();
    const componentWriteRepo = mock<ComponentWriteRepoPort>();
    const domainEventBus = mock<Infra.EventBus.IEventBus>();
    const componentPBTRepo = mock<ComponentPBTWriteRepoPort>();

    given(
      'A component with id that does not exist',
      ([deleteComponentData]) => {
        const { componentId } = deleteComponentData;

        componentWriteRepo.getById.mockReturnValue(Promise.resolve(ok(null)));

        deleteComponentCommand = new DeleteComponentCommand({
          id: componentId,
        });

        deleteComponentCommandHandler = new DeleteComponentCommandHandler(
          componentWriteRepo,
          designElementRepo,
          domainEventBus,
          componentPBTRepo,
        );
      },
    );

    when('I delete a component', async () => {
      deleteComponentResult = await deleteComponentCommandHandler.execute(
        deleteComponentCommand,
      );
    });

    then(
      'I should get an application error indicating that the component not found',
      () => {
        expect(deleteComponentResult.value).toBeInstanceOf(
          Application.Repo.Errors.NotFound,
        );
        expect(deleteComponentResult.isFail()).toBe(true);
      },
    );
  });

  test('Deleting a component', ({ given, when, then }) => {
    let deleteComponentCommand;
    let deleteComponentResult;
    const designElementRepo = mock<DesignElementWriteRepoPort>();
    const componentWriteRepo = mock<ComponentWriteRepoPort>();
    const domainEventBus = mock<Infra.EventBus.IEventBus>();
    const componentPBTRepo = mock<ComponentPBTWriteRepoPort>();

    given('A component with design elements', ([deleteComponentData]) => {
      const {
        componentId,
        rootDesignElementId,
        componentInstanceId,
        componentInstanceOriginReferenceId,
      } = deleteComponentData;

      const existingComponent = createComponentEntity({
        componentId,
        rootDesignElementIds: [rootDesignElementId],
      });
      componentWriteRepo.getById.mockReturnValue(
        Promise.resolve(ok(existingComponent)),
      );
      const mockedContainer =
        mockContainerDesignElementWithTwoTexts(rootDesignElementId);
      const mockedTitle = mockTitleDesignElementOfContainer();
      const mockedSubtitle = mockSubtitleDesignElementOfContainer();
      designElementRepo.getDesignElementsByComponentId.mockReturnValue(
        Promise.resolve(ok([mockedContainer, mockedTitle, mockedSubtitle])),
      );
      componentWriteRepo.getInstancesByComponentId.mockReturnValue(
        Promise.resolve(
          ok([
            mockComponentInstanceElementEntity({
              id: componentInstanceId,
              componentId,
              originReferenceIds: [componentInstanceOriginReferenceId],
            }),
          ]),
        ),
      );
      componentWriteRepo.delete.mockReturnValue(Promise.resolve(ok()));
      designElementRepo.deleteByIds.mockReturnValue(Promise.resolve(ok()));
      domainEventBus.publish.mockReturnValue(Promise.resolve());
      componentPBTRepo.deleteByComponentId.mockReturnValue(
        Promise.resolve(ok()),
      );

      deleteComponentCommand = new DeleteComponentCommand({
        id: componentId,
      });

      deleteComponentCommandHandler = new DeleteComponentCommandHandler(
        componentWriteRepo,
        designElementRepo,
        domainEventBus,
        componentPBTRepo,
      );
    });

    when('I delete a component', async () => {
      deleteComponentResult = await deleteComponentCommandHandler.execute(
        deleteComponentCommand,
      );
    });

    then(
      /I should get ok response with deleted component, design elements (.*) and component instance (.*) (.*)/,
      (
        rootDesignElementId: string,
        componentInstanceId: string,
        componentInstanceOriginReferenceId: string,
      ) => {
        expect(deleteComponentResult.isOk()).toBe(true);
        expect(componentWriteRepo.delete).toHaveBeenCalledTimes(1);
        expect(designElementRepo.deleteByIds).toHaveBeenCalledTimes(1);
        const designElementIdsToDelete =
          designElementRepo.deleteByIds.mock.calls[0][0];
        const expectedDesignElementIdsToBeDeleted = [
          new Domain.UUIDv4(rootDesignElementId),
          new Domain.UUIDv4(MOCK_TITLE_TEXT_DESIGN_ELEMENT_ID),
          new Domain.UUIDv4(MOCK_SUBTITLE_TEXT_DESIGN_ELEMENT_ID),
          new Domain.UUIDv4(componentInstanceId),
        ];
        expect(designElementIdsToDelete).toEqual(
          expectedDesignElementIdsToBeDeleted,
        );
        expect(domainEventBus.publish).toHaveBeenCalledTimes(1);
        const domainEvent = domainEventBus.publish.mock.calls[0][0];
        expect(domainEvent).toBeInstanceOf(DesignElementsDeletedDomainEvent);
        const expectedOriginReferenceIds = [
          MOCK_ITLE_TEXT_ORIGIN_REFERENCE_ID,
          MOCK_SUBTITLE_TEXT_ORIGIN_REFERENCE_ID,
          componentInstanceOriginReferenceId,
        ];
        expect(
          (domainEvent as DesignElementsDeletedDomainEvent).payload
            .originReferenceIds,
        ).toEqual(expectedOriginReferenceIds);
      },
    );
  });

  test('Deleting a component without design elements', ({
    given,
    when,
    then,
  }) => {
    let deleteComponentCommand;
    let deleteComponentResult;
    const designElementRepo = mock<DesignElementWriteRepoPort>();
    const componentWriteRepo = mock<ComponentWriteRepoPort>();
    const domainEventBus = mock<Infra.EventBus.IEventBus>();
    const componentPBTRepo = mock<ComponentPBTWriteRepoPort>();

    given('A component without design elements', ([deleteComponentData]) => {
      const { componentId } = deleteComponentData;

      const existingComponent = createComponentEntity({
        componentId,
      });
      componentWriteRepo.getById.mockReturnValue(
        Promise.resolve(ok(existingComponent)),
      );
      designElementRepo.getDesignElementsByComponentId.mockReturnValue(
        Promise.resolve(ok([])),
      );
      componentWriteRepo.getInstancesByComponentId.mockReturnValue(
        Promise.resolve(ok([])),
      );
      componentWriteRepo.delete.mockReturnValue(Promise.resolve(ok()));
      componentPBTRepo.deleteByComponentId.mockReturnValue(
        Promise.resolve(ok()),
      );

      deleteComponentCommand = new DeleteComponentCommand({
        id: componentId,
      });

      deleteComponentCommandHandler = new DeleteComponentCommandHandler(
        componentWriteRepo,
        designElementRepo,
        domainEventBus,
        componentPBTRepo,
      );
    });

    when('I delete a component', async () => {
      deleteComponentResult = await deleteComponentCommandHandler.execute(
        deleteComponentCommand,
      );
    });

    then('I should get ok response with deleted component', () => {
      expect(deleteComponentResult.isOk()).toBe(true);
      expect(componentWriteRepo.delete).toHaveBeenCalledTimes(1);
      expect(designElementRepo.deleteByIds).not.toHaveBeenCalled();
      expect(domainEventBus.publish).not.toHaveBeenCalled();
    });
  });
});
