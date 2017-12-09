/**
 * Created by konradjurk on 19.09.15.
 */

'use strict';

import Ember from 'ember';
import _lang from 'lodash/lang';
import _array from 'lodash/array';
import {isSafari} from 'ember-text-highlight/-private/env-detection';

import indicesImplementation from 'ember-text-highlight/-private/indices-implementation';
import regexImplementation from 'ember-text-highlight/-private/regex-implementation';

// this is roughly the spot where RegExp starts to exceeds indices implementation
const REGEX_SWEETSPOT_TEXT_LENGTH = 250;

let thisEnvFastestImplementation;

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
