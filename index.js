var toHTML = require('vdom-to-html');

function assertProperty(actualVTree, expectedVTree, prop) {
  this.assert(
    actualVTree.properties[prop] === expectedVTree.properties[prop],
    'expected\n\n#{act}\n\nto have the same ' + prop + ' as\n\n#{exp}',
    'expected\n\n#{act}\n\nto not have the same ' + prop + ' as\n\n#{exp}',
    toHTML(expectedVTree),
    toHTML(actualVTree)
  );
}

function assertVirtualText(actualVTree, expectedVTree) {
  this.assert(
    actualVTree.text === expectedVTree.text,
    'expected\n\n#{act}\n\nto be\n\n#{exp}',
    'expected\n\n#{act}\n\nto not be\n\n#{exp}',
    expectedVTree.text,
    actualVTree.text
  );
}

function assertVirtualNodeExactly(actualVTree, expectedVTree) {
  this.assert(
    toHTML(actualVTree) === toHTML(expectedVTree),
    'expected\n\n#{act}\n\nto look exactly like\n\n#{exp}',
    'expected\n\n#{act}\n\nto not look exactly like\n\n#{exp}',
    toHTML(expectedVTree),
    toHTML(actualVTree)
  );
}

function assertVirtualNode(actualVTree, expectedVTree) {
  if (actualVTree.type === 'VirtualText') {
    assertVirtualText.call(this, actualVTree, expectedVTree);
    return;
  }
  if (this._exactly) {
    assertVirtualNodeExactly.call(this, actualVTree, expectedVTree);
    return;
  }
  this.assert(
    actualVTree.tagName === expectedVTree.tagName,
    'expected\n\n#{act}\n\nto have the same tagName as\n\n#{exp}',
    'expected\n\n#{act}\n\nto not have the same tagName as\n\n#{exp}',
    toHTML(expectedVTree),
    toHTML(actualVTree)
  );
  this.assert(
    actualVTree.children.length >= expectedVTree.children.length,
    'expected\n\n#{act}\n\nto have at least as many children as as\n\n#{exp}',
    'expected\n\n#{act}\n\nto not have as many children as\n\n#{exp}',
    toHTML(expectedVTree),
    toHTML(actualVTree)
  );
  assertProperty.call(this, actualVTree, expectedVTree, 'id');
  assertProperty.call(this, actualVTree, expectedVTree, 'className');
  for (var i = expectedVTree.children.length - 1; i >= 0; i--) {
    assertVirtualNode.call(this,
      actualVTree.children[i],
      expectedVTree.children[i]
    );
  }
}

function chaiVirtualDOMPlugin(chai) {
  chai.Assertion.addProperty('look', function addPropertyLook() {
    return this;
  });

  chai.Assertion.addChainableMethod('exactly',
    function exactlyAsMethod() {
      throw new Error('Exactly like what? You used the chai assertion probably ' +
        'with some missing method. You probably used it as ' +
        '`expect(output).to.look.exactly`, while it is meant to be used as ' +
        '`expect(output).to.look.exactly.like(expected)`.');
    },
    function exactlyAsProperty() {
      this._exactly = true;
    }
  );

  chai.Assertion.addMethod('like', function like(expectedVTree) {
    var actualVTree = this._obj;
    assertVirtualNode.call(this, actualVTree, expectedVTree);
  });
}

module.exports = chaiVirtualDOMPlugin;
