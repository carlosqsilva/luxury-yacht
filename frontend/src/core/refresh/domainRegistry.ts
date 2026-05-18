import {
  CLUSTER_REFRESHERS,
  NAMESPACE_REFRESHERS,
  SYSTEM_REFRESHERS,
  type StaticRefresherName,
} from './refresherTypes';
import type { RefreshDomain } from './types';

export type DomainCategory = 'system' | 'cluster' | 'namespace';

export type StreamTelemetryName = 'resources' | 'events' | 'catalog' | 'container-logs';

export interface RefresherTiming {
  interval: number;
  cooldown: number;
  timeout: number;
}

export interface RefreshDomainDescriptor<D extends RefreshDomain = RefreshDomain> {
  domain: D;
  refresherName: StaticRefresherName;
  category: DomainCategory;
  timing: RefresherTiming;
  metricsInterval?: boolean;
  diagnosticsStream?: StreamTelemetryName;
  priority?: number;
}

export const REFRESH_DOMAIN_DESCRIPTORS = {
  namespaces: {
    domain: 'namespaces',
    refresherName: SYSTEM_REFRESHERS.namespaces,
    category: 'system',
    timing: { interval: 2000, cooldown: 1000, timeout: 10 },
    priority: 0,
  },
  'cluster-overview': {
    domain: 'cluster-overview',
    refresherName: SYSTEM_REFRESHERS.clusterOverview,
    category: 'system',
    timing: { interval: 10000, cooldown: 1000, timeout: 10 },
    priority: 3,
  },
  nodes: {
    domain: 'nodes',
    refresherName: CLUSTER_REFRESHERS.nodes,
    category: 'cluster',
    timing: { interval: 5000, cooldown: 1000, timeout: 10 },
    metricsInterval: true,
    diagnosticsStream: 'resources',
    priority: 1,
  },
  'object-maintenance': {
    domain: 'object-maintenance',
    refresherName: SYSTEM_REFRESHERS.objectMaintenance,
    category: 'system',
    timing: { interval: 5000, cooldown: 1000, timeout: 10 },
    priority: 2,
  },
  pods: {
    domain: 'pods',
    refresherName: SYSTEM_REFRESHERS.unifiedPods,
    category: 'system',
    timing: { interval: 5000, cooldown: 1000, timeout: 30 },
    metricsInterval: true,
    diagnosticsStream: 'resources',
  },
  'object-details': {
    domain: 'object-details',
    refresherName: SYSTEM_REFRESHERS.objectDetails,
    category: 'system',
    timing: { interval: 10000, cooldown: 1000, timeout: 10 },
  },
  'object-events': {
    domain: 'object-events',
    refresherName: SYSTEM_REFRESHERS.objectEvents,
    category: 'system',
    timing: { interval: 10000, cooldown: 1000, timeout: 10 },
  },
  'object-map': {
    domain: 'object-map',
    refresherName: SYSTEM_REFRESHERS.objectMap,
    category: 'system',
    timing: { interval: 2000, cooldown: 1000, timeout: 10 },
  },
  'object-yaml': {
    domain: 'object-yaml',
    refresherName: SYSTEM_REFRESHERS.objectYaml,
    category: 'system',
    timing: { interval: 5000, cooldown: 1000, timeout: 10 },
  },
  'object-helm-manifest': {
    domain: 'object-helm-manifest',
    refresherName: SYSTEM_REFRESHERS.objectHelmManifest,
    category: 'system',
    timing: { interval: 5000, cooldown: 1000, timeout: 10 },
  },
  'object-helm-values': {
    domain: 'object-helm-values',
    refresherName: SYSTEM_REFRESHERS.objectHelmValues,
    category: 'system',
    timing: { interval: 5000, cooldown: 1000, timeout: 10 },
  },
  'container-logs': {
    domain: 'container-logs',
    refresherName: SYSTEM_REFRESHERS.containerLogs,
    category: 'system',
    timing: { interval: 5000, cooldown: 1000, timeout: 10 },
    diagnosticsStream: 'container-logs',
  },
  'cluster-rbac': {
    domain: 'cluster-rbac',
    refresherName: CLUSTER_REFRESHERS.rbac,
    category: 'cluster',
    timing: { interval: 10000, cooldown: 1000, timeout: 10 },
    diagnosticsStream: 'resources',
  },
  'cluster-storage': {
    domain: 'cluster-storage',
    refresherName: CLUSTER_REFRESHERS.storage,
    category: 'cluster',
    timing: { interval: 10000, cooldown: 1000, timeout: 10 },
    diagnosticsStream: 'resources',
  },
  'cluster-config': {
    domain: 'cluster-config',
    refresherName: CLUSTER_REFRESHERS.config,
    category: 'cluster',
    timing: { interval: 10000, cooldown: 1000, timeout: 10 },
    diagnosticsStream: 'resources',
  },
  'cluster-crds': {
    domain: 'cluster-crds',
    refresherName: CLUSTER_REFRESHERS.crds,
    category: 'cluster',
    timing: { interval: 15000, cooldown: 1000, timeout: 60 },
    diagnosticsStream: 'resources',
  },
  'cluster-custom': {
    domain: 'cluster-custom',
    refresherName: CLUSTER_REFRESHERS.custom,
    category: 'cluster',
    timing: { interval: 15000, cooldown: 1000, timeout: 60 },
    diagnosticsStream: 'resources',
  },
  'cluster-events': {
    domain: 'cluster-events',
    refresherName: CLUSTER_REFRESHERS.events,
    category: 'cluster',
    timing: { interval: 3000, cooldown: 1000, timeout: 10 },
    diagnosticsStream: 'events',
  },
  catalog: {
    domain: 'catalog',
    refresherName: CLUSTER_REFRESHERS.browse,
    category: 'cluster',
    timing: { interval: 15000, cooldown: 1500, timeout: 30 },
    diagnosticsStream: 'catalog',
    priority: 4,
  },
  'catalog-diff': {
    domain: 'catalog-diff',
    refresherName: CLUSTER_REFRESHERS.catalogDiff,
    category: 'cluster',
    timing: { interval: 15000, cooldown: 1500, timeout: 30 },
  },
  'namespace-workloads': {
    domain: 'namespace-workloads',
    refresherName: NAMESPACE_REFRESHERS.workloads,
    category: 'namespace',
    timing: { interval: 5000, cooldown: 500, timeout: 10 },
    metricsInterval: true,
    diagnosticsStream: 'resources',
    priority: 5,
  },
  'namespace-config': {
    domain: 'namespace-config',
    refresherName: NAMESPACE_REFRESHERS.config,
    category: 'namespace',
    timing: { interval: 5000, cooldown: 1000, timeout: 10 },
    diagnosticsStream: 'resources',
  },
  'namespace-network': {
    domain: 'namespace-network',
    refresherName: NAMESPACE_REFRESHERS.network,
    category: 'namespace',
    timing: { interval: 5000, cooldown: 1000, timeout: 10 },
    diagnosticsStream: 'resources',
  },
  'namespace-rbac': {
    domain: 'namespace-rbac',
    refresherName: NAMESPACE_REFRESHERS.rbac,
    category: 'namespace',
    timing: { interval: 10000, cooldown: 1000, timeout: 10 },
    diagnosticsStream: 'resources',
  },
  'namespace-storage': {
    domain: 'namespace-storage',
    refresherName: NAMESPACE_REFRESHERS.storage,
    category: 'namespace',
    timing: { interval: 10000, cooldown: 1000, timeout: 10 },
    diagnosticsStream: 'resources',
  },
  'namespace-autoscaling': {
    domain: 'namespace-autoscaling',
    refresherName: NAMESPACE_REFRESHERS.autoscaling,
    category: 'namespace',
    timing: { interval: 5000, cooldown: 1000, timeout: 10 },
    diagnosticsStream: 'resources',
  },
  'namespace-quotas': {
    domain: 'namespace-quotas',
    refresherName: NAMESPACE_REFRESHERS.quotas,
    category: 'namespace',
    timing: { interval: 10000, cooldown: 1000, timeout: 10 },
    diagnosticsStream: 'resources',
  },
  'namespace-events': {
    domain: 'namespace-events',
    refresherName: NAMESPACE_REFRESHERS.events,
    category: 'namespace',
    timing: { interval: 3000, cooldown: 1000, timeout: 10 },
    diagnosticsStream: 'events',
  },
  'namespace-custom': {
    domain: 'namespace-custom',
    refresherName: NAMESPACE_REFRESHERS.custom,
    category: 'namespace',
    timing: { interval: 10000, cooldown: 1000, timeout: 60 },
    diagnosticsStream: 'resources',
  },
  'namespace-helm': {
    domain: 'namespace-helm',
    refresherName: NAMESPACE_REFRESHERS.helm,
    category: 'namespace',
    timing: { interval: 10000, cooldown: 1000, timeout: 10 },
    diagnosticsStream: 'resources',
  },
} as const satisfies { [D in RefreshDomain]: RefreshDomainDescriptor<D> };

export const refreshDomainDescriptors = Object.values(
  REFRESH_DOMAIN_DESCRIPTORS
) as RefreshDomainDescriptor[];

export const getRefreshDomainDescriptor = <D extends RefreshDomain>(
  domain: D
): RefreshDomainDescriptor<D> => REFRESH_DOMAIN_DESCRIPTORS[domain] as RefreshDomainDescriptor<D>;

export const DOMAIN_REFRESHER_MAP = Object.fromEntries(
  refreshDomainDescriptors.map((descriptor) => [descriptor.domain, descriptor.refresherName])
) as Record<RefreshDomain, StaticRefresherName>;

export const DOMAIN_STREAM_MAP = Object.fromEntries(
  refreshDomainDescriptors
    .filter((descriptor) => descriptor.diagnosticsStream)
    .map((descriptor) => [descriptor.domain, descriptor.diagnosticsStream])
) as Partial<Record<RefreshDomain, StreamTelemetryName>>;

export const PRIORITY_DOMAINS = refreshDomainDescriptors
  .filter((descriptor) => descriptor.priority !== undefined)
  .sort((left, right) => left.priority! - right.priority!)
  .map((descriptor) => descriptor.domain);

export const REFRESHER_TIMING_BY_NAME = Object.fromEntries(
  refreshDomainDescriptors.map((descriptor) => [descriptor.refresherName, descriptor.timing])
) as Partial<Record<StaticRefresherName, RefresherTiming>>;

export const METRICS_INTERVAL_REFRESHERS = new Set<StaticRefresherName>(
  refreshDomainDescriptors
    .filter((descriptor) => descriptor.metricsInterval)
    .map((descriptor) => descriptor.refresherName)
);
