import { createComponentVNode, createVNode, getFlagsForElementVnode, createFragment } from 'inferno';

var isBrowser = !!(typeof window !== 'undefined' && window.document);
function isNullOrUndef(o) {
    return isUndefined(o) || isNull(o);
}
function isString(o) {
    return typeof o === 'string';
}
function isNull(o) {
    return o === null;
}
function isUndefined(o) {
    return o === void 0;
}

const componentHooks = {
    onComponentDidMount: 1,
    onComponentDidUpdate: 1,
    onComponentShouldUpdate: 1,
    onComponentWillMount: 1,
    onComponentWillUnmount: 1,
    onComponentWillUpdate: 1
};
/**
 * Creates virtual node
 * @param {string|Function|Component<any, any>} type Type of node
 * @param {object=} props Optional props for virtual node
 * @param {...{object}=} _children Optional children for virtual node
 * @returns {VNode} new virtual ndoe
 */
function createElement(type, props, _children) {
    let children;
    let ref = null;
    let key = null;
    let className = null;
    let flags = 0;
    let newProps;
    let childLen = arguments.length - 2;
    if (childLen === 1) {
        children = _children;
    }
    else if (childLen > 1) {
        children = [];
        while (childLen-- > 0) {
            children[childLen] = arguments[childLen + 2];
        }
    }
    if (isString(type)) {
        flags = getFlagsForElementVnode(type);
        if (!isNullOrUndef(props)) {
            newProps = {};
            for (const prop in props) {
                if (prop === 'className' || prop === 'class') {
                    className = props[prop];
                }
                else if (prop === 'key') {
                    key = props.key;
                }
                else if (prop === 'children' && isUndefined(children)) {
                    children = props.children; // always favour children args over props
                }
                else if (prop === 'ref') {
                    ref = props.ref;
                }
                else {
                    if (prop === 'contenteditable') {
                        flags |= 4096 /* ContentEditable */;
                    }
                    newProps[prop] = props[prop];
                }
            }
        }
    }
    else {
        flags = 2 /* ComponentUnknown */;
        if (!isUndefined(children)) {
            if (!props) {
                props = {};
            }
            props.children = children;
            children = null;
        }
        if (!isNullOrUndef(props)) {
            newProps = {};
            for (const prop in props) {
                if (componentHooks[prop] === 1) {
                    if (!ref) {
                        ref = {};
                    }
                    ref[prop] = props[prop];
                }
                else if (prop === 'key') {
                    key = props.key;
                }
                else if (prop === 'ref') {
                    ref = props.ref;
                }
                else {
                    newProps[prop] = props[prop];
                }
            }
        }
        return createComponentVNode(flags, type, newProps, key, ref);
    }
    if (flags & 8192 /* Fragment */) {
        return createFragment(children, 0 /* UnknownChildren */, key);
    }
    return createVNode(flags, type, className, children, 0 /* UnknownChildren */, newProps, key, ref);
}

export { createElement };
