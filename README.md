# Ember Text Highlight [![Build Status](https://travis-ci.org/konradjurk/ember-text-highlight.svg?branch=master)](https://travis-ci.org/konradjurk/ember-text-highlight) [![Greenkeeper badge](https://badges.greenkeeper.io/konradjurk/ember-text-highlight.svg)](https://greenkeeper.io/)

This addon exposes a simple Ember.Helper that wraps matching parts of a text in a `span` with a stylable CSS class (`mark`).

It picks the algorithm that likely performs best in the current environment, making it up to **twice as fast** as the idiomatic implementation with regular expressions.

![Ember Text Highlight Demo (2MB)](https://github.com/konradjurk/ember-text-highlight/blob/master/demo-eber-text-highlight.gif "Ember Text Highlight Demo")

## Installation

Ember CLI (via NPM)

`ember install ember-text-highlight`

Ember CLI (via Yarn)

`ember install ember-text-highlight --yarn`

Yarn

`yarn add ember-text-highlight --dev`

NPM

`npm install ember-text-highlight --save-dev`


## Contributing

* fork repository
* `git clone <forked-repository-url>`
* `cd ember-text-highlight`
* `yarn install`
* make sure everything works: `yarn run test` (Runs `ember try:each` to test against multiple Ember versions)
* imprive something and create a pull request 🙌
