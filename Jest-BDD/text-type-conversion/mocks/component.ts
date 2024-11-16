import {
  ComponentEntity,
  ComponentStatus,
  LanguagePrimitives,
  TComponentEntityPrimitives,
} from '../../../domain/component.entity';
import { DYNAMIC_PROP_ID } from '../../mocks/common';

type CreateComponentInput = {
  componentId: string;
  projectId?: string;
  name?: string;
  status?: ComponentStatus;
  rootDesignElementIds?: string[];
  projectRawDesignId?: string;
  originReferenceIds?: string[];
};

export const COMPONENT_ID = '88901871-42ac-44ef-bddd-abb021154389';

export const createComponentEntity = (
  input: CreateComponentInput,
): ComponentEntity => {
  const {
    componentId,
    projectId,
    name,
    status,
    rootDesignElementIds,
    projectRawDesignId,
    originReferenceIds,
  } = input;
  const createComponentData = {
    projectId: projectId || 'testProjectId',
    name: name || 'testName',
    status: status || ComponentStatus.Complete,
    rootDesignElementIds: rootDesignElementIds || [],
    projectRawDesignId: projectRawDesignId || 'testProjectRawDesignId',
    originReferenceIds: originReferenceIds || ['testOriginReferenceId'],
  };
  const componentPrimitives: TComponentEntityPrimitives = {
    id: componentId,
    projectId: createComponentData.projectId,
    name: createComponentData.name,
    status: createComponentData.status,
    type: 'plain',
    propsPassedFromParentComponent: true,
    rawDesigns: {
      projectRawDesignId: createComponentData.projectRawDesignId,
      rawDesignNodeIds: createComponentData.originReferenceIds,
    },
    rootDesignElementIds: createComponentData.rootDesignElementIds,
    componentProps: [],
  };
  return ComponentEntity.fromPrimitives(componentPrimitives);
};

export const MOCK_COMPONENT_PRIMITIVES_DYNAMIC: TComponentEntityPrimitives = {
  id: COMPONENT_ID,
  projectId: 'b82ca721-2a4c-4f6e-9ca0-583a8eda15c0',
  name: 'TextExample',
  status: ComponentStatus.Complete,
  propsPassedFromParentComponent: true,
  type: 'plain',
  componentProps: [
    {
      id: DYNAMIC_PROP_ID,
      name: 'dummy',
      type: LanguagePrimitives.STRING,
      optional: false,
    },
  ],
  rawDesigns: {
    projectRawDesignId: 'c6a76ba4-2799-41e4-9bc1-30abbfc92f10',
    rawDesignNodeIds: ['102:989'],
  },
  variants: undefined,
  rootDesignElementIds: ['9d3389fa-0bba-49de-925f-368f5d8b5bdd'],
  typography: {
    Futura: {
      weights: ['700'],
    },
  },
  palette: {
    black: {
      hex: '#000000',
      frequency: 1,
    },
  },
};

export const MOCK_COMPONENT_PRIMITIVES_STATIC: TComponentEntityPrimitives = {
  id: COMPONENT_ID,
  projectId: 'b82ca721-2a4c-4f6e-9ca0-583a8eda15c0',
  name: 'TextExample',
  status: ComponentStatus.Complete,
  propsPassedFromParentComponent: true,
  type: 'plain',
  componentProps: [],
  rawDesigns: {
    projectRawDesignId: 'c6a76ba4-2799-41e4-9bc1-30abbfc92f10',
    rawDesignNodeIds: ['102:989'],
  },
  variants: undefined,
  rootDesignElementIds: ['9d3389fa-0bba-49de-925f-368f5d8b5bdd'],
  typography: {
    Futura: {
      weights: ['700'],
    },
  },
  palette: {
    black: {
      hex: '#000000',
      frequency: 1,
    },
  },
};

export function getMockedComponent(): ComponentEntity {
  return ComponentEntity.fromPrimitives(MOCK_COMPONENT_PRIMITIVES_DYNAMIC);
}
