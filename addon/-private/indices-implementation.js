import Ember from 'ember';
import _lang from 'lodash/lang';

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
  const indices = findIndicesOf(query, value, options.caseSensitive);

  // If we couldn't find any match, return input untouched
  if (_lang.isEmpty(indices)) {
    return Ember.String.htmlSafe(value);
  }

  const queryLength = query.length;
  const indicesCount = indices.length;
  const valueLength = value.length;

  let result = '';
  let lastIndex;
  for (let i = 0; i < indicesCount; i++) {
    const index = lastIndex = indices[i];

    // Find and add unmatched characters before this match
    const matchPrefixStartIndex = findMatchPrefixStartIndex(indices, i, queryLength);
    result += value.slice(matchPrefixStartIndex, index);

    // Add wrapped match
    result += `<span class="mark">${value.slice(index, index + queryLength)}</span>`;
  }

  // If applicable, add remaining characters after the last match
  if (hasRemainingUnmatchedCharacters(lastIndex, queryLength, valueLength)) {
    result += value.slice(lastIndex + queryLength, valueLength);
  }

  return Ember.String.htmlSafe(result);
}

function findMatchPrefixStartIndex(indices, i, queryLength) {
  return i === 0 ? 0 : indices[i - 1] + queryLength;
}

function hasRemainingUnmatchedCharacters(lastIndex, queryLength, valueLength) {
  const lastMatchEndIndex = lastIndex + queryLength;
  return lastMatchEndIndex < valueLength;
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
function findIndicesOf(query, source, caseSensitive) {
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
