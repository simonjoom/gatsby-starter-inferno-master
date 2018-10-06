(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('inferno')) :
  typeof define === 'function' && define.amd ? define(['exports', 'inferno'], factory) :
  (factory((global.Inferno = global.Inferno || {}),global.Inferno));
}(this, (function (exports,inferno) { 'use strict';

  function isDOMinsideVNode(DOM, vNode) {
      var stack = [vNode];
      var _vNode;
      var flags;
      var children;
      while (stack.length > 0) {
          _vNode = stack.pop();
          if (_vNode.dom === DOM) {
              return true;
          }
          flags = _vNode.flags;
          children = _vNode.children;
          if (flags & 4 /* ComponentClass */) {
              stack.push(children.$LI);
          }
          else if (flags & 8 /* ComponentFunction */) {
              stack.push(children);
          }
          else {
              flags = _vNode.childFlags;
              if (flags & 12 /* MultipleChildren */) {
                  var i = children.length;
                  while (i--) {
                      stack.push(children[i]);
                  }
              }
              else if (flags & 2 /* HasVNodeChildren */) {
                  stack.push(children);
              }
          }
      }
      return false;
  }
  function isDOMinsideComponent(DOM, instance) {
      if (instance.$UN) {
          return false;
      }
      return isDOMinsideVNode(DOM, instance.$LI);
  }

  function findDOMNode(ref) {
      if (ref && ref.nodeType) {
          return ref;
      }
      if (!ref || ref.$UN) {
          return null;
      }
      if (ref.$LI) {
          return inferno.findDOMfromVNode(ref.$LI);
      }
      if (ref.flags) {
          return inferno.findDOMfromVNode(ref);
      }
      return null;
  }

  exports.findDOMNode = findDOMNode;
  exports.isDOMinsideVNode = isDOMinsideVNode;
  exports.isDOMinsideComponent = isDOMinsideComponent;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
