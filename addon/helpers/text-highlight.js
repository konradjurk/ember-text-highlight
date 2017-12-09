/**
 * Created by konradjurk on 19.09.15.
 */

'use strict';

import Ember from 'ember';
import _lang from 'lodash/lang';
import _array from 'lodash/array';
import _object from 'lodash/object';

import {isSafari} from 'ember-text-highlight/-private/env-detection';

import indicesImplementation from 'ember-text-highlight/-private/indices-implementation';
import regexImplementation from 'ember-text-highlight/-private/regex-implementation';

// RegEx Implementation exceeds Indices Implementation on large texts independent of environment
const MAX_VALUE_LENGTH_FOR_INDICES_IMPL = 250;

// cache selected implementation for following executions
let thisEnvFastestImplementation;

const DEFAULT_OPTIONS = {
  caseSensitive: false
};

/**
 * Text Highlight Helper
 *
 * Mark all occurences of a string in input string with <span class="mark">
 *
 * Usage:
 * {{{text-highlight value query=myQuery}}}
 *
 * Expected Input:
 * `params` = ['valueString']
 * `options` = {query: 'queryString'}
 *
 * Picks the best implementation concerning input and environment.
 */
export default Ember.Helper.helper(function (params = [], options = DEFAULT_OPTIONS) {
  let value, query;

  // validate and transform input
  const queryIsValid = _lang.isString(query = options.query) && !_lang.isEmpty(query.trim());
  const valueIsValid = _lang.isString(value = _array.nth(params, 0)) && !_lang.isEmpty(value.trim());

  if (!queryIsValid) {
    return new Ember.String.htmlSafe(value);
  }

  if (!valueIsValid) {
    return '';
  }

  options = _object.merge(DEFAULT_OPTIONS, _lang.clone(options));

  // as of a certain value length, regular expressions will likely start to exceed the performance of our indices
  // implementation
  if (value.length > MAX_VALUE_LENGTH_FOR_INDICES_IMPL) {
    return regexImplementation(value, query, options);
  }

  // pick the best implementation for this environment (indices, except Safari)
  if (!thisEnvFastestImplementation) {
    if (isSafari()) {
      thisEnvFastestImplementation = regexImplementation;
    } else {
      thisEnvFastestImplementation = indicesImplementation;
    }
  }

  return thisEnvFastestImplementation(value, query, options);
});
