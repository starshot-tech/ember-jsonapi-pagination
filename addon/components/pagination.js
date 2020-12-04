import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

/**
  * @module
  * @name Pagination Component
  * @description This is used to render pagination links.
  */
export default class PaginationComponent extends Component {
  @tracked pages = {};

  didReceiveAttrs() {



    let pagesArray = Object.entries(this.model).map((e) => ( { [e[0]]: e[1] } ));
    console.log(pagesArray);
    debugger;
    this.pages = pagesArray;
  }

// don't show previous if doesn't exist
// don't show next if doesn't exist
// make pageObject a pagesArray of objects


  // @tracked pagination = this.pagination;

  // get showFirstLink() {
  //   return this.pagination.self.number !== this.pagination.first.number;
  // }

  // get showLastLink() {
  //   return this.pagination.self.number !== this.pagination.last.number;
  // }

  // get oneMore() {
  //   return this.pagination.self.number < this.pagination.last.number;
  // }

  // get twoMore() {
  //   let tail = this.pagination.last.number - 1;
  //   return this.pagination.self.number < tail;
  // }

  // get twoLess() {
  //   let tail = this.pagination.first.number + 2;
  //   return this.pagination.self.number > tail;
  // }
}
