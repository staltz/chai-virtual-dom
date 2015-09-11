var toHTML = require('vdom-to-html');

function assertProperty(actualVTree, expectedVTree, prop) {
  this.assert(
    actualVTree.properties[prop] === expectedVTree.properties[prop],
    'expected #{act} to have the same ' + prop + ' as #{exp}',
    'expected #{act} to not have the same ' + prop + ' as #{exp}',
    toHTML(expectedVTree),
    toHTML(actualVTree)
  );
}

function assertVirtualText(actualVTree, expectedVTree) {
  this.assert(
    actualVTree.text === expectedVTree.text,
    'expected #{act} to be #{exp}',
    'expected #{act} to not be #{exp}',
    expectedVTree.text,
    actualVTree.text
  );
}

function assertVirtualNode(actualVTree, expectedVTree) {
  if (actualVTree.type === 'VirtualText') {
    assertVirtualText.call(this, actualVTree, expectedVTree);
    return;
  }
  this.assert(
    actualVTree.tagName === expectedVTree.tagName,
    'expected #{act} to have the same tagName as #{exp}',
    'expected #{act} to not have the same tagName as #{exp}',
    toHTML(expectedVTree),
    toHTML(actualVTree)
  );
  this.assert(
    actualVTree.children.length >= expectedVTree.children.length,
    'expected #{act} to have at least as many children as as #{exp}',
    'expected #{act} to not have as many children as #{exp}',
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
  chai.Assertion.addMethod('like', function like(expectedVTree) {
    var actualVTree = this._obj;
    assertVirtualNode.call(this, actualVTree, expectedVTree);
  });

  chai.Assertion.addProperty('look', function addPropertyLook() {
    return this;
  });
}

module.exports = chaiVirtualDOMPlugin;
