ember-jsonapi-pagination
==============================================================================

This addon improves pagination support to Ember applications that use Ember Data's JSONAPI serializer. It provides the following:

1) A `JsonapiPaginationSerializer` that will append [JSONAPI pagination properties](https://jsonapi.org/format/#fetching-pagination) when returning a response for a `findAll` or `query` request.

2) A `<JsonapiPagination />` component than can be used to render an unordered list of pagination links that can be used in your templates

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-jsonapi-pagination
```


Usage
------------------------------------------------------------------------------

#### Serializer

The minimum usage of this addon requires using the `JsonapiPaginationSerializer` for any models that will return JSONAPI compliant pagination links. You can use this serializer for specific models or as your application serializer, depending on your needs and preference.

The serializer extends Ember Data's built in `JSONAPISerializer`.

```javascript
import JsonapiPaginationSerializer from 'ember-jsonapi-pagination/serializers/jsonapi-pagination';

export default class ApplicationSerializer extends JsonapiPaginationSerializer {}
```

The serializer will include a `pagination` object on the model's `meta` object. It will parse the links and pull the page number from each link's `page` query param. If your JSONAPI document looks like this:

```json
{
  "data": [...],
  "included": [...],
  "links": {
    "first": "https://example.com/api/posts?page=1",
    "prev": "https://example.com/api/posts?page=2",
    "self": "https://example.com/api/posts?page=3",
    "next": "https://example.com/api/posts?page=4",
    "last": "https://example.com/api/posts?page=10"
  }
}
```

Then, for example in a controller, `this.model.meta.pagination` will look like this:

```json
{
  "first": { "number": 1 },
  "prev": { "number": 2 },
  "self": { "number": 3 },
  "next": { "number": 4 },
  "last": { "number": 10 }
}
```

#### Component

The `<JsonapiPagination />` component can be used with or without a block that provides a template for pagination.

**Example (without block):**

```html
<JsonapiPagination @model={{this.model}} @goToPage={{this.goToPage}} />
```

**Example (with block):**

```html
<JsonapiPagination @model={{this.model}} @padBy={{2}} as |pages|>
  <ul>
    {{#each pages as |page|}}
      <li><a href="#" {{on "click" (fn this.goToPage page.number)}}>{{page.number}}</a></li>
    {{/each}}
  </ul>
</JsonapiPagination>
```

**Arguments:**

|Name|Type|Description|
|---|---|---|
|`@model`|JSONAPI Document|The collection model as returned by Ember Data|
|`@goToPage`|Function|An action that will be called when a page number is clicked. It will receive one argument: the page number|
|`@padBy`|Number|The number of pagination objects to include between `first` and `prev` +  `next` and `last` links|
|`@minimalMode`|Boolean|If true, only previous and next page objects are built|

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
