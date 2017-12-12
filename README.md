# Ember Text Highlight [![Build Status](https://travis-ci.org/konradjurk/ember-text-highlight.svg?branch=master)](https://travis-ci.org/konradjurk/ember-text-highlight) [![Code Climate](https://img.shields.io/codeclimate/coverage/github/konradjurk/ember-text-highlight.svg)](https://codeclimate.com/github/konradjurk/ember-text-highlight) [![Code Climate](https://img.shields.io/codeclimate/maintainability/konradjurk/ember-text-highlight.svg)](https://codeclimate.com/github/konradjurk/ember-text-highlight) [![Greenkeeper badge](https://badges.greenkeeper.io/konradjurk/ember-text-highlight.svg)](https://greenkeeper.io/) [![npm](https://img.shields.io/npm/v/ember-text-highlight.svg)](https://www.npmjs.com/package/ember-text-highlight)

This addon exposes a simple <a href="https://emberjs.com/api/ember/2.17/classes/Helper" target="_blank">Ember.Helper</a> that wraps matching parts of a text in a `span` with a stylable CSS class (`mark`).

It picks the algorithm that likely performs best in the current environment, making it up to **twice as fast** as the idiomatic implementation with regular expressions.

![Ember Text Highlight Demo (2MB)](https://github.com/konradjurk/ember-text-highlight/raw/master/demo-ember-text-highlight.gif "Ember Text Highlight Demo")

## Usage

1. Pick one way to install the addon.

    ```bash
    $ ember install ember-text-highlight
    $ yarn add ember-text-highlight --dev
    $ npm install ember-text-highlight --save-dev
    ```

2. Wrap around your template strings
    ```handlebars
    {{text-highlight content query=query}}
    ```

3. Style

    Lets say `content` is `Bryan Burke` and `query` is `Bry`:

    ```handlebars
    {{text-highlight 'Bryan Burke' query='bry'}}
    ```

    The rendered HTML will look like this:
    
    ```html
    <span class="mark">Bry</span>an Burke
    ```

    You can now style the CSS class `.mark` according to your wishes and context.

    A good start might be the style you see in the demo video above:

    ```css
    .mark {
      padding: 0 !important;
      background-color: rgba(255, 238, 115, 0.59);
    }
    ```

    [Twitter Bootstrap](https://getbootstrap.com/) already ships a [pre-styled `.mark` class](https://v4-alpha.getbootstrap.com/content/typography/#inline-text-elements).

## Contributing

* Fork repository
* `git clone <forked-repository-url>`
* `cd ember-text-highlight`
* `yarn install`
* Make sure everything works before you start: `yarn run test` (Runs `ember try:each` to test against multiple Ember versions)
* Improve something
* Re-run tests and adapt/expand
* Create a pull request 🙌
