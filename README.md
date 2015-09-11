# chai-virtual-dom

virtual-dom assertions for chai. Tests your virtual-dom elements (VirtualNodes, or "VTrees").

[![NPM version](http://img.shields.io/npm/v/chai-virtual-dom.svg?style=flat-square)](https://www.npmjs.org/package/chai-virtual-dom)

#### Example

```js
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai-virtual-dom'));
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
```

#### Installation

This is a plugin for the [Chai Assertion Library](http://chaijs.com). Install via [npm](http://npmjs.org).

    npm install --save-dev chai-virtual-dom

#### Usage

To use this plugin in your tests, import as such:

```js
var chai = require('chai');
chai.use(require('chai-virtual-dom'));
```

#### LICENSE

Copyright (c) 2015 Andre Staltz
Licensed under the MIT license.
