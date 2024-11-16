import { Mock, mock } from 'ts-jest-mocker';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { GenerateCodeCommandHandler } from '../../application/command-handlers/generate-code.handler';
import { DesignElementWriteRepoPort } from '../../ports/design-element-write.repo-port';
import { ComponentWriteRepoPort } from '../../ports/component-write.repo-port';
import { ok, Infra } from '@bitloops/bl-boilerplate-core';
import { resolve } from 'path';
import { GenerateCodeCommand } from '../../commands/generate-code.command';

import { CodeGenerationOutput } from '../../domain/services/generate-code/code-generators/code-generator-port';
import { ImageWriteRepoPort } from '@src/bounded-contexts/d2c/image/ports/image-write.repo-port';
import { StorageServicePort } from '@src/bounded-contexts/d2c/image/ports/storage.service-port';
import { ComponentEntity } from '../../domain/component.entity';
import { ContainerElementEntity } from '../../domain/container-element.entity';
import { TextElementEntity } from '../../domain/text-element.entity';

import { ConfigService } from '@nestjs/config';
import { AppConfig } from '@src/config/configuration';
import {
  MOCK_CONTAINER_DESIGN_ELEMENT_PRIMITIVES,
  MOCK_SUBTITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES,
  MOCK_TITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES,
} from '../mocks/design-element';
import {
  MOCK_CONFIG_SERVICE_GET,
  MOCK_IMAGE_ELEMENT_URI,
  MOCK_USER_ID,
} from './mocks';
import { mockAsyncLocalStorage } from '@src/bounded-contexts/d2c/common/__tests__/mocks/asyncLocalStorage.mock';

import { DomainErrors } from '@src/bounded-contexts/d2c/project/domain/errors';
import { MOCK_COMPONENT_PRIMITIVES } from '../mocks/component';

const feature = loadFeature(resolve(__dirname, 'generate-code.feature'));

defineFeature(feature, (test) => {
  let generateCodeCommand: Mock<GenerateCodeCommand>;

  let generateCodeResult;
  let generateCodeResult2;
  let successResult: CodeGenerationOutput;
  let errorResult: DomainErrors.UnsupportedLanguageForCodeGenerationError;

  let designElementRepo: Mock<DesignElementWriteRepoPort>;
  let componentWriteRepo: Mock<ComponentWriteRepoPort>;
  let imageWriteRepo: Mock<ImageWriteRepoPort>;
  let storageService: Mock<StorageServicePort>;
  let eventBus: Mock<Infra.EventBus.IEventBus>;
  let configService: Mock<ConfigService<AppConfig, true>>;
  let generateCodeCommandHandler: GenerateCodeCommandHandler;

  const titleTextDesignElement = TextElementEntity.fromPrimitives(
    MOCK_TITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES,
  );
  const subtitleTextDesignElement = TextElementEntity.fromPrimitives(
    MOCK_SUBTITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES,
  );

  const designElement = ContainerElementEntity.fromPrimitives(
    MOCK_CONTAINER_DESIGN_ELEMENT_PRIMITIVES,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Generating the code', ({ given, when, then }) => {
    given('generate code data', async ([generateCodeData]) => {
      designElementRepo = mock<DesignElementWriteRepoPort>();
      componentWriteRepo = mock<ComponentWriteRepoPort>();
      imageWriteRepo = mock<ImageWriteRepoPort>();
      storageService = mock<StorageServicePort>();
      eventBus = mock<Infra.EventBus.IEventBus>();
      configService = mock<ConfigService<AppConfig, true>>();

      mockAsyncLocalStorage(MOCK_USER_ID);

      designElementRepo.getByIds.mockReturnValue(
        Promise.resolve(
          ok([titleTextDesignElement, subtitleTextDesignElement]),
        ),
      );
      const component = ComponentEntity.fromPrimitives(
        MOCK_COMPONENT_PRIMITIVES,
      );

      componentWriteRepo.getById.mockReturnValue(
        Promise.resolve(ok(component)),
      );

      componentWriteRepo.getComponentsByProjectId.mockReturnValue(
        Promise.resolve(ok([component])),
      );

      storageService.generateReadSignedUrl.mockReturnValue(
        Promise.resolve(MOCK_IMAGE_ELEMENT_URI),
      );

      designElementRepo.getByIds.mockReturnValue(
        Promise.resolve(ok([designElement])),
      );

      eventBus.publish.mockReturnValue(Promise.resolve());
      configService.get.mockReturnValue(MOCK_CONFIG_SERVICE_GET);
      componentWriteRepo.save.mockResolvedValue(ok<void, any>(undefined));

      generateCodeCommand = new GenerateCodeCommand(generateCodeData);
      generateCodeCommandHandler = new GenerateCodeCommandHandler(
        componentWriteRepo,
        designElementRepo,
        imageWriteRepo,
        storageService,
        eventBus,
        configService,
      );
    });

    when('I generate code', async () => {
      generateCodeResult = await generateCodeCommandHandler.execute(
        generateCodeCommand,
      );
    });
    then('I should get a CodeGenerationOutput Response with no errors', () => {
      successResult = generateCodeResult.value;
      expect(successResult.length).toEqual(4);
      expect(componentWriteRepo.getById).toHaveBeenCalledTimes(1);
    });
  });

  test('I try to generate code with unsupported language', ({
    given,
    when,
    then,
  }) => {
    given('generate code data', async ([generateCodeData]) => {
      designElementRepo = mock<DesignElementWriteRepoPort>();
      componentWriteRepo = mock<ComponentWriteRepoPort>();
      imageWriteRepo = mock<ImageWriteRepoPort>();
      storageService = mock<StorageServicePort>();
      eventBus = mock<Infra.EventBus.IEventBus>();
      configService = mock<ConfigService<AppConfig, true>>();

      designElementRepo.getByIds.mockReturnValue(
        Promise.resolve(
          ok([titleTextDesignElement, subtitleTextDesignElement]),
        ),
      );
      const component = ComponentEntity.fromPrimitives(
        MOCK_COMPONENT_PRIMITIVES,
      );

      componentWriteRepo.getById.mockReturnValue(
        Promise.resolve(ok(component)),
      );

      componentWriteRepo.getComponentsByProjectId.mockReturnValue(
        Promise.resolve(ok([component])),
      );

      storageService.generateReadSignedUrl.mockReturnValue(
        Promise.resolve(MOCK_IMAGE_ELEMENT_URI),
      );

      designElementRepo.getByIds.mockReturnValue(
        Promise.resolve(ok([designElement])),
      );

      eventBus.publish.mockReturnValue(Promise.resolve());
      configService.get.mockReturnValue(MOCK_CONFIG_SERVICE_GET);
      componentWriteRepo.save.mockResolvedValue(ok<void, any>(undefined));

      generateCodeCommand = new GenerateCodeCommand(generateCodeData);
      generateCodeCommandHandler = new GenerateCodeCommandHandler(
        componentWriteRepo,
        designElementRepo,
        imageWriteRepo,
        storageService,
        eventBus,
        configService,
      );
    });
    when('I generate code', async () => {
      generateCodeResult2 = await generateCodeCommandHandler.execute(
        generateCodeCommand,
      );
      console.log('generateCodeResult2', generateCodeResult2);
    });
    then(
      'I should get a DomainErrors.UnsupportedLanguageForCodeGenerationError',
      () => {
        errorResult = generateCodeResult2.value;
        expect(errorResult).toBeInstanceOf(
          DomainErrors.UnsupportedLanguageForCodeGenerationError,
        );
        expect(errorResult).not.toBeInstanceOf(
          DomainErrors.UnsupportedFrameworkForCodeGenerationError,
        );
      },
    );
  });
});
