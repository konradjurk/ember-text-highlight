/**
 * Created by konradjurk on 19.09.15.
 */

'use strict';

import Ember from 'ember';
import _lang from 'lodash/lang';
import _array from 'lodash/array';

import {isSafari} from 'ember-text-highlight/-private/env-detection';

// this is roughly the spot where RegExp starts to exceeds indices implementation
const REGEX_SWEETSPOT_TEXT_LENGTH = 250;

let thisEnvFastestImplementation;

export const indicesImplementation = {
  highlight(value, query, options) {
    var caseSensitive = !!options.caseSensitive; // ==> if not existent: false

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

    return new Ember.String.htmlSafe(value);
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
  highlight(value, query, options) {
    let regexFlags = 'gm'; // g=global, m=multi-line

    if (!options.caseSensitive) {
      regexFlags += 'i';
    }

    let regexp = new RegExp(query, regexFlags);
    return new Ember.String.htmlSafe(value.replace(regexp, '<span class="mark">$&</span>'));
  }
};

/**
 * Picks the best implementation and calls and returns `highlight()` on it.
 */
export default Ember.Helper.helper(function (params = [], options = {}) {
  let value, query;

  // input validation
  const queryIsValid = _lang.isString(query = options.query) && !_lang.isEmpty(query.trim());
  const valueIsValid = _lang.isString(value = _array.nth(params, 0)) && !_lang.isEmpty(value.trim());

  if (!queryIsValid) {
    return new Ember.String.htmlSafe(value);
  }

  if (!valueIsValid) {
    return '';
  }

  // as of a certain value length, regular expressions will likely start to exceed the performance of our indices
  // implementation
  if (value.length > REGEX_SWEETSPOT_TEXT_LENGTH) {
    return regexImplementation.highlight(value, query, options);
  }

  // pick the best implementation for this environment (indices, except Safari)
  if (!thisEnvFastestImplementation) {
    if (isSafari()) {
      thisEnvFastestImplementation = regexImplementation;
    } else {
      thisEnvFastestImplementation = indicesImplementation;
    }
  }

  return thisEnvFastestImplementation.highlight(value, query, options);
});
