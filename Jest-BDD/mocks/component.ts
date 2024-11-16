import {
  ComponentEntity,
  ComponentStatus,
  TComponentEntityPrimitives,
} from '../../domain/component.entity';
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

export const MOCK_COMPONENT_PRIMITIVES: TComponentEntityPrimitives = {
  propsPassedFromParentComponent: true,
  name: 'TextComponent',
  id: '3339b751-c398-4b72-a60e-6fdfe6e1c4a7',
  type: 'plain',
  projectId: '8412fedc-06a3-4b14-aeac-6508ba71ce9c',
  status: ComponentStatus.RawDesignsDefined,
  variants: undefined,
  rawDesigns: {
    projectRawDesignId: '4c8cf00d-b380-4572-9f9d-8dc4bbcc0700',
    rawDesignNodeIds: ['102:793'],
  },
  rootDesignElementIds: [],
  componentProps: [
    {
      id: DYNAMIC_PROP_ID,
      name: 'testingProp',
      type: 'string',
    },
  ],
};
