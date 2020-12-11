import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';

module('Acceptance | pagination', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('basic json api link availability', async function(assert) {
    await visit('/?page=3');
    assert.equal(currentURL(), '/?page=3');

    assert.dom('[data-test-id="1"]').hasText('1', 'First link is present');
    assert.dom('[data-test-id="2"]').hasText('2', 'Prev link is present');
    assert.dom('[data-test-id="3"]').hasText('3', 'Self link is present');
    assert.dom('[data-test-id="4"]').hasText('4', 'Next link is present');
    assert.dom('[data-test-id="10"]').hasText('10', 'Last link is present');

    await click('[data-test-id="2"]');
    assert.equal(currentURL(), '/?page=2');
    assert.dom('[data-test-id="1"]').hasText('1', 'First link is present');
    assert.dom('[data-test-id="2"]').hasText('2', 'Self link is present');
    assert.dom('[data-test-id="3"]').hasText('3', 'Next link is present');
    assert.dom('[data-test-id="10"]').hasText('10', 'Last link is present');

    await click('[data-test-id="1"]');
    assert.equal(currentURL(), '/');
    assert.dom('[data-test-id="1"]').hasText('1', 'Self link is present');
    assert.dom('[data-test-id="2"]').hasText('2', 'Next link is present');
    assert.dom('[data-test-id="10"]').hasText('10', 'Last link is present');

    await click('[data-test-id="10"]');
    assert.equal(currentURL(), '/?page=10');
    assert.dom('[data-test-id="1"]').hasText('1', 'First link is present');
    assert.dom('[data-test-id="9"]').hasText('9', 'Prev link is present');
    assert.dom('[data-test-id="10"]').hasText('10', 'Last link is present');

    await click('[data-test-id="9"]');
    assert.equal(currentURL(), '/?page=9');
    assert.dom('[data-test-id="1"]').hasText('1', 'First link is present');
    assert.dom('[data-test-id="8"]').hasText('8', 'Prev link is present');
    assert.dom('[data-test-id="9"]').hasText('9', 'Self link is present');
    assert.dom('[data-test-id="10"]').hasText('10', 'Last link is present');

    await click('[data-test-id="8"]');
    assert.equal(currentURL(), '/?page=8');
    assert.dom('[data-test-id="1"]').hasText('1', 'First link is present');
    assert.dom('[data-test-id="7"]').hasText('7', 'Prev link is present');
    assert.dom('[data-test-id="8"]').hasText('8', 'Self link is present');
    assert.dom('[data-test-id="9"]').hasText('9', 'Prev link is present');
    assert.dom('[data-test-id="10"]').hasText('10', 'Last link is present');
  });

  test('padding by 1 renders two additional next and previous links', async function(assert) {
    await visit('/?page=5');
    assert.equal(currentURL(), '/?page=5');
    await fillIn('input', '1');
    assert.dom('[data-test-id="1"]').hasText('1', 'First link is present');
    assert.dom('[data-test-id="3"]').hasText('3', 'Prev Pad By link is present');
    assert.dom('[data-test-id="4"]').hasText('4', 'Prev link is present');
    assert.dom('[data-test-id="5"]').hasText('5', 'Self link is present');
    assert.dom('[data-test-id="6"]').hasText('6', 'Next link is present');
    assert.dom('[data-test-id="7"]').hasText('7', 'Next Pad By link is present');
    assert.dom('[data-test-id="10"]').hasText('10', 'Last link is present');
  });

  test('padding by 2 renders two additional next and previous links', async function(assert) {
    await visit('/?page=5');
    assert.equal(currentURL(), '/?page=5');
    await fillIn('input', '2');
    assert.dom('[data-test-id="1"]').hasText('1', 'First link is present');
    assert.dom('[data-test-id="2"]').hasText('2', 'Prev Pad By Second link is present');
    assert.dom('[data-test-id="3"]').hasText('3', 'Prev Pad By link is present');
    assert.dom('[data-test-id="4"]').hasText('4', 'Prev link is present');
    assert.dom('[data-test-id="5"]').hasText('5', 'Self link is present');
    assert.dom('[data-test-id="6"]').hasText('6', 'Next link is present');
    assert.dom('[data-test-id="7"]').hasText('7', 'Next Pad By link is present');
    assert.dom('[data-test-id="8"]').hasText('8', 'Next Pad By Second link is present');
    assert.dom('[data-test-id="10"]').hasText('10', 'Last link is present');
  });

  test('minimal mode renders only prev self and next', async function(assert) {
    await visit('/?page=5');
    assert.equal(currentURL(), '/?page=5');
    await click('[data-test-id="minimal-button"]');
    assert.dom('[data-test-id="1"]').doesNotExist('First link is not present');
    assert.dom('[data-test-id="2"]').doesNotExist('Prev pad by second link is not present');
    assert.dom('[data-test-id="3"]').doesNotExist('Prev pad by link is not present');
    assert.dom('[data-test-id="4"]').hasText('4', 'Prev link is present');
    assert.dom('[data-test-id="5"]').hasText('5', 'Self link is present');
    assert.dom('[data-test-id="6"]').hasText('6', 'Next link is present');
    assert.dom('[data-test-id="7"]').doesNotExist('Next pad by link is not present');
    assert.dom('[data-test-id="8"]').doesNotExist('Next pad by second link is not present');
    assert.dom('[data-test-id="10"]').doesNotExist('Last link is not present');
  });

  test('pad by does not create duplicate first and last links', async function(assert) {
    await visit('/?page=3');
    assert.equal(currentURL(), '/?page=3');
    assert.equal(findAll('[data-test-id="1"]').length, 1);
    await fillIn('input', '2');
    assert.equal(findAll('[data-test-id="1"]').length, 1);
    await click('[data-test-id="10"]');
    assert.equal(findAll('[data-test-id="10"]').length, 1);
  });
});
