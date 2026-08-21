const { Analytics } = require('./analytics');
const { Content } = require('./content');
const { Search } = require('./search');
const { SearchClients } = require('./search-clients');

/** Instantiates every core (search/analytics/content) domain class. */
function initSuCoreClasses(props, authentication) {
  return {
    analytics: new Analytics(props, authentication),
    content: new Content(props, authentication),
    search: new Search(props, authentication),
    searchClients: new SearchClients(props, authentication)
  };
}

module.exports = {
  initSuCoreClasses
};
