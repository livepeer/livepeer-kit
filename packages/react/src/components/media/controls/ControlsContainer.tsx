import {
  ControlsContainerProps,
  useControlsContainer,
} from '@livepeer/core-react/components';
import { MediaControllerState } from '@livepeer/core-web';
import { styling } from '@livepeer/core-web/media/browser/styling';
import * as React from 'react';

import {
  GenericError,
  OfflineStreamError,
  PrivateStreamError,
} from './PlaybackDisplayError';
import { useMediaController } from '../../../context';

const mediaControllerSelector = ({
  hidden,
  togglePlay,
  canPlay,
  hasPlayed,
  buffered,
  ingestUrl,
  _updateLastInteraction,
}: MediaControllerState<HTMLMediaElement, MediaStream>) => ({
  hidden,
  togglePlay,
  canPlay,
  hasPlayed,
  buffered,
  ingestUrl,
  _updateLastInteraction,
});

export type { ControlsContainerProps };

export const ControlsContainer: React.FC<ControlsContainerProps> = (props) => {
  const {
    top,
    middle,
    left,
    right,
    poster,
    showLoadingSpinner = true,
    hidePosterOnPlayed = true,
    loadingText,
    error,
    children,
    playbackFailedErrorComponent,
    streamOfflineErrorComponent,
    accessControlErrorComponent,
  } = props;

  const {
    hidden,
    togglePlay,
    canPlay,
    hasPlayed,
    buffered,
    ingestUrl,
    _updateLastInteraction,
  } = useMediaController(mediaControllerSelector);

  const isBroadcast = React.useMemo(() => Boolean(ingestUrl), [ingestUrl]);

  const { isLoaded, containerProps } = useControlsContainer({
    togglePlay,
    canPlay,
    buffered,
    isBroadcast,
    _updateLastInteraction,
  });

  return (
    <>
      {poster ? (
        <div
          className={styling.controlsContainer.background({
            display: hasPlayed && hidePosterOnPlayed ? 'hidden' : 'shown',
          })}
          onMouseUp={containerProps.onPress}
        >
          {poster}
        </div>
      ) : (
        <div
          className={styling.controlsContainer.background({
            display: 'hidden',
          })}
          onMouseUp={containerProps.onPress}
        />
      )}

      {showLoadingSpinner &&
        !isLoaded &&
        (!error?.type || error.type === 'fallback') && (
          <div
            className={styling.controlsContainer.background()}
            onMouseUp={containerProps.onPress}
          >
            {loadingText && (
              <div className={styling.controlsContainer.loadingText()}>
                {loadingText}
              </div>
            )}

            <div className={styling.controlsContainer.loading()} />
          </div>
        )}

      {error?.type && error.type !== 'fallback' ? (
        <div
          className={styling.controlsContainer.background()}
          onMouseUp={containerProps.onPress}
        >
          {error?.type === 'access-control' ? (
            accessControlErrorComponent ? (
              accessControlErrorComponent
            ) : (
              <PrivateStreamError />
            )
          ) : error?.type === 'offline' ? (
            streamOfflineErrorComponent ? (
              streamOfflineErrorComponent
            ) : (
              <OfflineStreamError isBroadcast={isBroadcast} />
            )
          ) : playbackFailedErrorComponent ? (
            playbackFailedErrorComponent
          ) : (
            <GenericError isBroadcast={isBroadcast} />
          )}
        </div>
      ) : (
        isLoaded && (
          <>
            <div
              className={styling.controlsContainer.gradient({
                display: hidden ? 'hidden' : 'shown',
              })}
              onMouseUp={containerProps.onPress}
            />
            <div
              className={styling.controlsContainer.top.container({
                display: hidden ? 'hidden' : 'shown',
              })}
            >
              {top}
            </div>
            <div
              className={styling.controlsContainer.bottom.container({
                display: hidden ? 'hidden' : 'shown',
              })}
            >
              <div
                className={styling.controlsContainer.bottom.middle.container()}
              >
                {middle}
              </div>
              <div
                className={styling.controlsContainer.bottom.lower.container()}
              >
                <div className={styling.controlsContainer.bottom.lower.left()}>
                  {left}
                </div>
                <div className={styling.controlsContainer.bottom.lower.right()}>
                  {right}
                </div>
              </div>
            </div>
            {children && (
              <div
                className={styling.controlsContainer.background({
                  display: hidden ? 'hidden' : 'shown',
                })}
              >
                {children}
              </div>
            )}
          </>
        )
      )}
    </>
  );
};
