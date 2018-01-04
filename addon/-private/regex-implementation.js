import Ember from 'ember';

/**
 * RegEx Implementation
 *
 * Highlight `value` input String with String.replace(RegExp) implementation that can be more performant on many
 * large texts than the indices implementation.
 *
 * @param {String} value The template string to highlight matches if any
 * @param {String} query The string to search in `value`
 * @param {Object} options
 * @param {Boolean} options.caseSensitive
 *
 * @returns {Ember.String.htmlSafe}
 */
export default function (value, query, options) {
  let regexFlags = 'gm'; // g=global, m=multi-line

  if (!options.caseSensitive) {
    regexFlags += 'i';
  }

  const regexp = new RegExp(escape(query), regexFlags);
  return Ember.String.htmlSafe(value.replace(regexp, '<span class="mark">$&</span>'));
}

function escape(str) {
  /* eslint-disable no-useless-escape */
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
