import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | text-highlight', function (hooks) {
  setupRenderingTest(hooks);

  test('updates on value change', async function (assert) {
    this.set('query', '');
    this.set('value', 'TestAb');

    await render(hbs`{{text-highlight this.value query=this.query}}`);

    assert.dom(this.element).hasText('TestAb');

    // test that helper updates
    this.set('query', 'ab');
    assert.strictEqual(this.element.innerHTML.trim(), 'Test<span class="mark">Ab</span>');
  });

  test('explicit caseSensitive=false', async function (assert) {
    this.set('query', 'ab');
    this.set('value', 'TestAb');

    await render(hbs`{{text-highlight this.value query=this.query caseSensitive=false}}`);

    assert.strictEqual(this.element.innerHTML.trim(), 'Test<span class="mark">Ab</span>');
  });

  test('explicit caseSensitive=true (no match)', async function (assert) {
    this.set('query', 'ab');
    this.set('value', 'TestAb');

    await render(hbs`{{text-highlight this.value query=this.query caseSensitive=true}}`);

    assert.dom(this.element).hasText('TestAb');
  });

  test('explicit caseSensitive=true (match)', async function (assert) {
    this.set('query', 'Ab');
    this.set('value', 'TestAb');

    await render(hbs`{{text-highlight this.value query=this.query caseSensitive=true}}`);

    assert.strictEqual(this.element.innerHTML.trim(), 'Test<span class="mark">Ab</span>');
  });

  test('null query', async function (assert) {
    this.set('query', null);
    this.set('value', 'TestAb');

    await render(hbs`{{text-highlight this.value query=this.query}}`);

    assert.dom(this.element).hasText('TestAb');
  });

  test('Object query', async function (assert) {
    this.set('query', {});
    this.set('value', 'TestAb');

    await render(hbs`{{text-highlight this.value query=this.query}}`);

    assert.dom(this.element).hasText('TestAb');
  });

  test('Array query', async function (assert) {
    this.set('query', []);
    this.set('value', 'TestAb');

    await render(hbs`{{text-highlight this.value query=this.query}}`);

    assert.dom(this.element).hasText('TestAb');
  });

  test('Number query', async function (assert) {
    this.set('query', 12);
    this.set('value', 'TestAb');

    await render(hbs`{{text-highlight this.value query=this.query}}`);

    assert.dom(this.element).hasText('TestAb');
  });

  test('Number value', async function (assert) {
    this.set('query', 'abc');
    this.set('value', 12);

    await render(hbs`{{text-highlight this.value query=this.query}}`);

    assert.dom(this.element).hasText('12');
  });

  test('Invalid value (null)', async function (assert) {
    this.set('query', 'abc');
    this.set('value', null);

    await render(hbs`{{text-highlight this.value query=this.query}}`);

    assert.dom(this.element).hasText('');
  });

  test('Invalid value (Object)', async function (assert) {
    this.set('query', 'abc');
    this.set('value', {});

    await render(hbs`{{text-highlight this.value query=this.query}}`);

    assert.dom(this.element).hasText('');
  });

  test('Invalid value (boolean)', async function (assert) {
    this.set('query', 'abc');
    this.set('value', true);

    await render(hbs`{{text-highlight this.value query=this.query}}`);

    assert.dom(this.element).hasText('');
  });
});
