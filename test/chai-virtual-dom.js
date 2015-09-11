/* global describe, it */
var chai = require('chai');
var expect = chai.expect;
chai.use(require('../index'));
var h = require('virtual-dom').h;

describe('chai virtual-dom plugin', function () {
  describe('look.like()', function () {
    it('should assert vtree looks like itself', function () {
      var vtree = h('div.widget#foo', [
        h('h1.header', 'Welcome to our webpage'),
        h('section', [
          h('span.label', 'Your name is...'),
          h('input', {type: 'input'}),
          h('hr'),
          h('div.something')
        ]),
      ]);
      expect(vtree).to.look.like(vtree);
    });

    it('should assert vtree at least like expected', function () {
      var actualVtree = h('div.widget#foo', [
        h('h1.header', 'Welcome to our webpage'),
        h('section', [
          h('span.label', 'Your name is...'),
          h('input', {type: 'input'}),
          h('hr'),
          h('div.something')
        ]),
      ]);
      var expectedVTree1 = h('div.widget#foo');
      var expectedVTree2 = h('div.widget#foo', [
        h('h1.header')
      ]);
      var expectedVTree3 = h('div.widget#foo', [
        h('h1.header'),
        h('section', [
          h('span.label'),
          h('input'),
          h('hr'),
          h('div.something')
        ])
      ]);
      expect(actualVtree).to.look.like(expectedVTree1);
      expect(actualVtree).to.look.like(expectedVTree2);
      expect(actualVtree).to.look.like(expectedVTree3);
    });

    it('should fail if vtree does not exactly match id and className', function () {
      var actualVtree = h('div.widget#foo', [
        h('h1.header', 'Welcome to our webpage'),
        h('section', [
          h('span.label', 'Your name is...'),
          h('input', {type: 'input'}),
          h('hr'),
          h('div.something')
        ]),
      ]);
      var expectedVTree1 = h('div');
      var expectedVTree2 = h('div.widget#foo', [
        h('h1')
      ]);
      expect(function () {
        expect(actualVtree).to.look.like(expectedVTree1);
        expect(actualVtree).to.look.like(expectedVTree2);
      }).to.throw();
    });
  });
});
