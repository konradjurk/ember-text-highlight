/**
 * Created by konradjurk on 19.09.15.
 */

import { helper } from '@ember/component/helper';
import { assign } from '@ember/polyfills';
import { typeOf, isEmpty } from '@ember/utils';
import { htmlSafe } from '@ember/template';

import { isSafari } from 'ember-text-highlight/-private/env-detection';

import indicesImplementation from 'ember-text-highlight/-private/indices-implementation';
import regexImplementation from 'ember-text-highlight/-private/regex-implementation';

// RegEx Implementation exceeds Indices Implementation on large texts independent of environment
export const MAX_VALUE_LENGTH_FOR_INDICES_IMPL = 250;

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
export default helper(function textHighlight(params = [], options = DEFAULT_OPTIONS) {
  const value = findValueAndTransformToStringIfApplicable(params);
  const query = options.query;

  // validate and transform input
  const queryIsValid = typeOf(query) === 'string' && !isEmpty(query.trim());
  const valueIsValid = typeOf(value) === 'string' && !isEmpty(value.trim());

  if (!queryIsValid) {
    return htmlSafe(value);
  }

  if (!valueIsValid) {
    return '';
  }

  //options = _object.merge(DEFAULT_OPTIONS, _lang.clone(options));
  options = assign(DEFAULT_OPTIONS, options);

  // as of a certain value length, regular expressions will likely start to exceed the performance of our indices
  // implementation
  if (value.length > MAX_VALUE_LENGTH_FOR_INDICES_IMPL) {
    return regexImplementation(value, query, options);
  }

  // pick the best implementation for this environment (indices, except Safari)
  if (!window._text_highlight_fastest_impl) {
    if (isSafari()) {
      window._text_highlight_fastest_impl = regexImplementation;
    } else {
      window._text_highlight_fastest_impl = indicesImplementation;
    }
  }

  return window._text_highlight_fastest_impl(value, query, options);
});

function findValueAndTransformToStringIfApplicable(params) {
  const value = params[0];
  return typeOf(value) === 'number' ? value.toString() : value;
}
