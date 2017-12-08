/**
 * Created by konradjurk on 19.09.15.
 */
'use strict';

import Ember from 'ember';

// this is roughly the spot where RegExp starts to exceeds indices implementation
const REGEX_SWEETSPOT_TEXT_LENGTH = 250;

let thisEnvFastestImplementation;

export const indicesImplementation = {
  highlight(value, options) {
    var query = options.query;
    var caseSensitive = !!options.caseSensitive; // ==> if not existent: false

    if (query && query.length > 0) {
      var indices = this._findIndicesOf(query, value, caseSensitive);

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
    }

    return value;
  },

  /**
   * Find and return all indices of string `query` in `source`.
   *
   * @param {String} query
   * @param {String} source
   * @param {Boolean} [caseSensitive=false]
   * @returns {Number[]}
   * @private
   */
  _findIndicesOf(query, source, caseSensitive = false) {
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
};

export const regexImplementation = {
  highlight(value/*, options*/) {
    let regexp = new RegExp(value, 'gim');
    let highlightedInput = value.replace(regexp, '<span class="mark">$&</span>');

    return new Ember.String.htmlSafe(highlightedInput);
  }
};

/**
 * Picks the best implementation and calls and returns `highlight()` on it.
 */
export default Ember.Helper.helper(function (value, options) {
  // make sure we are working with a string
  const isString = typeof value === 'string';
  value = !isString ? '' : value;

  if (value.trim().length === 0) {
    return new Ember.String.htmlSafe(value);
  }

  // will RegExp likely exceed the performance of the indices approach?
  if (value.length > REGEX_SWEETSPOT_TEXT_LENGTH) {
    return regexImplementation.highlight(value, options);
  }

  // pick best implementation for this browser (indices, except Safari)
  if (!thisEnvFastestImplementation) {
    // pick implementation
    const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

    if (isSafari) {
      thisEnvFastestImplementation = regexImplementation;
    } else {
      thisEnvFastestImplementation = indicesImplementation;
    }
  }

  return thisEnvFastestImplementation.highlight(value, options);
});
