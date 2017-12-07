/**
 * Created by konradjurk on 19.09.15.
 */
'use strict';

import Ember from 'ember';

export default Ember.Helper.helper(function (value, options) {
  var filter = options.filter;

  if (filter && filter.length > 0) {
    var indices = indicesOf(filter, value, false);

    if (indices && indices.length > 0) {
      var queryLength = filter.length,
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

      return new Ember.Handlebars.SafeString(result);
    }
  }

  return value;
});

function indicesOf(query, source, caseSensitive) {
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
