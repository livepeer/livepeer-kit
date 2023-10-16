import { useClient } from '@livepeer/core-react/context';
import { version } from '@livepeer/core-web';
import {
  ControlsOptions,
  MediaPropsOptions,
  createControllerStore,
} from '@livepeer/core-web/media';
import {
  addEventListeners,
  getDeviceInfo,
} from '@livepeer/core-web/media/browser';
import * as React from 'react';

import { MediaControllerContext } from './MediaControllerContext';

export type MediaControllerProviderProps<TElement extends HTMLMediaElement> = {
  element: TElement | null;
  children: React.ReactNode;
  mediaProps: MediaPropsOptions;
  opts: ControlsOptions | undefined;
};

export const MediaControllerProvider = <TElement extends HTMLMediaElement>({
  element,
  children,
  mediaProps,
  opts,
}: MediaControllerProviderProps<TElement>) => {
  const mediaController = useMediaControllerStore(element, opts, mediaProps);

  return (
    <MediaControllerContext.Provider value={mediaController}>
      {children}
    </MediaControllerContext.Provider>
  );
};

const useMediaControllerStore = <
  TElement extends HTMLMediaElement,
  TMediaSource extends MediaStream,
>(
  element: TElement | null,
  opts: ControlsOptions | undefined,
  mediaProps: MediaPropsOptions,
) => {
  const client = useClient();

  const store = React.useMemo(
    () =>
      createControllerStore<TElement, TMediaSource>({
        device: getDeviceInfo(version.react),
        storage: client.storage,
        opts: opts ?? {},
        mediaProps,
      }),
    [client?.storage, opts, mediaProps],
  );

  React.useEffect(() => {
    if (element) {
      store.setState({ _element: element });
    }
  }, [store, element]);

  React.useEffect(() => {
    const { destroy } = addEventListeners(store, opts);

    return () => {
      destroy?.();
    };
  }, [store, element, opts]);

  return store;
};
