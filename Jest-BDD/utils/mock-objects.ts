// import {
//   ComponentEntity,
//   ComponentStatus,
// } from '../../domain/component.entity';
// import { DesignElementTypes } from '../../domain/design-element.entity';
// import {
//   ComponentEntity,
//   ComponentStatus,
// } from '../../domain/component.entity';
import { DesignElementTypes } from '../../domain/design-element.entity';
import { TextElementEntity } from '../../domain/text-element.entity';

// export const createMockComponent = () =>
//   ComponentEntity.fromPrimitives({
//     id: 'component-id',
//     projectId: 'project-id',
//     name: 'Component Name',
//     status: ComponentStatus.Draft,
//     rootDesignElementIds: [],
//     type: 'plain',
//   });

export const createMockDesignElements = (ids: string[]) =>
  ids.map((id) =>
    TextElementEntity.fromPrimitives({
      id,
      projectId: 'project-id',
      type: DesignElementTypes.TEXT,
      children: [],
      parentId: null,
      styles: {},
      isDynamic: false,
      propId: null,
      propFunction: null,
      isTranslatable: false,
      originReferenceIds: [],
      designValue: '',
      mediaQueries: {},
      projectRawDesignId: 'project-raw-design-id',
      absolutePosition: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      zIndex: 0,
      componentId: null,
    }),
  );
