/**
 * @license Apache-2.0
 * @copyright 2023 Akiomi Kamakura
 */

import type { EventPacket, RxNostr } from 'rx-nostr';
import { Nostr, uniq, verify } from 'rx-nostr';
import { pipe } from 'rxjs';

import { filterTextList, scanArray } from './operators.js';
import type { ReqResult, RxReqBase } from './types.js';
import { useReq } from './useReq.js';

export function useTextList(
  client: RxNostr,
  ids: string[],
  req?: RxReqBase | undefined
): ReqResult<EventPacket[]> {
  // TODO: Add note1 support
  const filters = [{ kinds: [Nostr.Kind.Text], ids }];
  const operator = pipe(filterTextList(ids), uniq(), verify(), scanArray());
  return useReq(client, filters, operator, req, []);
}
