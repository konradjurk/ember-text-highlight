'use strict';

import Ember from 'ember';

export default function (value, query, options) {
  var caseSensitive = !!options.caseSensitive; // ==> if not existent: false

  var indices = _findIndicesOf(query, value, caseSensitive);

  if (indices && indices.length > 0) {
    var queryLength = query.length,
      indicesCount = indices.length,
      valueLength = value.toString().length,
      result = '';

    for (var i = 0; i < indicesCount; i++) {
      var index = indices[i];

      if (i === 0 && index > 0) {
        result += value.toString().slice(0, index);
      }

      var lastMatchEnd = indices[i - 1] + queryLength;
      if (i > 0 && index > lastMatchEnd) {
        result += value.toString().slice(lastMatchEnd, index);
      }

      result += '<span class="mark">';
      result += value.toString().slice(index, index + queryLength);
      result += '</span>';

      if (i === indicesCount - 1 && index < valueLength - 1) {
        result += value.toString().slice(index + queryLength, valueLength);
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
function _findIndicesOf(query, source, caseSensitive = false) {
  var index,
    queryLength = query.length,
    startIndex = 0,
    indices = [];

  if (!caseSensitive) {
    query = query.toLowerCase();
    source = (source !== null && typeof source !== 'undefined') ? source.toString().toLowerCase() : '';
  }

  while ((index = source.indexOf(query, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + queryLength;
  }

  return indices;
}
