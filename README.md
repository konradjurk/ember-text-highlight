# Ember Text Highlight [![Build Status](https://travis-ci.org/konradjurk/ember-text-highlight.svg?branch=master)](https://travis-ci.org/konradjurk/ember-text-highlight) [![Greenkeeper badge](https://badges.greenkeeper.io/konradjurk/ember-text-highlight.svg)](https://greenkeeper.io/)

This addon exposes a simple [Ember.Helper](https://emberjs.com/api/ember/2.17/classes/Helper) that wraps matching parts of a text in a `span` with a stylable CSS class (`mark`).

It picks the algorithm that likely performs best in the current environment, making it up to **twice as fast** as the idiomatic implementation with regular expressions.

![Ember Text Highlight Demo (2MB)](https://github.com/konradjurk/ember-text-highlight/raw/master/demo-ember-text-highlight.gif "Ember Text Highlight Demo")

## How to use

1. Pick one way to install the addon.

```bash
$ ember install ember-text-highlight --yarn #Ember CLI via Yarn
$ ember install ember-text-highlight #Ember CLI via NPM
$ yarn add ember-text-highlight --dev #Yarn
$ npm install ember-text-highlight --save-dev #NPM

```

2. Wrap around your desired template content
```handlebars
{{{text-highlight content query=query}}}

```

## Contributing

* fork repository
* `git clone <forked-repository-url>`
* `cd ember-text-highlight`
* `yarn install`
* make sure everything works: `yarn run test` (Runs `ember try:each` to test against multiple Ember versions)
* imprive something and create a pull request 🙌
