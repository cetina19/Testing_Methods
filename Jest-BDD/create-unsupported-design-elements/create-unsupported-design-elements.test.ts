import { Mock, mock } from 'ts-jest-mocker';
import { defineFeature, loadFeature } from 'jest-cucumber';
import {
  Application,
  ok,
  fail,
  Infra,
  Domain,
} from '@bitloops/bl-boilerplate-core';
import { resolve } from 'path';

import { mockAsyncLocalStorage } from '@src/bounded-contexts/d2c/common/__tests__/mocks/asyncLocalStorage.mock';

import { CreateUnsupportedDesignElementsCommand } from '../../commands/create-unsupported-design-elements.command';
import { CreateUnsupportedDesignElementsCommandHandler } from '../../application/command-handlers/create-unsupported-design-elements.handler';
import { DesignElementWriteRepoPort } from '../../ports/design-element-write.repo-port';
import { ProjectRawDesignWriteRepoPort } from '@src/bounded-contexts/d2c/project-raw-design/ports/project-raw-design-write.repo-port';
import { MOCK_UNSUPPORTED_DESIGN_ELEMENT_PRIMITIVES } from '../mocks/design-element';
import { UnsupportedElementEntity } from '../../domain/unsupported-element.entity';
import {
  createMockFigmaProjectRawDesign,
  createMockInvalidFigmaProjectRawDesign,
  createMockProject,
} from '../mocks/project';
import { ProjectRawDesignEntity } from '@src/bounded-contexts/d2c/project-raw-design/domain/project-raw-design.entity';
import { FigmaProjectRawDesignEntity } from '@src/bounded-contexts/d2c/project-raw-design/domain/figma-raw-design.entity';
import { MOCK_USER_ID } from '../mocks/common';
import { UnsupportedOriginPlatformError } from '@src/bounded-contexts/d2c/common/domain/errors/unsupported-origin-platform.error';
import { DesignNodeNotFoundError } from '@src/bounded-contexts/d2c/project-raw-design/domain/errors/design-node-not-found.error';
import { ProjectRawDesignNotFoundError } from '@src/bounded-contexts/d2c/project-raw-design/application/errors/project-raw-design-not-found-error';
import { DesignElementAlreadyExistsError } from '../../application/errors/design-element-already-exists-error';
import { FigmaNodeInvalidTypeError } from '@src/bounded-contexts/d2c/project-raw-design/domain/errors/figma-node-invalid-type.error';

const feature = loadFeature(
  resolve(__dirname, 'create-unsupported-design-elements.feature'),
);

defineFeature(feature, (test) => {
  let createUnsupportedDesignElementsCommand: Mock<CreateUnsupportedDesignElementsCommand>;
  let successResult;
  let repoErrorUnsuccessful;
  let unsupportedOriginPlatformError;
  let projectNotFoundError;
  let designNodeNotFoundError;
  let invalidFigmaTypeError;
  let designElementAlreadyExistsError;

  let designElementWriteRepoPort: Mock<DesignElementWriteRepoPort>;
  let projectRawDesignWriteRepoPort: Mock<ProjectRawDesignWriteRepoPort>;
  let streamingDomainEventBus: Mock<Infra.EventBus.IEventBus>;

  let createUnsupportedDesignElementsCommandHandler: CreateUnsupportedDesignElementsCommandHandler;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Creating Unsupported Design Elements', ({ given, when, then }) => {
    given(
      'Data for unsupported design elements',
      async ([createUnsupportedDesignElementsData]) => {
        designElementWriteRepoPort = mock<DesignElementWriteRepoPort>();
        projectRawDesignWriteRepoPort = mock<ProjectRawDesignWriteRepoPort>();
        streamingDomainEventBus = mock<Infra.EventBus.IEventBus>();
        mockAsyncLocalStorage(MOCK_USER_ID);

        const {
          projectId,
          projectRawDesignId,
          componentId,
          originReferenceIds,
        } = createUnsupportedDesignElementsData;

        designElementWriteRepoPort.getLeafsByRawDesignNodeIds.mockReturnValue(
          Promise.resolve(ok([])),
        );
        projectRawDesignWriteRepoPort.getById.mockReturnValue(
          Promise.resolve(
            ok(createMockFigmaProjectRawDesign(projectRawDesignId, true)),
          ),
        );
        designElementWriteRepoPort.saveMany.mockResolvedValue(ok<void, any>());
        streamingDomainEventBus.publish.mockResolvedValue(Promise.resolve());

        createUnsupportedDesignElementsCommand =
          new CreateUnsupportedDesignElementsCommand({
            projectId: projectId,
            projectRawDesignId: projectRawDesignId,
            componentId: componentId,
            originReferenceIds: [originReferenceIds],
          });
        createUnsupportedDesignElementsCommandHandler =
          new CreateUnsupportedDesignElementsCommandHandler(
            designElementWriteRepoPort,
            projectRawDesignWriteRepoPort,
            streamingDomainEventBus,
          );
      },
    );

    when('I try to create unsupported elements', async () => {
      successResult =
        await createUnsupportedDesignElementsCommandHandler.execute(
          createUnsupportedDesignElementsCommand,
        );
    });
    then('The saveMany work correctly', () => {
      expect(successResult).toBeTruthy();
      expect(successResult.value).not.toBeNull();

      const expectedEntity = {
        _designType: 'unsupported-element',
        _originReferenceId: '1790:3666',
        _domainEvents: [],
        _id: {
          value: expect.any(String),
        },
        props: {
          projectId: '8412fedc-06a3-4b14-aeac-6508ba71ce9c',
          children: [],
          parentId: null,
          type: 'unsupported-element',
          originReferenceIds: ['1790:3666'],
          styles: {},
          mediaQueries: {},
          absolutePosition: { x: 29221, y: -2799, width: 316, height: 396 },
          projectRawDesignId: '743f09f7-ab8d-4121-b53d-d9ace45454e6',
          zIndex: 0,
          componentId: 'ff9ab001-5873-4f3e-b613-6604dba5d1cc',
          designType: 'unsupported-element',
        },
      };

      expect(designElementWriteRepoPort.saveMany).toHaveBeenCalledWith([
        expectedEntity,
      ]);
    });
  });

  test('The Handler Returns Repo Unexpected Error', ({ given, when, then }) => {
    given(
      'Data for unsupported design elements',
      async ([createUnsupportedDesignElementsData]) => {
        designElementWriteRepoPort = mock<DesignElementWriteRepoPort>();
        projectRawDesignWriteRepoPort = mock<ProjectRawDesignWriteRepoPort>();
        streamingDomainEventBus = mock<Infra.EventBus.IEventBus>();
        mockAsyncLocalStorage(MOCK_USER_ID);

        const {
          projectId,
          projectRawDesignId,
          componentId,
          originReferenceIds,
        } = createUnsupportedDesignElementsData;

        designElementWriteRepoPort.getLeafsByRawDesignNodeIds.mockReturnValue(
          Promise.resolve(fail(new Application.Repo.Errors.Unexpected())),
        );
        projectRawDesignWriteRepoPort.getById.mockReturnValue(
          Promise.resolve(
            ok(createMockFigmaProjectRawDesign(projectRawDesignId, true)),
          ),
        );
        designElementWriteRepoPort.saveMany.mockResolvedValue(ok<void, any>());
        streamingDomainEventBus.publish.mockResolvedValue(Promise.resolve());

        createUnsupportedDesignElementsCommand =
          new CreateUnsupportedDesignElementsCommand({
            projectId: projectId,
            projectRawDesignId: projectRawDesignId,
            componentId: componentId,
            originReferenceIds: [originReferenceIds],
          });
        createUnsupportedDesignElementsCommandHandler =
          new CreateUnsupportedDesignElementsCommandHandler(
            designElementWriteRepoPort,
            projectRawDesignWriteRepoPort,
            streamingDomainEventBus,
          );
      },
    );

    when('I try to create unsupported elements', async () => {
      repoErrorUnsuccessful =
        await createUnsupportedDesignElementsCommandHandler.execute(
          createUnsupportedDesignElementsCommand,
        );
    });
    then('The Application.Repo.Errors.Unexpected will be return', () => {
      expect(repoErrorUnsuccessful.value).toBeInstanceOf(
        Application.Repo.Errors.Unexpected,
      );
    });
  });

  test('The Handler Returns Design Element Already Exists Error', ({
    given,
    when,
    then,
  }) => {
    given(
      'Data for unsupported design elements',
      async ([createUnsupportedDesignElementsData]) => {
        designElementWriteRepoPort = mock<DesignElementWriteRepoPort>();
        projectRawDesignWriteRepoPort = mock<ProjectRawDesignWriteRepoPort>();
        streamingDomainEventBus = mock<Infra.EventBus.IEventBus>();
        mockAsyncLocalStorage(MOCK_USER_ID);

        const {
          projectId,
          projectRawDesignId,
          componentId,
          originReferenceIds,
        } = createUnsupportedDesignElementsData;

        const mockElement = UnsupportedElementEntity.fromPrimitives(
          MOCK_UNSUPPORTED_DESIGN_ELEMENT_PRIMITIVES,
        );
        designElementWriteRepoPort.getLeafsByRawDesignNodeIds.mockReturnValue(
          Promise.resolve(ok([mockElement])),
        );
        projectRawDesignWriteRepoPort.getById.mockReturnValue(
          Promise.resolve(
            ok(createMockFigmaProjectRawDesign(projectRawDesignId, true)),
          ),
        );
        designElementWriteRepoPort.saveMany.mockResolvedValue(ok<void, any>());
        streamingDomainEventBus.publish.mockResolvedValue(Promise.resolve());

        createUnsupportedDesignElementsCommand =
          new CreateUnsupportedDesignElementsCommand({
            projectId: projectId,
            projectRawDesignId: projectRawDesignId,
            componentId: componentId,
            originReferenceIds: [originReferenceIds],
          });
        createUnsupportedDesignElementsCommandHandler =
          new CreateUnsupportedDesignElementsCommandHandler(
            designElementWriteRepoPort,
            projectRawDesignWriteRepoPort,
            streamingDomainEventBus,
          );
      },
    );

    when('I try to create unsupported elements', async () => {
      designElementAlreadyExistsError =
        await createUnsupportedDesignElementsCommandHandler.execute(
          createUnsupportedDesignElementsCommand,
        );
    });
    then(
      'The DesignElementApplicationErrors.DesignElementAlreadyExistsError will be return',
      () => {
        expect(designElementAlreadyExistsError.value).toBeInstanceOf(
          DesignElementAlreadyExistsError,
        );
      },
    );
  });

  test.skip('The Handler Returns Unsupported Platform Error', ({
    //hardcoded OriginPlatform.FIGMA
    given,
    when,
    then,
  }) => {
    given(
      'Data for unsupported design elements',
      async ([createUnsupportedDesignElementsData]) => {
        designElementWriteRepoPort = mock<DesignElementWriteRepoPort>();
        projectRawDesignWriteRepoPort = mock<ProjectRawDesignWriteRepoPort>();
        streamingDomainEventBus = mock<Infra.EventBus.IEventBus>();
        mockAsyncLocalStorage(MOCK_USER_ID);

        const {
          projectId,
          projectRawDesignId,
          componentId,
          originReferenceIds,
        } = createUnsupportedDesignElementsData;

        designElementWriteRepoPort.getLeafsByRawDesignNodeIds.mockReturnValue(
          Promise.resolve(ok([])),
        );
        projectRawDesignWriteRepoPort.getById.mockReturnValue(
          Promise.resolve(
            ok(
              createMockInvalidFigmaProjectRawDesign(projectRawDesignId, true),
            ),
          ),
        );
        designElementWriteRepoPort.saveMany.mockResolvedValue(ok<void, any>());
        streamingDomainEventBus.publish.mockResolvedValue(Promise.resolve());

        createUnsupportedDesignElementsCommand =
          new CreateUnsupportedDesignElementsCommand({
            projectId: projectId,
            projectRawDesignId: projectRawDesignId,
            componentId: componentId,
            originReferenceIds: [originReferenceIds],
          });
        createUnsupportedDesignElementsCommandHandler =
          new CreateUnsupportedDesignElementsCommandHandler(
            designElementWriteRepoPort,
            projectRawDesignWriteRepoPort,
            streamingDomainEventBus,
          );
      },
    );

    when('I try to create unsupported elements', async () => {
      unsupportedOriginPlatformError =
        await createUnsupportedDesignElementsCommandHandler.execute(
          createUnsupportedDesignElementsCommand,
        );
    });
    then(
      'The CommonDomainErrors.UnsupportedOriginPlatformError will be return',
      () => {
        expect(unsupportedOriginPlatformError.value).toBeInstanceOf(
          UnsupportedOriginPlatformError,
        );
      },
    );
  });

  test('The Handler Returns Project Not Found Error', ({
    given,
    when,
    then,
  }) => {
    given(
      'Data for unsupported design elements',
      async ([createUnsupportedDesignElementsData]) => {
        designElementWriteRepoPort = mock<DesignElementWriteRepoPort>();
        projectRawDesignWriteRepoPort = mock<ProjectRawDesignWriteRepoPort>();
        streamingDomainEventBus = mock<Infra.EventBus.IEventBus>();
        mockAsyncLocalStorage(MOCK_USER_ID);

        const {
          projectId,
          projectRawDesignId,
          componentId,
          originReferenceIds,
        } = createUnsupportedDesignElementsData;

        designElementWriteRepoPort.getLeafsByRawDesignNodeIds.mockReturnValue(
          Promise.resolve(ok([])),
        );
        projectRawDesignWriteRepoPort.getById.mockReturnValue(
          Promise.resolve(ok()), //createMockFigmaProjectRawDesign(projectRawDesignId, true)
        );
        designElementWriteRepoPort.saveMany.mockResolvedValue(ok<void, any>());
        streamingDomainEventBus.publish.mockResolvedValue(Promise.resolve());

        createUnsupportedDesignElementsCommand =
          new CreateUnsupportedDesignElementsCommand({
            projectId: projectId,
            projectRawDesignId: projectRawDesignId,
            componentId: componentId,
            originReferenceIds: [originReferenceIds],
          });
        createUnsupportedDesignElementsCommandHandler =
          new CreateUnsupportedDesignElementsCommandHandler(
            designElementWriteRepoPort,
            projectRawDesignWriteRepoPort,
            streamingDomainEventBus,
          );
      },
    );

    when('I try to create unsupported elements', async () => {
      projectNotFoundError =
        await createUnsupportedDesignElementsCommandHandler.execute(
          createUnsupportedDesignElementsCommand,
        );
    });
    then(
      'The ProjectRawDesignDomainErrors.ProjectRawDesignNotFoundError will be return',
      () => {
        expect(projectNotFoundError.value).toBeInstanceOf(
          ProjectRawDesignNotFoundError,
        );
      },
    );
  });

  test('The Handler Returns Design Node Not Found Error', ({
    given,
    when,
    then,
  }) => {
    given(
      'Data for unsupported design elements with false originReferenceIds',
      async ([createUnsupportedDesignElementsData]) => {
        designElementWriteRepoPort = mock<DesignElementWriteRepoPort>();
        projectRawDesignWriteRepoPort = mock<ProjectRawDesignWriteRepoPort>();
        streamingDomainEventBus = mock<Infra.EventBus.IEventBus>();
        mockAsyncLocalStorage(MOCK_USER_ID);

        const {
          projectId,
          projectRawDesignId,
          componentId,
          originReferenceIds,
        } = createUnsupportedDesignElementsData;

        designElementWriteRepoPort.getLeafsByRawDesignNodeIds.mockReturnValue(
          Promise.resolve(ok([])),
        );
        projectRawDesignWriteRepoPort.getById.mockReturnValue(
          Promise.resolve(
            ok(createMockFigmaProjectRawDesign(projectRawDesignId, true)),
          ),
        );
        designElementWriteRepoPort.saveMany.mockResolvedValue(ok<void, any>());
        streamingDomainEventBus.publish.mockResolvedValue(Promise.resolve());

        createUnsupportedDesignElementsCommand =
          new CreateUnsupportedDesignElementsCommand({
            projectId: projectId,
            projectRawDesignId: projectRawDesignId,
            componentId: componentId,
            originReferenceIds: [originReferenceIds],
          });
        createUnsupportedDesignElementsCommandHandler =
          new CreateUnsupportedDesignElementsCommandHandler(
            designElementWriteRepoPort,
            projectRawDesignWriteRepoPort,
            streamingDomainEventBus,
          );
      },
    );

    when('I try to create unsupported elements', async () => {
      designNodeNotFoundError =
        await createUnsupportedDesignElementsCommandHandler.execute(
          createUnsupportedDesignElementsCommand,
        );
    });
    then(
      'The ProjectRawDesignDomainErrors.DesignNodeNotFoundError will be return',
      () => {
        expect(designNodeNotFoundError.value).toBeInstanceOf(
          DesignNodeNotFoundError,
        );
      },
    );
  });


  test.skip('The Handler Returns Figma Node Invalid Type Error', ({
    given,
    when,
    then,
  }) => {
    given(
      'Data for unsupported design elements',
      async ([createUnsupportedDesignElementsData]) => {
        designElementWriteRepoPort = mock<DesignElementWriteRepoPort>();
        projectRawDesignWriteRepoPort = mock<ProjectRawDesignWriteRepoPort>();
        streamingDomainEventBus = mock<Infra.EventBus.IEventBus>();
        mockAsyncLocalStorage(MOCK_USER_ID);

        const {
          projectId,
          projectRawDesignId,
          componentId,
          originReferenceIds,
        } = createUnsupportedDesignElementsData;

        const mockElement = UnsupportedElementEntity.fromPrimitives(
          MOCK_UNSUPPORTED_DESIGN_ELEMENT_PRIMITIVES,
        );
        designElementWriteRepoPort.getLeafsByRawDesignNodeIds.mockReturnValue(
          Promise.resolve(ok([])),
        );
        projectRawDesignWriteRepoPort.getById.mockReturnValue(
          Promise.resolve(
            ok(createMockFigmaProjectRawDesign(projectRawDesignId, true)),
          ),
        );
        designElementWriteRepoPort.saveMany.mockResolvedValue(ok<void, any>());
        streamingDomainEventBus.publish.mockResolvedValue(Promise.resolve());

        createUnsupportedDesignElementsCommand =
          new CreateUnsupportedDesignElementsCommand({
            projectId: projectId,
            projectRawDesignId: projectRawDesignId,
            componentId: componentId,
            originReferenceIds: [originReferenceIds],
          });
        createUnsupportedDesignElementsCommandHandler =
          new CreateUnsupportedDesignElementsCommandHandler(
            designElementWriteRepoPort,
            projectRawDesignWriteRepoPort,
            streamingDomainEventBus,
          );
      },
    );

    when('I try to create unsupported elements', async () => {
      invalidFigmaTypeError =
        await createUnsupportedDesignElementsCommandHandler.execute(
          createUnsupportedDesignElementsCommand,
        );
    });
    then(
      'The ProjectRawDesignDomainErrors.FigmaNodeInvalidTypeError will be return',
      () => {
        expect(invalidFigmaTypeError.value).toBeInstanceOf(
          FigmaNodeInvalidTypeError,
        );
      },
    );
  });

});
