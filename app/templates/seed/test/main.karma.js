/**
 *
 * When using the Karma test runner this is the initial starting point for
 * require js configuration lookup. Note the use of /base, which is the root
 * for files hosted by karma. Thus, the next stop in the lookup path for karma
 * after this file is /base/test/main.js, which will provide the next more
 * generalized set of configurations options shared by all tests.
 *
 */

require.config({
  baseUrl: '/base/test',
  deps: ['/base/main.js']
});