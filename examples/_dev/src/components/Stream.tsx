import {
  useCreateStream,
  useStream,
  useStreamSessions,
  useUpdateStream,
} from '@livepeer/react';

const streamName = `New Stream`;

export const Stream = () => {
  const { mutate: createStream, data: createdStream } = useCreateStream(
    streamName ? { name: streamName, mutationConfig: { retry: 3 } } : null,
  );
  const { data: stream } = useStream({
    streamId: createdStream?.id,
    refetchInterval: 10000,
  });
  const { data: streamSessions } = useStreamSessions({
    streamId: createdStream?.id,
  });
  const { mutate: updateStream } = useUpdateStream(
    stream
      ? {
          streamId: stream?.id,
          record: true,
        }
      : null,
  );

  return (
    <div>
      <button onClick={() => createStream?.()}>Create Stream</button>
      {stream && (
        <>
          <div>Stream Key: {stream.streamKey}</div>
          <div>Recording?: {String(Boolean(stream.record))}</div>
        </>
      )}
      {streamSessions && (
        <>
          <div>Stream Sessions: ({streamSessions.length}) </div>
          {streamSessions.length > 0 && (
            <div>
              Active:{' '}
              {streamSessions.map((session) => session.isActive).join(', ')}
            </div>
          )}
        </>
      )}
      <div>
        <button
          onClick={() => {
            updateStream?.();
          }}
        >
          Record Stream
        </button>
      </div>
    </div>
  );
};
