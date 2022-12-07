import { getStreamSessions } from '@livepeer/core/actions';
import { ClientConfig, createClient } from '@livepeer/core/client';
import {
  GetStreamSessionsArgs,
  LivepeerProvider,
  LivepeerProviderConfig,
  StreamSession,
} from '@livepeer/core/types';
import { pick } from '@livepeer/core/utils';

import {
  PrefetchQueryOptions,
  UsePickQueryOptions,
  prefetchQuery,
  useInternalQuery,
  usePickQueryKeys,
} from '../../utils';
import { useLivepeerProvider } from '../providers';

export const queryKey = (
  args: GetStreamSessionsArgs,
  config: LivepeerProviderConfig,
) => [{ entity: 'getStreamSessions', args, config }] as const;

export type UseStreamSessionsArgs<TData> = PrefetchQueryOptions &
  Partial<GetStreamSessionsArgs> &
  Partial<
    UsePickQueryOptions<StreamSession[], TData, ReturnType<typeof queryKey>>
  >;

export function useStreamSessions<
  TLivepeerProvider extends LivepeerProvider,
  TData = StreamSession[],
>(args: UseStreamSessionsArgs<TData>) {
  const livepeerProvider = useLivepeerProvider<TLivepeerProvider>();

  return useInternalQuery<StreamSession[], TData, ReturnType<typeof queryKey>>(
    getQueryParams(args, livepeerProvider),
  );
}

export async function prefetchStreamSessions<
  TLivepeerProvider extends LivepeerProvider,
  TData = StreamSession[],
>(
  args: UseStreamSessionsArgs<TData>,
  config: Omit<ClientConfig<TLivepeerProvider>, 'storage'>,
) {
  const livepeerClient = createClient(config);

  return prefetchQuery(getQueryParams(args, livepeerClient.provider));
}

function getQueryParams<
  TLivepeerProvider extends LivepeerProvider,
  TData = StreamSession[],
>(args: UseStreamSessionsArgs<TData>, provider: TLivepeerProvider) {
  const getStreamSessionsArgs: GetStreamSessionsArgs =
    typeof args === 'string' ? args : { streamId: args?.streamId ?? '' };

  return {
    clearClient: args.clearClient,
    queryKey: queryKey(getStreamSessionsArgs, provider.getConfig()),
    queryFn: async () =>
      getStreamSessions<TLivepeerProvider>(getStreamSessionsArgs),
    enabled: Boolean(typeof args === 'string' ? args : args?.streamId),
    ...(typeof args === 'object' ? pick(args, ...usePickQueryKeys) : {}),
  };
}
