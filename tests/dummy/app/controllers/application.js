import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  queryParams = ['page'];

  @tracked page = 1;
  @tracked padBy = 0;

  @action
  goToPage(number) {
    this.page = number;
  }
}
