import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

/**
  * @module
  * @name Pagination Component
  * @description This is used to render pagination links.
  */
export default class PaginationComponent extends Component {
  @tracked pages = {};
  @tracked padBy = 0;
  @tracked minimalMode = false;

  didReceiveAttrs() {
    let prevLinks = this.buildPrevLinks(this.model);
    let nextLinks = this.buildNextLinks(this.model);

    let pagesArray = [
      this.selfCheck(this.model.first.number, 'first'),
      ...prevLinks,
      { key: 'prev', number: this.model.prev.number },
      { key: 'self', number: this.model.self.number },
      { key: 'next', number: this.model.next.number },
      ...nextLinks,
      this.selfCheck(this.model.last.number, 'last')
    ].filter(Boolean);

    if (this.minimalMode) {
      pagesArray = pagesArray.filter(page => {
        return ['prev', 'self', 'next'].includes(page.key);
      });
    }

    this.pages = pagesArray;
  }

  selfCheck(number, key) {
    let prevSelfNext = [
      this.model.prev.number,
      this.model.self.number,
      this.model.next.number
    ]

    if (prevSelfNext.includes(number)) {
      return null;
    }
    return { key, number };
  }

  getPageNumber(k) {
    if (!this.model[k]) {
      return null;
    }

    return this.model[k].number;
  }

  get padByInt() {
    return parseInt(this.padBy) || 0;
  }

  buildPrevLinks(obj) {
    let page = obj.self.number - 2;
    let first = page - this.padByInt < obj.first.number
      ? obj.first.number
      : page - this.padByInt;

    let pages = [];

    while (page > first) {
      pages.push( { key: 'pad-prev', number: page } );

      page--
    }

    return pages.reverse();
  }

  buildNextLinks(obj) {
    let page = obj.self.number + 2;
    let last = page + this.padByInt > obj.last.number
      ? obj.last.number
      : page + this.padByInt;

    let pages = [];

    while (page < last) {
      pages.push( { key: 'pad-next', number: page } );

      page++
    }

    return pages;
  }
}
