export type Address = `0x${string}`;
export type Hash = `0x${string}`;

export type {
  Asset,
  CreateAssetArgs,
  CreateAssetFileProgress,
  CreateAssetProgress,
  CreateAssetSource,
  CreateAssetSourceBase,
  CreateAssetSourceFile,
  CreateAssetSourceUrl,
  CreateStreamArgs,
  GetAssetArgs,
  GetAssetMetricsArgs,
  GetPlaybackInfoArgs,
  GetStreamArgs,
  GetStreamSessionArgs,
  GetStreamSessionsArgs,
  LivepeerProvider,
  LivepeerProviderConfig,
  Metrics,
  MultistreamTarget,
  MultistreamTargetRef,
  PlaybackInfo,
  PlaybackPolicy,
  Stream,
  StreamSession,
  TranscodingProfile,
  UpdateAssetArgs,
  UpdateStreamArgs,
  ViewsMetrics,
} from './provider';
