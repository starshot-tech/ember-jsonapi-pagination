import JSONAPISerializer from '@ember-data/serializer/json-api';

export default class JsonapiPaginationSerializer extends JSONAPISerializer {
  normalizeQueryResponse(store, clazz, payload) {
    let result = super.normalizeQueryResponse(...arguments);
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
      let a = document.createElement('a');
      a.href = link;

      a.search.slice(1).split('&').forEach((pairs) => {

        let [param, value] = pairs.split('=');

        if (param === 'page') {
          meta[type].number = parseInt(value);
        }

      });
      a = null;
    });

    return meta;

  }
}
