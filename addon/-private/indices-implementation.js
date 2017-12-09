'use strict';

import Ember from 'ember';

/**
 * Indices Implementation
 *
 * Highlight `value` input String with String.indexOf() implementation that can be more performant on many short
 * Strings than the approach with a Regular Expression.
 *
 * @param {String} value The template string to highlight matches if any
 * @param {String} query The string to search in `value`
 * @param {Object} options
 * @param {Boolean} options.caseSensitive
 *
 * @returns {Ember.String.htmlSafe}
 */
export default function (value, query, options) {
  const indices = _findIndicesOf(query, value, options.caseSensitive);

  if (indices.length > 0) {
    const queryLength = query.length;
    const indicesCount = indices.length;
    const valueLength = value.toString().length;

    let result = '';
    for (let i = 0; i < indicesCount; i++) {
      const index = indices[i];

      if (i === 0 && index > 0) {
        result += value.slice(0, index);
      }

      const lastMatchEnd = indices[i - 1] + queryLength;
      if (i > 0 && index > lastMatchEnd) {
        result += value.slice(lastMatchEnd, index);
      }

      result += `<span class="mark">${value.slice(index, index + queryLength)}</span>`;

      if (i === indicesCount - 1 && index < valueLength - 1) {
        result += value.slice(index + queryLength, valueLength);
      }
    }

    return new Ember.String.htmlSafe(result);
  }

  return new Ember.String.htmlSafe(value);
}

/**
 * Find and return all indices of string `query` in `source`.
 *
 * @param {String} query
 * @param {String} source
 * @param {Boolean} [caseSensitive=false]
 * @returns {Number[]}
 * @private
 */
function _findIndicesOf(query, source, caseSensitive) {
  let index, startIndex = 0;

  const queryLength = query.length;
  const indices = [];

  if (!caseSensitive) {
    query = query.toLowerCase();
    source = source.toLowerCase();
  }

  while ((index = source.indexOf(query, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + queryLength;
  }

  return indices;
}
