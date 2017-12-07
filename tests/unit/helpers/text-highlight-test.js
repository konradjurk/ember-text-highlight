// (1)  Test-Infrastructure Dependencies
import {module, test} from 'qunit';

// (2)  Test-Infrastructure Setup
// -

// (3)  Test-Convenience Dependencies
// -

// (4)  Test-Project Dependencies
//      - setup dependency mocks either here if always needed or in before/beforeEach hooks
import {indicesOfImplementation} from 'dummy/helpers/text-highlight';

// (5)  Test-Project Global Fake Data
//      - declare here if needed in various tests
//      - please leave "region" comments as it allows some IDEs to collapse the lines in between
//      - please declare all variables here as "var" instead of "let" or "const" as var hoisting makes it easier
//        to reference them
//region GLOBAL FAKE DATA
//endregion

// (6)  Parameterized Test Scenarios
//      - sometimes the test setup is the same but it makes sense to test with a wide variety of input data
//      - declare each input scenario as an array element with the desired input and expected output

//region PARAMETERIZED TEST SCENARIOS
const scenarios = [
  // implicit case insensitive
  {
    input: {
      query: 'ab',
      target: 'TestAb'
    },
    expectedResult: {
      string: 'Test<span class=\"mark\">Ab</span>'
    }
  },
  {
    input: {
      query: 'ab',
      target: 'AbTest'
    },
    expectedResult: {
      string: '<span class="mark">Ab</span>Test'
    }
  },
  {
    input: {
      query: 'ab',
      target: 'Ababab'
    },
    expectedResult: {
      string: '<span class="mark">Ab</span><span class="mark">ab</span><span class="mark">ab</span>'
    }
  },
  {
    input: {
      query: 'nomatch',
      target: 'Test'
    },
    expectedResult: 'Test'
  },

  // explicit case insensitive
  {
    input: {
      query: 'ab',
      target: 'TestAb',
      caseSensitive: false
    },
    expectedResult: {
      string: 'Test<span class=\"mark\">Ab</span>'
    }
  },
  {
    input: {
      query: 'ab',
      target: 'AbTest',
      caseSensitive: false
    },
    expectedResult: {
      string: '<span class="mark">Ab</span>Test'
    }
  },
  {
    input: {
      query: 'ab',
      target: 'Ababab',
      caseSensitive: false
    },
    expectedResult: {
      string: '<span class="mark">Ab</span><span class="mark">ab</span><span class="mark">ab</span>'
    }
  },
  {
    input: {
      query: 'nomatch',
      target: 'Test',
      caseSensitive: false
    },
    expectedResult: 'Test'
  },

  // case sensitive
  {
    input: {
      query: 'ab',
      target: 'TestAb',
      caseSensitive: true
    },
    expectedResult: 'TestAb'
  },
  {
    input: {
      query: 'ab',
      target: 'AbTest',
      caseSensitive: true
    },
    expectedResult: 'AbTest'
  },
  {
    input: {
      query: 'ab',
      target: 'Ababab',
      caseSensitive: true
    },
    expectedResult: {
      string: 'Ab<span class="mark">ab</span><span class="mark">ab</span>'
    }
  },
  {
    input: {
      query: 'nomatch',
      target: 'Test',
      caseSensitive: true
    },
    expectedResult: 'Test'
  },
];
//endregion

module('Unit | Helper | Text Highlight | indicesOfImplementation()');
scenarios.forEach(scenario => {
  test('[PARAMETERIZED] ' + JSON.stringify(scenario), function (assert) {
    const helperOptions = {query: scenario.input.query};

    if (typeof scenario.input.caseSensitive === 'boolean') {
      helperOptions['caseSensitive'] = scenario.input.caseSensitive;
    }

    let result = indicesOfImplementation(scenario.input.target, helperOptions);

    if (result.string) {
      assert.equal(result.string, scenario.expectedResult.string);
    } else {
      assert.equal(result, scenario.expectedResult);
    }
  });
});
