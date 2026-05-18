/**
 * frontend/src/core/refresh/components/diagnostics/diagnosticsPanelConfig.ts
 *
 * UI component for diagnosticsPanelConfig.
 * Handles rendering and interactions for the shared components.
 */

import type { ClusterViewType, NamespaceViewType, ViewType } from '@/types/navigation/views';
import {
  PERMISSION_FEATURES,
  type PermissionFeatureKey,
} from '@/core/capabilities/permissionFeatures';
export { DOMAIN_REFRESHER_MAP, DOMAIN_STREAM_MAP, PRIORITY_DOMAINS } from '../../domainRegistry';

export const STALE_THRESHOLD_MS = 45_000;
export const CLUSTER_SCOPE = '__cluster__';

const OVERVIEW_FEATURES = [PERMISSION_FEATURES.clusterOverview] as const;

const CLUSTER_FEATURE_MAP: Record<ClusterViewType, readonly PermissionFeatureKey[]> = {
  nodes: [PERMISSION_FEATURES.clusterNodes, PERMISSION_FEATURES.nodeActions],
  rbac: [PERMISSION_FEATURES.clusterRBAC],
  storage: [PERMISSION_FEATURES.storageView, PERMISSION_FEATURES.storageActions],
  config: [PERMISSION_FEATURES.clusterConfig],
  crds: [PERMISSION_FEATURES.clusterCRDs],
  custom: [PERMISSION_FEATURES.clusterCustom],
  events: [PERMISSION_FEATURES.clusterEvents],
  browse: [], // Empty = show all cluster-scoped permissions (browse spans all resource types).
};

const NAMESPACE_FEATURE_MAP: Record<NamespaceViewType, readonly PermissionFeatureKey[]> = {
  browse: [], // Empty = show all namespace-scoped permissions (browse spans all resource types).
  map: [PERMISSION_FEATURES.objectMapResources],
  pods: [PERMISSION_FEATURES.namespacePods],
  workloads: [PERMISSION_FEATURES.namespaceWorkloads],
  config: [PERMISSION_FEATURES.namespaceConfig],
  network: [PERMISSION_FEATURES.namespaceNetwork],
  rbac: [PERMISSION_FEATURES.namespaceRBAC],
  storage: [PERMISSION_FEATURES.namespaceStorage],
  autoscaling: [PERMISSION_FEATURES.namespaceAutoscaling],
  quotas: [PERMISSION_FEATURES.namespaceQuotas],
  custom: [PERMISSION_FEATURES.namespaceCustom],
  helm: [PERMISSION_FEATURES.namespaceHelm],
  events: [PERMISSION_FEATURES.namespaceEvents],
};

export const getScopedFeaturesForView = (
  viewType: ViewType,
  clusterTab: ClusterViewType | null,
  namespaceTab: NamespaceViewType
): readonly PermissionFeatureKey[] => {
  if (viewType === 'overview') {
    return OVERVIEW_FEATURES;
  }
  if (viewType === 'cluster') {
    return clusterTab ? (CLUSTER_FEATURE_MAP[clusterTab] ?? []) : [];
  }
  if (viewType === 'namespace') {
    return NAMESPACE_FEATURE_MAP[namespaceTab] ?? [];
  }
  return [];
};
