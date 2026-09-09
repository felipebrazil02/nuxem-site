import { getStore } from '@netlify/blobs';
import { createBridge } from '../studio/bridge-core.mjs';
import { legacySlugs } from '../studio/legacy-slugs.mjs';

export default createBridge({ getStore, legacySlugs });

export const config = { method: 'POST' };
