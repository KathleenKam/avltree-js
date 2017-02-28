var assert = require('assert');
var AvlTree = require('../index.js');

describe('avltree-js tests', function() {
	describe('insert', function () {
		var tree;
		beforeEach(function () {
			tree = new AvlTree();
		});
		it('should contain the inserted value', function () {
			tree.insert(1);
			assert.strictEqual(tree._root.element, 1);
			tree.insert(2);
			assert.strictEqual(tree._root.right.element, 2);
			assert.strictEqual(tree._root.height, 2);
		});
		it('should balance a right right heavy tree', function () {
			tree.insert(1);
			tree.insert(2);
			tree.insert(3);
			assert.strictEqual(tree._root.element, 2);
			assert.strictEqual(tree._root.left.element, 1);
			assert.strictEqual(tree._root.right.element, 3);
			assert.strictEqual(tree._root.height, 2);
			assert.strictEqual(tree._root.left.height, 1);
			assert.strictEqual(tree._root.right.height, 1);
		});
		it('should balance a left left heavy tree', function () {
			tree.insert(3);
			tree.insert(2);
			tree.insert(1);
			assert.strictEqual(tree._root.element, 2);
			assert.strictEqual(tree._root.left.element, 1);
			assert.strictEqual(tree._root.right.element, 3);
			assert.strictEqual(tree._root.height, 2);
			assert.strictEqual(tree._root.left.height, 1);
			assert.strictEqual(tree._root.right.height, 1);
		});
		it('should balance a right left heavy tree', function () {
			tree.insert(3);
			tree.insert(1);
			tree.insert(2);
			assert.strictEqual(tree._root.element, 2);
			assert.strictEqual(tree._root.left.element, 1);
			assert.strictEqual(tree._root.right.element, 3);
			assert.strictEqual(tree._root.height, 2);
			assert.strictEqual(tree._root.left.height, 1);
			assert.strictEqual(tree._root.right.height, 1);
		});
		it('should backtrack and balance', function () {
			tree.insert(1);
			tree.insert(2);
			tree.insert(3);
			tree.insert(4);
			tree.insert(5);
			tree.insert(6);
			assert.strictEqual(tree._root.element, 4);
			assert.strictEqual(tree._root.height, 3);
			assert.strictEqual(tree._root.left.element, 2);
			assert.strictEqual(tree._root.left.height, 2);
			assert.strictEqual(tree._root.left.left.element, 1);
			assert.strictEqual(tree._root.left.left.height, 1);
			assert.strictEqual(tree._root.left.right.element, 3);
			assert.strictEqual(tree._root.left.right.height, 1);
			assert.strictEqual(tree._root.right.element, 5);
			assert.strictEqual(tree._root.right.height, 2);
			assert.strictEqual(tree._root.right.right.element, 6);
			assert.strictEqual(tree._root.right.right.height, 1);
		});
	});
	describe('search', function () {
		var tree;
		beforeEach(function () {
			tree = new AvlTree();
		});
		it('should find the desired element', function () {
			var root = tree.insert(1, null);
			tree.insert(3);
			tree.insert(4);
			tree.insert(8);
			tree.insert(2);
			tree.insert(9);
			tree.insert(5);
			tree.insert(11);
			tree.insert(7);
			tree.insert(6);
			tree.insert(10);
			var target = 6;
			var targetNode = tree.search(target);
			assert.strictEqual(targetNode.element, target);
			tree.insert(12);
			tree.insert(13);
			tree.insert(15);
			tree.insert(16);
			tree.insert(14);
			var targetNode = tree.search(target, root);
			assert.strictEqual(targetNode.element, target);
		});
	});
	describe('delete', function () {
		var tree;
		beforeEach(function () {
			tree = new AvlTree();
		});
		it('should remove a leaf element from the tree', function () {
			tree.insert(1);
			tree.insert(2);
			tree.delete(2);
			assert.strictEqual(tree._root.right, null);
			assert.strictEqual(tree._root.element, 1);
			assert.strictEqual(tree._root.height, 1);
		});
		it('should delete the root from the tree', function () {
			tree.insert(1);
			tree.delete(1);
			assert.strictEqual(tree._root, null);
		});
		it('should delete and replace the root', function () {
			tree.insert(1);
			tree.insert(2);
			tree.delete(1);
			assert.strictEqual(tree._root.element, 2);
			assert.strictEqual(tree._root.height, 1);
		});
		it('should remove an element with only left children', function () {
			tree.insert(3);
			tree.insert(2);
			assert.strictEqual(tree._root.height, 2);
			assert.strictEqual(tree._root.left.height, 1);
			tree.delete(2);
			assert.strictEqual(tree._root.element, 3);
			assert.strictEqual(tree._root.height, 1);
		});
		it('should remove an element with only right children', function () {
			tree.insert(1);
			tree.insert(2);
			tree.delete(2);
			assert.strictEqual(tree._root.element, 1);
			assert.strictEqual(tree._root.height, 1);
			assert.strictEqual(tree._root.right, null);
			assert.strictEqual(tree._root.left, null);
		});
		it('should balance a large tree', function () {
			tree.insert(50);
			tree.insert(25);
			tree.insert(75);
			tree.insert(10);
			tree.insert(30);
			tree.insert(60);
			tree.insert(80);
			tree.insert(5);
			tree.insert(15);
			tree.insert(27);
			tree.insert(55);
			tree.insert(1);
			assert.strictEqual(tree._root.element, 50);
			assert.strictEqual(tree._root.height, 5);
			assert.strictEqual(tree._root.left.element, 25);
			assert.strictEqual(tree._root.left.height, 4);
			assert.strictEqual(tree._root.right.element, 75);
			assert.strictEqual(tree._root.right.height, 3);
			assert.strictEqual(tree._root.left.left.element, 10);
			assert.strictEqual(tree._root.left.left.height, 3);
			assert.strictEqual(tree._root.left.right.element, 30);
			assert.strictEqual(tree._root.left.right.height, 2);
			assert.strictEqual(tree._root.right.left.element, 60);
			assert.strictEqual(tree._root.right.left.height, 2);
			assert.strictEqual(tree._root.right.right.element, 80);
			assert.strictEqual(tree._root.right.right.height, 1);
			assert.strictEqual(tree._root.left.left.left.element, 5);
			assert.strictEqual(tree._root.left.left.left.height, 2);
			assert.strictEqual(tree._root.left.left.right.element, 15);
			assert.strictEqual(tree._root.left.left.right.height, 1);
			assert.strictEqual(tree._root.left.right.left.element, 27);
			assert.strictEqual(tree._root.left.right.left.height, 1);
			assert.strictEqual(tree._root.right.left.left.element, 55);
			assert.strictEqual(tree._root.right.left.left.height, 1);
			assert.strictEqual(tree._root.left.left.left.left.element, 1);
			assert.strictEqual(tree._root.left.left.left.left.height, 1);
			tree.delete(80);
			assert.strictEqual(tree._root.element, 25);
			assert.strictEqual(tree._root.height, 4);
			assert.strictEqual(tree._root.left.element, 10);
			assert.strictEqual(tree._root.left.height, 3);
			assert.strictEqual(tree._root.right.element, 50);
			assert.strictEqual(tree._root.right.height, 3);
			assert.strictEqual(tree._root.left.left.element, 5);
			assert.strictEqual(tree._root.left.left.height, 2);
			assert.strictEqual(tree._root.left.right.element, 15);
			assert.strictEqual(tree._root.left.right.height, 1);
			assert.strictEqual(tree._root.right.left.element, 30);
			assert.strictEqual(tree._root.right.left.height, 2);
			assert.strictEqual(tree._root.right.right.element, 60);
			assert.strictEqual(tree._root.right.right.height, 2);
			assert.strictEqual(tree._root.left.left.left.element, 1);
			assert.strictEqual(tree._root.left.left.left.height, 1);
			assert.strictEqual(tree._root.right.left.left.element, 27);
			assert.strictEqual(tree._root.right.left.left.height, 1);
			assert.strictEqual(tree._root.right.right.left.element, 55);
			assert.strictEqual(tree._root.right.right.left.height, 1);
			assert.strictEqual(tree._root.right.right.right.element, 75);
			assert.strictEqual(tree._root.right.right.right.height, 1);
		});
		it('should remove an element with two children', function () {
			assert.strictEqual(false, true);
		});
	});
});