import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { useClient } from '.';
import { renderHook } from '../../test';

describe('useClient', () => {
  describe('mounts', () => {
    it('default', () => {
      const { result } = renderHook(() => useClient());
      expect(result.current).toMatchInlineSnapshot(`
        Client {
          "config": {
            "provider": [Function],
            "storage": {
              "getItem": [Function],
              "removeItem": [Function],
              "setItem": [Function],
            },
          },
          "queryClient": QueryClient {
            "defaultOptions": {
              "queries": {
                "cacheTime": Infinity,
                "retry": false,
              },
            },
            "logger": {
              "error": [Function],
              "log": [Function],
              "warn": [Function],
            },
            "mountCount": 1,
            "mutationCache": MutationCache {
              "config": {},
              "listeners": Set {},
              "mutationId": 0,
              "mutations": [],
              "subscribe": [Function],
            },
            "mutationDefaults": [],
            "queryCache": QueryCache {
              "config": {},
              "listeners": Set {},
              "queries": [],
              "queriesMap": {},
              "subscribe": [Function],
            },
            "queryDefaults": [],
            "unsubscribeFocus": [Function],
            "unsubscribeOnline": [Function],
          },
          "storage": {
            "getItem": [Function],
            "removeItem": [Function],
            "setItem": [Function],
          },
          "store": {
            "destroy": [Function],
            "getState": [Function],
            "persist": {
              "clearStorage": [Function],
              "getOptions": [Function],
              "hasHydrated": [Function],
              "onFinishHydration": [Function],
              "onHydrate": [Function],
              "rehydrate": [Function],
              "setOptions": [Function],
            },
            "setState": [Function],
            "subscribe": [Function],
          },
        }
      `);
    });

    it('throws when not inside Provider', () => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      vi.spyOn(console, 'error').mockImplementation(() => {});

      try {
        const wrapper = ({ children }: { children?: React.ReactNode }) =>
          React.createElement('div', { children });
        renderHook(() => useClient(), { wrapper });
      } catch (error) {
        expect(error).toMatchInlineSnapshot(
          '[Error: `useClient` must be used within `LivepeerConfig`.]',
        );
      }
    });
  });
});
