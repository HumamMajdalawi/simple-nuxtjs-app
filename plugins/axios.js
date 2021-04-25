import { cacheAdapterEnhancer } from "axios-extensions";
import LRU from "lru-cache";
const ONE_MIN = 1000 * 60;

export default function({ $axios, ssrContext }) {
  // check if there cache object already exists
  const defaultCache = process.server
    ? ssrContext.$axCache
    : new LRU({ maxAge: ONE_MIN });

  const defaults = $axios.defaults;
  // chaching axios object
  defaults.adapter = cacheAdapterEnhancer(defaults.adapter, {
    enabledByDefault: false,
    cacheFlag: "useCache",
    defaultCache
  });
}
