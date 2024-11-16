import { DesignElementTypes } from '../../../domain/design-element.entity';
import {
  TextElementEntity,
  TTextElementEntityPrimitives,
} from '../../../domain/text-element.entity';
import { DYNAMIC_PROP_ID } from '../../mocks/common';

export const MOCK_TITLE_TEXT_DESIGN_ELEMENT_ID =
  '9d3389fa-0bba-49de-925f-368f5d8b5bdd';
export const MOCK_TITLE_TEXT_ORIGIN_REFERENCE_ID = '102:794';
export const MOCK_TITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES_DYNAMIC: TTextElementEntityPrimitives =
  {
    componentId: '',
    zIndex: 0,
    propId: DYNAMIC_PROP_ID,
    propFunction: {
      propIds: [DYNAMIC_PROP_ID],
      implementation: '',
    },
    isDynamic: true,
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
    originReferenceIds: [MOCK_TITLE_TEXT_ORIGIN_REFERENCE_ID],
  };

export const MOCK_TITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES_STATIC: TTextElementEntityPrimitives =
  {
    componentId: '',
    zIndex: 0,
    isDynamic: false,
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
    propFunction: null,
    propId: null,
    // name: 'title',
    isTranslatable: true,
    designValue:
      'Automate, Standardize and Control Reconciliation processes in minutes',
    mediaQueries: {},
    originReferenceIds: [MOCK_TITLE_TEXT_ORIGIN_REFERENCE_ID],
  };

export const MOCK_SUBTITLE_TEXT_DESIGN_ELEMENT_ID =
  '9d3389fa-0bba-49de-925f-368f5d8b5bdd';
export const MOCK_SUBTITLE_TEXT_ORIGIN_REFERENCE_ID = '102:795';
export const MOCK_SUBTITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES: TTextElementEntityPrimitives =
  {
    componentId: '',
    zIndex: 0,
    isDynamic: false,
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
    propId: null,
    propFunction: null,
    designValue:
      'Save time, ensure accuracy and scalability, and focus \non high value-added tasks',
    mediaQueries: {},
    originReferenceIds: [MOCK_SUBTITLE_TEXT_ORIGIN_REFERENCE_ID],
  };

export function getDynamicMockedTextElements(): TextElementEntity[] {
  return [
    TextElementEntity.fromPrimitives({
      ...MOCK_TITLE_TEXT_DESIGN_ELEMENT_PRIMITIVES_DYNAMIC,
    }),
  ];
}
