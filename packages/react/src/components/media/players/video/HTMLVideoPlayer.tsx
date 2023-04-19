import { Base64Src, HlsSrc, VideoSrc, WebRTCSrc } from 'livepeer';
import { styling } from 'livepeer/media/browser/styling';
import * as React from 'react';

import { VideoPlayerProps } from './VideoPlayer';

export type HtmlVideoPlayerProps = Omit<VideoPlayerProps, 'src'> & {
  src: (VideoSrc | Base64Src | HlsSrc | WebRTCSrc) | null;
  fullscreen: boolean;
};

export const HtmlVideoPlayer = React.forwardRef<
  HTMLVideoElement,
  HtmlVideoPlayerProps
>((props, ref) => {
  const {
    autoPlay,
    title,
    loop,
    muted,
    poster,
    objectFit,
    onAccessControlError,
    src,
    fullscreen,
    onError,
  } = props;

  const onVideoError: React.ReactEventHandler<HTMLVideoElement> =
    React.useCallback(
      async (e) => {
        const sourceElement = e.target;
        const parentElement = (sourceElement as HTMLSourceElement)
          ?.parentElement;
        const videoUrl = (parentElement as HTMLVideoElement)?.currentSrc;

        if (videoUrl) {
          try {
            const response = await fetch(videoUrl);
            if (response.status === 404) {
              console.warn('Video not found');
              return onError?.(new Error('Video not found'));
            } else if (response.status === 401) {
              console.warn('Unauthorized to view video');
              return onAccessControlError?.(
                new Error('Unauthorized to view video'),
              );
            }
          } catch (err) {
            console.warn(err);
            return onError?.(new Error('Error fetching video URL'));
          }
        }

        console.warn('Unknown error loading video');
        return onError?.(new Error('Unknown error loading video'));
      },
      [onError, onAccessControlError],
    );

  return (
    <video
      className={styling.media.video({
        size: fullscreen ? 'fullscreen' : objectFit,
      })}
      loop={loop}
      aria-label={title ?? 'Video player'}
      role="video"
      autoPlay={autoPlay}
      width="100%"
      height="100%"
      ref={ref}
      webkit-playsinline="true"
      playsInline
      muted={muted}
      poster={typeof poster === 'string' ? poster : undefined}
      onError={onVideoError}
    >
      {src && <source key={src.src} src={src.src} type={src.mime!} />}
      {
        "Your browser doesn't support the HTML5 <code>video</code> tag, or the video format."
      }
    </video>
  );
});

HtmlVideoPlayer.displayName = 'HtmlVideoPlayer';
