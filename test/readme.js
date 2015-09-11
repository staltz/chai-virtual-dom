var chai = require('chai');
var expect = chai.expect;
chai.use(require('../index'));
var h = require('virtual-dom').h;

describe('My virtual-dom project', function () {
  var myVTree = h('div#foo', [
    h('h1.header', 'Welcome to our webpage'),
    h('ol.list', [
      h('li', 'First thing'),
      h('li', 'Second thing'),
      h('li', 'Third thing')
    ]),
  ]);

  it('should look roughly like a list', function () {
    var expected = h('div#foo', [
      h('h1.header'),
      h('ol.list')
    ]);
    // Use .look.like() to do an approximate assertion
    // Must match: tagName, id, className.
    // Must match only if provided in expected: children.
    expect(myVTree).to.look.like(expected);
  });

  it('should look exactly like a list', function () {
    var expected = h('div#foo', [
      h('h1.header', 'Welcome to our webpage'),
      h('ol.list', [
        h('li', 'First thing'),
        h('li', 'Second thing'),
        h('li', 'Third thing')
      ]),
    ]);
    // Use .look.exactly.like() to do an approximate assertion
    // Must match: tagName, id, className, and children.
    expect(myVTree).to.look.exactly.like(expected);
  });
});
