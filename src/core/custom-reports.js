const { CUSTOM_REPORTS } = require('../utils/su-apis');
const { HttpRequest, requestMethods } = require('../utils/request-handler');
const { customReports } = require('../validations');
const { validate } = require('../validations/joi-validator');
const { Base } = require('../utils/base');

/**
 * Custom analytics reports, read only: list the published reports, fetch the data of one, and
 * list the values of one of its custom filters. Nothing here creates, changes or describes a
 * report's definition.
 */
class CustomReports extends Base {
  #authObj;

  constructor(props, authObj) {
    super(props);
    this.#authObj = authObj;
  }

  #post = (url, data) => HttpRequest({
    timeout: this.getApiTimeout(),
    method: requestMethods.post,
    url: `${this.getInstance()}${url}`,
    data
  }, this.#authObj);

  /**
   * The published reports of the tenant:
   * { reports: [{ id, name, description, section, columns, filters, customFilters, ... }] }.
   */
  listReports = async () => this.#post(CUSTOM_REPORTS.LIST, {});

  /**
   * Rows of one published report.
   * @param {{ reportId: string, from: string, to: string, page?: number, pageSize?: number,
   *   sortBy?: string, sortDir?: 'asc'|'desc', internalUser?: string, searchClients?: string[],
   *   custom?: object, search?: object, includeTotals?: boolean }} params
   */
  runReport = async (params) => {
    const { value } = validate(customReports.runReport, params);

    return this.#post(CUSTOM_REPORTS.RUN, value);
  };

  /**
   * Values of one custom filter of a published report: [{ value, label }].
   * @param {{ reportId: string, name: string, search?: string, limit?: number, from?: string,
   *   to?: string, searchClients?: string[], internalUser?: string }} params
   */
  getReportFilterOptions = async (params) => {
    const { value } = validate(customReports.getReportFilterOptions, params);

    return this.#post(CUSTOM_REPORTS.FILTER_OPTIONS, value);
  };
}

module.exports = {
  CustomReports
};
