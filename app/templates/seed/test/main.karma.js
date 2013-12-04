/**
 *
 * This file is only read by the karma test runner. It is equivalent to what
 * is found in test/index.html. However, instead of setting the base path
 * to '../test' as test/index.html does, we set it to the root of karma's built
 * in server, which provides faster caching and watching of only those files
 * which have changed when using the autowatch option.
 *
 * Similar to test/index.html, requirejs will look inside of /base/test for a
 * file named main.js, which will further augment the requirejs configuration.
 *
 * View test/main.js for more the next set of requirejs configuration options.
 *
 */

require.config({
  baseUrl: '/base/test',
  deps: ['/base/require-config.js']
});