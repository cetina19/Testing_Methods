import { airbnbCardFigmaData } from '../create-unsupported-design-elements/mocks/airbnb-figma-data.mock';
import { studioDesignFigmaData } from '@src/bounded-contexts/d2c/common/__tests__/mocks/studio-design-figma-data.mock';
import { OriginPlatforms } from '@src/bounded-contexts/d2c/common/domain/rules/InvalidOriginPlatformRule';
import { FigmaRawDesignVO } from '@src/bounded-contexts/d2c/file/domain/figma-raw-design.vo';
import {
  RawDesignNodeStatus,
  RawDesignNodeStatusReason,
  RawDesignNodeStatusVO,
} from '@src/bounded-contexts/d2c/project-raw-design/domain/raw-design-node-status.vo';
import {
  FigmaRawDesignNode,
  FigmaProjectRawDesignEntity,
} from '@src/bounded-contexts/d2c/project-raw-design/domain/figma-raw-design.entity';
import { ProjectEntity } from '@src/bounded-contexts/d2c/project/domain/project.entity';
import { invalidAirbnbCardFigmaData } from '../create-unsupported-design-elements/mocks/invalid-airbnb.mock';

export enum TestDesigns {
  AIRBNB_CARD = 'airbnb-card',
  STUDIO_DESIGN = 'studio-design',
}

export const createMockProject = (id: string): ProjectEntity =>
  ProjectEntity.fromPrimitives({
    id,
    name: 'mock-project-name',
  });

const createMockAirbnbCardFigmaRawDesign = (
  originDesignNodeId: string,
): FigmaRawDesignVO =>
  FigmaRawDesignVO.fromPrimitives({
    id: 'mock-airbnb-figma-raw-design-id',
    name: 'mock-airbnb-figma-raw-design-name',
    originPlatform: OriginPlatforms.FIGMA,
    originDesignId: originDesignNodeId,
    data: JSON.stringify(airbnbCardFigmaData),
  });

const createMockInvalidAirbnbCardFigmaRawDesign = (
  originDesignNodeId: string,
): FigmaRawDesignVO =>
  FigmaRawDesignVO.fromPrimitives({
    id: 'mock-airbnb-figma-raw-design-id',
    name: 'mock-airbnb-figma-raw-design-name',
    originPlatform: 'Invalid',
    originDesignId: originDesignNodeId,
    data: JSON.stringify(airbnbCardFigmaData),
  });

const createMockStudioDesignFigmaRawDesign = (
  originDesignNodeId: string,
): FigmaRawDesignVO =>
  FigmaRawDesignVO.fromPrimitives({
    id: 'mock-studio-figma-raw-design-id',
    name: 'mock-studio-figma-raw-design-name',
    originPlatform: OriginPlatforms.FIGMA,
    originDesignId: originDesignNodeId,
    data: JSON.stringify(studioDesignFigmaData),
  });

export const createMockFigmaRawDesign = (
  design: TestDesigns,
  originDesignNodeId: string,
): FigmaRawDesignVO => {
  const figmaRawDesignMockFunctions = {
    [TestDesigns.AIRBNB_CARD]: createMockAirbnbCardFigmaRawDesign,
    [TestDesigns.STUDIO_DESIGN]: createMockStudioDesignFigmaRawDesign,
  };
  return figmaRawDesignMockFunctions[design](originDesignNodeId);
};

export const createMockInvalidFigmaRawDesign = (
  design: TestDesigns,
  originDesignNodeId: string,
): FigmaRawDesignVO => {
  const figmaRawDesignMockFunctions = {
    [TestDesigns.AIRBNB_CARD]: createMockInvalidAirbnbCardFigmaRawDesign,
    [TestDesigns.STUDIO_DESIGN]: createMockStudioDesignFigmaRawDesign,
  };
  return figmaRawDesignMockFunctions[design](originDesignNodeId);
};

const fillFigmaDesignNodesWithCompletedStatus = (
  rootNode: FigmaRawDesignNode,
): FigmaRawDesignNode => {
  const completeStatusVO = RawDesignNodeStatusVO.fromPrimitives({
    value: RawDesignNodeStatus.Defined,
    reason: RawDesignNodeStatusReason.Complete,
  });
  FigmaProjectRawDesignEntity.traverseNode((node) => {
    if (node.metadata.status.props.value === RawDesignNodeStatus.Undefined) {
      node.metadata.status = completeStatusVO;
    }
    return true;
  }, rootNode);
  return rootNode;
};

const createMockStudioDesignFigmaProjectRawDesign = (
  projectRawDesignId: string,
  withCompletedStatus: boolean,
): FigmaProjectRawDesignEntity => {
  const initialData = FigmaProjectRawDesignEntity.addInitialStatusForFigmaNode(
    studioDesignFigmaData,
  );
  const data = withCompletedStatus
    ? fillFigmaDesignNodesWithCompletedStatus(initialData)
    : initialData;
  return FigmaProjectRawDesignEntity.fromPrimitives({
    id: projectRawDesignId,
    name: 'mock-studio-figma-project-raw-design-name',
    originPlatform: OriginPlatforms.FIGMA,
    originDesignId: '2:3',
    originFileId: 'mock-studio-figma-project-raw-design-origin-file-id',
    data,
    projectId: 'mock-studio-figma-project-raw-design-project-id',
  });
};

const createMockInvalidStudioDesignFigmaProjectRawDesign = (
  projectRawDesignId: string,
  withCompletedStatus: boolean,
): FigmaProjectRawDesignEntity => {
  const initialData = FigmaProjectRawDesignEntity.addInitialStatusForFigmaNode(
    studioDesignFigmaData,
  );
  const data = withCompletedStatus
    ? fillFigmaDesignNodesWithCompletedStatus(initialData)
    : initialData;
  return FigmaProjectRawDesignEntity.fromPrimitives({
    id: projectRawDesignId,
    name: 'mock-studio-figma-project-raw-design-name',
    originPlatform: 'Invalid',
    originDesignId: '2:3',
    originFileId: 'mock-studio-figma-project-raw-design-origin-file-id',
    data,
    projectId: 'mock-studio-figma-project-raw-design-project-id',
  });
};

const createMockAirbnbCardFigmaProjectRawDesign = (
  projectRawDesignId: string,
  withCompletedStatus: boolean,
): FigmaProjectRawDesignEntity => {
  const initialData =
    FigmaProjectRawDesignEntity.addInitialStatusForFigmaNode(
      airbnbCardFigmaData,
    );
  const data = withCompletedStatus
    ? fillFigmaDesignNodesWithCompletedStatus(initialData)
    : initialData;
  return FigmaProjectRawDesignEntity.fromPrimitives({
    id: projectRawDesignId,
    name: 'mock-airbnb-figma-project-raw-design-name',
    originPlatform: OriginPlatforms.FIGMA,
    originDesignId: '1790:3666',
    originFileId: 'mock-airbnb-figma-project-raw-design-origin-file-id',
    data,
    projectId: 'mock-airbnb-figma-project-raw-design-project-id',
  });
};

const createMockInvalidAirbnbCardFigmaProjectRawDesign = (
  projectRawDesignId: string,
  withCompletedStatus: boolean,
): FigmaProjectRawDesignEntity => {
  const initialData =
    FigmaProjectRawDesignEntity.addInitialStatusForFigmaNode(
      airbnbCardFigmaData,
    );
  const data = withCompletedStatus
    ? fillFigmaDesignNodesWithCompletedStatus(initialData)
    : initialData;
  const valid = FigmaProjectRawDesignEntity.fromPrimitives({
    id: projectRawDesignId,
    name: 'mock-airbnb-figma-project-raw-design-name',
    originPlatform: 'Invalid',
    originDesignId: '1790:3666',
    originFileId: 'mock-airbnb-figma-project-raw-design-origin-file-id',
    data,
    projectId: 'mock-airbnb-figma-project-raw-design-project-id',
  });
  //valid.setOriginPlatform(OriginPlatforms.ADOBE_XD); //new method
  return valid;
};

export const createMockFigmaProjectRawDesign = (
  //design: TestDesigns | string,
  projectRawDesignId: string,
  withCompletedStatus = false,
): FigmaProjectRawDesignEntity => {
  const figmaProjectRawDesignMockFunctions = {
    [TestDesigns.STUDIO_DESIGN]: createMockStudioDesignFigmaProjectRawDesign,
    [TestDesigns.AIRBNB_CARD]: createMockAirbnbCardFigmaProjectRawDesign,
  };
  return figmaProjectRawDesignMockFunctions[TestDesigns.AIRBNB_CARD](
    projectRawDesignId,
    withCompletedStatus,
  );
};

export const createMockInvalidFigmaProjectRawDesign = (
  //design: TestDesigns | string,
  projectRawDesignId: string,
  withCompletedStatus = false,
): FigmaProjectRawDesignEntity => {
  const figmaProjectRawDesignMockFunctions = {
    [TestDesigns.STUDIO_DESIGN]:
      createMockInvalidStudioDesignFigmaProjectRawDesign,
    [TestDesigns.AIRBNB_CARD]: createMockInvalidAirbnbCardFigmaProjectRawDesign,
  };
  return figmaProjectRawDesignMockFunctions[TestDesigns.AIRBNB_CARD](
    projectRawDesignId,
    withCompletedStatus,
  );
};
