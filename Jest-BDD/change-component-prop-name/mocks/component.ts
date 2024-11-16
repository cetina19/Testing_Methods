import {
  ComponentEntity,
  ComponentStatus,
  TComponentEntityPrimitives,
} from '../../../domain/component.entity';
import { DYNAMIC_PROP_ID } from './common';

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
  id: 'ff9ab001-5873-4f3e-b613-6604dba5d1cc',
  projectId: 'b82ca721-2a4c-4f6e-9ca0-583a8eda15c0',
  name: 'HiwText',
  status: ComponentStatus.Complete,
  propsPassedFromParentComponent: true,
  type: 'plain',
  componentProps: [
    {
      id: '838c9812-32b6-4de0-96bb-fbe19436e722',
      name: 'oldName',
      type: 'string',
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
      weights: ['500'],
    },
  },
  palette: {
    black: {
      hex: '#000000',
      frequency: 1,
    },
  },
};

export const MOCK_COMPONENT_PRIMITIVES_DYNAMIC2: TComponentEntityPrimitives = {
  id: '2d5b8399-af24-4115-aeea-39cdafcc9a34',
  projectId: 'b82ca721-2a4c-4f6e-9ca0-583a8eda15c0',
  name: 'HiwText',
  status: ComponentStatus.Complete,
  propsPassedFromParentComponent: true,
  type: 'plain',
  componentProps: [
    {
      id: '6a3c490f-107f-486c-b92a-a24abb3f6fda',
      name: 'oldName',
      type: 'string',
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
      weights: ['500'],
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

export function getComponent(): ComponentEntity {
  return ComponentEntity.fromPrimitives({
    ...MOCK_COMPONENT_PRIMITIVES_DYNAMIC,
    componentProps: MOCK_COMPONENT_PRIMITIVES_DYNAMIC.componentProps.map(
      (prop) => ({
        ...prop,
        id: expect.any(String),
      }),
    ),
  });
}
