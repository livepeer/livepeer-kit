import { describe, expect, it } from 'vitest';

import { renderHook } from '../../../test';
import { useLivepeerProvider } from './useLivepeerProvider';

describe('useProvider', () => {
  it('mounts', () => {
    const { result } = renderHook(() => useLivepeerProvider());
    expect(result.current.getConfig()).toMatchInlineSnapshot(`
      {
        "apiKey": "a616be3b-8980-4932-8079-0122e0106f95",
        "baseUrl": "https://livepeer.studio/api",
        "name": "Livepeer Studio",
      }
    `);
  });
});
