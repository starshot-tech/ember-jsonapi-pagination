function postArray(pages) {
  return {
    'links': {
      'self': `/posts?page=${pages.self}`,
      'prev': `/posts?page=${pages.prev}`,
      'next': `/posts?page=${pages.next}`,
      'last': `/posts?page=${pages.last}`,
      'first': `/posts?page=${pages.first}`
    },

    'included': [],

    'data': [
      {
        'type': 'posts',
        'relationships': {},
        'links': {
          'self': 'http://localhost:4200/api/species/182512'
        },

        'id': '182512',

        'attributes': {
          'title': 'My Title',
          'body': 'My Body'
        }
      },
      {
        'type': 'posts',
        'relationships': {},
        'links': {
          'self': 'http://localhost:4200/api/species/166458'
        },

        'id': '166458',
        'attributes': {
          'title': 'My Title',
          'body': 'My Body'
        }
      }
    ]
  };
}

export default function() {
  this.get('/posts', (schema, request) => {
    let max = 10;
    let page = parseInt(request.queryParams.page);

    let pageObject = {
      'self': page,
      'prev': page - 1 <= 0 ? null : page - 1,
      'next': page + 1 >= max ? null : page + 1,
      'last': max,
      'first': 1
    };

    return postArray(pageObject);
  });

}
