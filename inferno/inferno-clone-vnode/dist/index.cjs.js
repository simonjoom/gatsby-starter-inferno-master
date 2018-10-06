'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var inferno = require('inferno');

var isBrowser = !!(typeof window !== 'undefined' && window.document);
var isArray = Array.isArray;
function isStringOrNumber(o) {
    var type = typeof o;
    return type === 'string' || type === 'number';
}
function isInvalid(o) {
    return isNull(o) || o === false || isTrue(o) || isUndefined(o);
}
function isNull(o) {
    return o === null;
}
function isTrue(o) {
    return o === true;
}
function isUndefined(o) {
    return o === void 0;
}
function combineFrom(first, second) {
    var out = {};
    if (first) {
        for (var key in first) {
            out[key] = first[key];
        }
    }
    if (second) {
        for (var key$1 in second) {
            out[key$1] = second[key$1];
        }
    }
    return out;
}

/*
 directClone is preferred over cloneVNode and used internally also.
 This function makes Inferno backwards compatible.
 And can be tree-shaked by modern bundlers

 Would be nice to combine this with directClone but could not do it without breaking change
*/
/**
 * Clones given virtual node by creating new instance of it
 * @param {VNode} vNodeToClone virtual node to be cloned
 * @param {Props=} props additional props for new virtual node
 * @param {...*} _children new children for new virtual node
 * @returns {VNode} new virtual node
 */
function cloneVNode(vNodeToClone, props) {
    var _children = [], len$1 = arguments.length - 2;
    while ( len$1-- > 0 ) _children[ len$1 ] = arguments[ len$1 + 2 ];

    if (arguments.length === 3) {
        if (!props) {
            props = {};
        }
        props.children = _children[0];
    }
    else {
        var childrenLen = _children.length;
        if (childrenLen > 0) {
            if (!props) {
                props = {};
            }
            props.children = _children;
        }
    }
    var newVNode;
    var flags = vNodeToClone.flags;
    var className = vNodeToClone.className;
    var key = vNodeToClone.key;
    var ref = vNodeToClone.ref;
    if (props) {
        if (props.className !== void 0) {
            className = props.className;
        }
        if (props.ref !== void 0) {
            ref = props.ref;
        }
        if (props.key !== void 0) {
            key = props.key;
        }
    }
    if (flags & 14 /* Component */) {
        newVNode = inferno.createComponentVNode(flags, vNodeToClone.type, !vNodeToClone.props && !props ? inferno.EMPTY_OBJ : combineFrom(vNodeToClone.props, props), key, ref);
        var newProps = newVNode.props;
        var newChildren = newProps.children;
        // we need to also clone component children that are in props
        // as the children may also have been hoisted
        if (newChildren) {
            if (isArray(newChildren)) {
                var len = newChildren.length;
                if (len > 0) {
                    var tmpArray = [];
                    for (var i = 0; i < len; i++) {
                        var child = newChildren[i];
                        if (isStringOrNumber(child)) {
                            tmpArray.push(child);
                        }
                        else if (!isInvalid(child) && child.flags) {
                            tmpArray.push(inferno.directClone(child));
                        }
                    }
                    newProps.children = tmpArray;
                }
            }
            else if (newChildren.flags) {
                newProps.children = inferno.directClone(newChildren);
            }
        }
        newVNode.children = null;
    }
    else if (flags & 481 /* Element */) {
        if (!props) {
            props = {
                children: vNodeToClone.children
            };
        }
        newVNode = inferno.createVNode(flags, vNodeToClone.type, className, null, 1 /* HasInvalidChildren */, combineFrom(vNodeToClone.props, props), key, ref);
    }
    else if (flags & 16 /* Text */) {
        return inferno.createTextVNode(props ? props.children : vNodeToClone.children);
    }
    return inferno.normalizeProps(newVNode);
}

exports.cloneVNode = cloneVNode;
