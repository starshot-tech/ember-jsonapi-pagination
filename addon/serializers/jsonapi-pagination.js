import JSONAPISerializer from '@ember-data/serializer/json-api';
import queryString from 'query-string';

export default class JsonapiPaginationSerializer extends JSONAPISerializer {
  normalizeQueryResponse(store, clazz, payload) {
    return this.appendPagination(super.normalizeQueryResponse(...arguments), payload);
  }

  normalizeArrayResponse(store, clazz, payload) {
    return this.appendPagination(super.normalizeArrayResponse(...arguments), payload);
  }

  appendPagination(result, payload) {
    result.meta = result.meta || {};

    if (payload.links) {
      result.meta.pagination = this.createPageMeta(payload.links);
    }

    return result;
  }

  createPageMeta(data) {

    let meta = {};

    Object.keys(data).forEach((type) => {
      let link = data[type];
      meta[type] = {};

      if (!link) {
        meta[type].number = null;
      } else {
        let newLinks = link.split('?');
        let queryParams = queryString.parse(newLinks[1]);

        if (queryParams.page) {
          meta[type].number = parseInt(queryParams.page) || null;
        }
      }
    });

    return meta;

  }
}
