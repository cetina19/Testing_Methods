import {
  ComponentInstanceElementEntity,
  TComponentInstanceElementEntityPrimitives,
} from '../../domain/component-instance-element.entity';
import {
  ContainerElementEntity,
  TContainerElementEntityPrimitives,
} from '../../domain/container-element.entity';
import { DesignElementTypes } from '../../domain/design-element.entity';
import { DYNAMIC_PROP_ID } from './common';
import {
  TextElementEntity,
  TTextElementEntityPrimitives,
} from '../../domain/text-element.entity';

import { TUnsupportedElementEntityPrimitives } from '../../domain/unsupported-element.entity';

const MOCK_TITLE_TEXT_ORIGIN_REFERENCE_ID = '1790:3666';

type CreateComponentInstanceElementEntityInput = {
  id: string;
  componentId: string;
  variantId?: string;
  projectRawDesignId?: string;
  projectId?: string;
  name?: string;
  originReferenceIds?: string[];
};

export const MOCK_TITLE_TEXT_DESIGN_ELEMENT_ID =
  'c8dcfb5f-bca1-4c94-9d26-a3d58af199e0';
export const MOCK_UNSUPPORTED_DESIGN_ELEMENT_ID =
  'dbcc9e47-9425-46d7-a3b9-082419af7961';
export const MOCK_ITLE_TEXT_ORIGIN_REFERENCE_ID = '102:794';
export const MOCK_TITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES: TTextElementEntityPrimitives =
  {
    zIndex: 0,
    isDynamic: true,
    propId: DYNAMIC_PROP_ID,
    propFunction: {
      propIds: [DYNAMIC_PROP_ID],
      implementation: '',
    },
    projectRawDesignId: '743f09f7-ab8d-4121-b53d-d9ace45454e6',
    children: [],
    styles: {
      color: '#000000',
      opacity: '1',
      'font-family': 'Futura',
      'font-size': '32px',
      'font-weight': '700',
      'text-align': 'left',
      'vertical-align': 'top',
      'line-height': '43px',
      'letter-spacing': '0px',
      'text-transform': 'none',
      'text-decoration': 'none',
    },
    projectId: '8412fedc-06a3-4b14-aeac-6508ba71ce9c',
    type: DesignElementTypes.TEXT,
    id: MOCK_TITLE_TEXT_DESIGN_ELEMENT_ID,
    parentId: 'c2fd2d7d-cc5b-4501-88ba-79233b548928',
    absolutePosition: {
      x: 138,
      y: 247,
      width: 643,
      height: 86,
    },
    // name: 'title',
    isTranslatable: true,
    designValue:
      'Automate, Standardize and Control Reconciliation processes in minutes',
    mediaQueries: {},
    originReferenceIds: [MOCK_ITLE_TEXT_ORIGIN_REFERENCE_ID],
    componentId: null,
  };
export const MOCK_SUBTITLE_TEXT_DESIGN_ELEMENT_ID =
  '14730a94-2791-4e4b-979b-467452498461';
export const MOCK_SUBTITLE_TEXT_ORIGIN_REFERENCE_ID = '102:795';
export const MOCK_SUBTITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES: TTextElementEntityPrimitives =
  {
    zIndex: 0,
    isDynamic: true,
    propId: DYNAMIC_PROP_ID,
    propFunction: {
      propIds: [DYNAMIC_PROP_ID],
      implementation: '',
    },
    projectRawDesignId: '743f09f7-ab8d-4121-b53d-d9ace45454e6',
    children: [],
    styles: {
      color: '#c8c8c8',
      opacity: '1',
      'font-family': 'Futura',
      'font-size': '24px',
      'font-weight': '500',
      'text-align': 'left',
      'vertical-align': 'top',
      'line-height': '32px',
      'letter-spacing': '0px',
      'text-transform': 'none',
      'text-decoration': 'none',
    },
    projectId: '8412fedc-06a3-4b14-aeac-6508ba71ce9c',
    type: DesignElementTypes.TEXT,
    id: MOCK_SUBTITLE_TEXT_DESIGN_ELEMENT_ID,
    parentId: 'c2fd2d7d-cc5b-4501-88ba-79233b548928',
    absolutePosition: {
      x: 138,
      y: 373,
      width: 643,
      height: 66,
    },
    // name: 'subtitle',
    isTranslatable: true,
    designValue:
      'Save time, ensure accuracy and scalability, and focus on high value-added tasks',
    mediaQueries: {},
    originReferenceIds: [MOCK_SUBTITLE_TEXT_ORIGIN_REFERENCE_ID],
    componentId: null,
  };

export const MOCK_CONTAINER_DESIGN_ELEMENT_PRIMITIVES: TContainerElementEntityPrimitives =
  {
    parentId: null,
    zIndex: 0,
    projectRawDesignId: 'ccf1c8b2-596b-4fa9-a198-e4fed69e13cd',
    styles: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      gap: '40px',
      'max-width': '643px',
      width: '100%',
      'min-height': '192px',
    },
    projectId: '8412fedc-06a3-4b14-aeac-6508ba71ce9c',
    type: DesignElementTypes.CONTAINER,
    id: 'fe58a1bc-f60a-4f44-a3eb-01686e2aa1ff',
    absolutePosition: {
      x: 138,
      y: 247,
      width: 643,
      height: 192,
    },
    mediaQueries: {},
    children: [
      MOCK_TITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES,
      MOCK_SUBTITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES,
    ],
    originReferenceIds: [],
    componentId: null,
  };

export const mockContainerDesignElementWithTwoTexts = (
  designElementId: string,
  originReferenceIds?: string[],
) => {
  const primitives = {
    ...MOCK_CONTAINER_DESIGN_ELEMENT_PRIMITIVES,
    id: designElementId,
    originReferenceIds: originReferenceIds || [],
  };

  return ContainerElementEntity.fromPrimitives(primitives);
};

export const mockTitleDesignElementOfContainer = () => {
  return TextElementEntity.fromPrimitives(
    MOCK_TITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES,
  );
};

export const mockSubtitleDesignElementOfContainer = () => {
  return TextElementEntity.fromPrimitives(
    MOCK_SUBTITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES,
  );
};

export const mockComponentInstanceElementEntity = (
  input: CreateComponentInstanceElementEntityInput,
): ComponentInstanceElementEntity => {
  const {
    componentId,
    id,
    variantId,
    projectRawDesignId,
    projectId,
    name,
    originReferenceIds,
  } = input;
  const primitives: TComponentInstanceElementEntityPrimitives = {
    zIndex: 0,
    projectRawDesignId: projectRawDesignId || 'testProjectRawDesignId',
    children: [],
    styles: {},
    projectId: projectId || 'testProjectId',
    type: DesignElementTypes.COMPONENT_INSTANCE,
    id,
    parentId: null,
    absolutePosition: {
      x: 138,
      y: 373,
      width: 643,
      height: 66,
    },
    mediaQueries: {},
    originReferenceIds: originReferenceIds || ['103:900'],
    componentId,
    variantId: variantId || 'testVariantId',
    name: name || 'componentInstanceName',
  };
  return ComponentInstanceElementEntity.fromPrimitives(primitives);
};

export const MOCK_UNSUPPORTED_DESIGN_ELEMENT_PRIMITIVES: TUnsupportedElementEntityPrimitives =
  {
    componentId: 'ff9ab001-5873-4f3e-b613-6604dba5d1cc',
    zIndex: 0,
    projectRawDesignId: '743f09f7-ab8d-4121-b53d-d9ace45454e6',
    children: [],
    styles: {},
    projectId: '8412fedc-06a3-4b14-aeac-6508ba71ce9c',
    type: DesignElementTypes.TEXT,
    id: MOCK_UNSUPPORTED_DESIGN_ELEMENT_ID,
    parentId: null,
    absolutePosition: {
      x: 29221,
      y: -2799,
      width: 316,
      height: 396,
    },
    mediaQueries: {},
    originReferenceIds: [MOCK_TITLE_TEXT_ORIGIN_REFERENCE_ID],
    designType: 'unsupported-element',
  };
