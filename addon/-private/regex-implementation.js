'use strict';

import Ember from 'ember';

export default function (value, query, options) {
  let regexFlags = 'gm'; // g=global, m=multi-line

  if (!options.caseSensitive) {
    regexFlags += 'i';
  }

  let regexp = new RegExp(query, regexFlags);
  return new Ember.String.htmlSafe(value.replace(regexp, '<span class="mark">$&</span>'));
}
