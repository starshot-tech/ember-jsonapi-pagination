import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {

  queryParams = {
    page: {
      refreshModel: true
    }
  };

  model(params) {
    let { page } = params;
    return this.store.query('post', { page });
  }
}
