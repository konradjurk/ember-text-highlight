// (1)  Test-Infrastructure Dependencies
import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

// (2)  Test-Infrastructure Setup
// -

// (3)  Test-Convenience Dependencies
// -

// (4)  Test-Project Dependencies
//      - setup dependency mocks either here if always needed or in before/beforeEach hooks
// -

// (5)  Test-Project Global Fake Data
//      - declare here if needed in various tests
//      - please leave "region" comments as it allows some IDEs to collapse the lines in between
//      - please declare all variables here as "var" instead of "let" or "const" as var hoisting makes it easier
//        to reference them
//region GLOBAL FAKE DATA
//endregion

// (6)  Parameterized Test Scenarios
//      - sometimes the test setup is the same but it makes sense to test with a wide variety of input data
//      - declare each input scenario as an array element with the desired input and expected output

//region PARAMETERIZED TEST SCENARIOS
//endregion

moduleForComponent('text-highlight', 'Integration | Helper | Text Highlight', {
  integration: true
});

test('updates on value change', function (assert) {
  this.set('query', '');
  this.set('value', 'TestAb');

  this.render(hbs`{{{text-highlight value query=query}}}`);

  assert.equal(this.$().html().trim(), 'TestAb');

  // test that helper updates
  this.set('query', 'ab');
  assert.equal(this.$().html().trim(), 'Test<span class="mark">Ab</span>');
});

test('explicit caseSensitive=false', function (assert) {
  this.set('query', 'ab');
  this.set('value', 'TestAb');

  this.render(hbs`{{{text-highlight value query=query caseSensitive=false}}}`);

  assert.equal(this.$().html().trim(), 'Test<span class="mark">Ab</span>');
});

test('explicit caseSensitive=true (no match)', function (assert) {
  this.set('query', 'ab');
  this.set('value', 'TestAb');

  this.render(hbs`{{{text-highlight value query=query caseSensitive=true}}}`);

  assert.equal(this.$().html().trim(), 'TestAb');
});

test('explicit caseSensitive=true (match)', function (assert) {
  this.set('query', 'Ab');
  this.set('value', 'TestAb');

  this.render(hbs`{{{text-highlight value query=query caseSensitive=true}}}`);

  assert.equal(this.$().html().trim(), 'Test<span class="mark">Ab</span>');
});

test('null query', function (assert) {
  this.set('query', null);
  this.set('value', 'TestAb');

  this.render(hbs`{{{text-highlight value query=query}}}`);

  assert.equal(this.$().html().trim(), 'TestAb');
});

test('Object query', function (assert) {
  this.set('query', {});
  this.set('value', 'TestAb');

  this.render(hbs`{{{text-highlight value query=query}}}`);

  assert.equal(this.$().html().trim(), 'TestAb');
});

test('Array query', function (assert) {
  this.set('query', []);
  this.set('value', 'TestAb');

  this.render(hbs`{{{text-highlight value query=query}}}`);

  assert.equal(this.$().html().trim(), 'TestAb');
});

test('Number query', function (assert) {
  this.set('query', 12);
  this.set('value', 'TestAb');

  this.render(hbs`{{{text-highlight value query=query}}}`);

  assert.equal(this.$().html().trim(), 'TestAb');
});

test('Number value', function (assert) {
  this.set('query', 'abc');
  this.set('value', 12);

  this.render(hbs`{{{text-highlight value query=query}}}`);

  assert.equal(this.$().html().trim(), '12');
});

test('Invalid value (null)', function (assert) {
  this.set('query', 'abc');
  this.set('value', null);

  this.render(hbs`{{{text-highlight value query=query}}}`);

  assert.equal(this.$().html().trim(), '');
});

test('Invalid value (Object)', function (assert) {
  this.set('query', 'abc');
  this.set('value', {});

  this.render(hbs`{{{text-highlight value query=query}}}`);

  assert.equal(this.$().html().trim(), '');
});

test('Invalid value (boolean)', function (assert) {
  this.set('query', 'abc');
  this.set('value', true);

  this.render(hbs`{{{text-highlight value query=query}}}`);

  assert.equal(this.$().html().trim(), '');
});

