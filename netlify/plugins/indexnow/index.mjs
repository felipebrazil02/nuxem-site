import { criarPlugin } from './core.mjs';

const plugin = criarPlugin();
export const onPreBuild = plugin.onPreBuild;
export const onSuccess = plugin.onSuccess;
