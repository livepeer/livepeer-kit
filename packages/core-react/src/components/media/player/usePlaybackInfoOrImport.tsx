import { HttpError } from '@livepeer/core';
import { CreateAssetUrlProgress } from '@livepeer/core/types';
import { parseCid } from '@livepeer/core/utils';

import * as React from 'react';

import { useCreateAsset, usePlaybackInfo } from '../../../hooks';

export type UsePlaybackInfoOrImportProps = {
  decentralizedSrcOrPlaybackId: ReturnType<typeof parseCid>;
  playbackId: string | null | undefined;
  refetchPlaybackInfoInterval: number;
  autoUrlUpload: boolean | { fallback: true; gateway?: string };
  onAssetStatusChange: (status: CreateAssetUrlProgress) => void;
  playRecording: boolean | null | undefined;
};

/**
 * Retrieves the playback info for a playback ID or source URL.
 * Conditionally, automatically imports a source URL from IPFS or Arweave.
 *
 * @param src Source URL for the media.
 * @param playbackId Playback ID of the media.
 */
export const usePlaybackInfoOrImport = ({
  decentralizedSrcOrPlaybackId,
  playbackId,
  refetchPlaybackInfoInterval,
  autoUrlUpload,
  onAssetStatusChange,
  playRecording,
}: UsePlaybackInfoOrImportProps) => {
  const {
    mutate: importAsset,
    status,
    progress,
  } = useCreateAsset(
    decentralizedSrcOrPlaybackId
      ? ({
          sources: [
            {
              name: decentralizedSrcOrPlaybackId.id,
              url: decentralizedSrcOrPlaybackId.url,
            },
          ],
        } as const)
      : null,
  );

  React.useEffect(() => {
    if (progress?.[0]) {
      onAssetStatusChange(progress[0]);
    }
  }, [progress, onAssetStatusChange]);

  const { data: playbackInfo, error: playbackInfoError } = usePlaybackInfo({
    // attempt to fetch if the source is from decentralized storage, or a playback ID is provided
    playbackId: decentralizedSrcOrPlaybackId?.id ?? playbackId ?? undefined,
    recordings: Boolean(playRecording),
    staleTime: 1_000 * 60 * 60 * 24, // 24 hours
    refetchInterval: (info) => (info ? false : refetchPlaybackInfoInterval),
  });

  const playbackInfoErrorCode = React.useMemo(
    () => (playbackInfoError as HttpError)?.code,
    [playbackInfoError],
  );

  // trigger an import if the playback info had a 404 error and the asset is an IPFS source
  // also must be enabled
  React.useEffect(() => {
    if (
      autoUrlUpload &&
      importAsset &&
      status === 'idle' &&
      playbackInfoErrorCode === 404
    ) {
      importAsset();
    }
  }, [autoUrlUpload, playbackInfoErrorCode, importAsset, status]);

  return playbackInfo;
};
