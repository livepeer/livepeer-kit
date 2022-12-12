import { Player } from '@livepeer/react';
import { useCallback } from 'react';

const playbackId = 'ar://JIuxwuF79WrYNKN9_B99SxVEcKIpdibF2kWRwHBUeQg';
// const streamId = '2c61917e-4f05-449a-ab7d-1b3c85f78993';

export const AssetDemoPlayer = () => {
  const mediaElementRef = useCallback((ref: HTMLMediaElement) => {
    console.log(ref.duration);
  }, []);

  return (
    <>
      <Player
        playbackId={playbackId}
        // src={'/audio-example.mp3'}
        autoUrlUpload={{ fallback: true, ipfsGateway: 'https://dweb.link' }}
        loop
        autoPlay
        showPipButton
        muted
        mediaElementRef={mediaElementRef}
        theme={{
          fonts: {
            display: 'Inter',
          },
          radii: { containerBorderRadius: '30px' },
          space: {
            controlsTopMarginX: '20px',
            controlsTopMarginY: '15px',
            controlsBottomMarginX: '15px',
            controlsBottomMarginY: '10px',
          },
        }}
      />
    </>
  );
};
