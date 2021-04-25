import LRU from "lru-cache";

export default function(_moduleOptions) {
  const ONE_MIN = 1000 * 60;
  // cache object that deletes the least-recently-used items after ONE_MIN
  const axCache = new LRU({ maxAge: ONE_MIN });
  // inject cache object into vue-renderer:ssr:prepareContext hook
  this.nuxt.hook("vue-renderer:ssr:prepareContext", ssrContext => {
    ssrContext.$axCache = axCache;
  });
}
