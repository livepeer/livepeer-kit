import {
  ACCESS_CONTROL_ERROR_MESSAGE,
  HlsSrc,
  MediaControllerState,
} from '@livepeer/core-web';
import { HlsError, createNewHls } from '@livepeer/core-web/media/browser/hls';
import { styling } from '@livepeer/core-web/media/browser/styling';
import * as React from 'react';

import { VideoPlayerProps } from '.';
import { useMediaController } from '../../../../context';
import { useDebounce } from '../../../system';

const mediaControllerSelector = ({
  setLive,
  onDurationChange,
  onCanPlay,
  _element,
  _updatePlaybackOffsetMs,
  onRedirect,
}: MediaControllerState<HTMLMediaElement, MediaStream>) => ({
  setLive,
  onDurationChange,
  onCanPlay,
  _element,
  _updatePlaybackOffsetMs,
  onRedirect,
});

export type HLSVideoPlayerProps = Omit<
  VideoPlayerProps,
  'src' | 'webrtcConfig'
> & {
  src: HlsSrc;
  fullscreen: boolean;
  accessKey?: string | null;
};

export const HLSVideoPlayer = React.forwardRef<
  HTMLVideoElement,
  HLSVideoPlayerProps
>((props, ref) => {
  const {
    src,
    hlsConfig,
    autoPlay,
    title,
    loop,
    muted,
    poster,
    objectFit,
    fullscreen,
    onPlaybackError,
    priority,
    allowCrossOriginCredentials,
    playRecording,
    jwt,
    accessKey,
  } = props;

  const {
    setLive,
    onCanPlay,
    onDurationChange,
    _element,
    _updatePlaybackOffsetMs,
    onRedirect,
  } = useMediaController(mediaControllerSelector);

  const onLive = React.useCallback(
    async (live: boolean) => {
      onPlaybackError?.(null);

      if (!playRecording) {
        setLive(live);
      }
    },
    [onPlaybackError, setLive, playRecording],
  );

  const [errorCount, setErrorCount] = React.useState(0);

  const debouncedErrorCount = useDebounce(errorCount, 1000 * errorCount);

  React.useEffect(() => {
    if (_element && src) {
      const onErrorComposed = (error: HlsError) => {
        setErrorCount((prev) => prev + 1);

        const cleanError = new Error(
          error?.response?.data?.toString?.() ??
            ((error?.response as any)?.code === 401
              ? ACCESS_CONTROL_ERROR_MESSAGE
              : 'Error with HLS.js'),
        );

        onPlaybackError?.(cleanError);
      };

      const { destroy } = createNewHls(
        src?.src,
        _element,
        {
          onLive,
          onDuration: onDurationChange,
          onCanPlay: onCanPlay,
          onError: onErrorComposed,
          onPlaybackOffsetUpdated: _updatePlaybackOffsetMs,
          onRedirect,
        },
        {
          autoplay: autoPlay,
          xhrSetup(xhr, _url) {
            xhr.withCredentials = Boolean(allowCrossOriginCredentials);
            if (accessKey)
              xhr.setRequestHeader('Livepeer-Access-Key', accessKey);
            else if (jwt) xhr.setRequestHeader('Livepeer-Jwt', jwt);
          },
          ...hlsConfig,
        },
      );

      return () => {
        destroy?.();
      };
    }
  }, [
    autoPlay,
    hlsConfig,
    onDurationChange,
    onCanPlay,
    _element,
    src,
    onLive,
    onPlaybackError,
    allowCrossOriginCredentials,
    debouncedErrorCount,
    _updatePlaybackOffsetMs,
    onRedirect,
    jwt,
    accessKey,
  ]);

  return (
    <video
      className={styling.media.video({
        size: fullscreen ? 'fullscreen' : objectFit,
      })}
      loop={loop}
      aria-label={title ?? 'Video player'}
      role="video"
      width="100%"
      height="100%"
      ref={ref}
      webkit-playsinline="true"
      playsInline
      autoPlay={autoPlay}
      muted={muted}
      poster={typeof poster === 'string' ? poster : undefined}
      preload={priority ? 'auto' : 'metadata'}
      crossOrigin={
        allowCrossOriginCredentials ? 'use-credentials' : 'anonymous'
      }
    />
  );
});
