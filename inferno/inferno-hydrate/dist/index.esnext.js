import { _CI, _HI, _L, _MT, _M, _MCCC, _ME, _MFCC, _MR, _MP } from 'inferno';

var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
var isBrowser = !!(typeof window !== 'undefined' && window.document);
function isNullOrUndef(o) {
    return isUndefined(o) || isNull(o);
}
function isInvalid(o) {
    return isNull(o) || o === false || isTrue(o) || isUndefined(o);
}
function isFunction(o) {
    return typeof o === 'function';
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
function throwError(message) {
    if (!message) {
        message = ERROR_MSG;
    }
    throw new Error(("Inferno Error: " + message));
}

function isSameInnerHTML(dom, innerHTML) {
    const tempdom = document.createElement('i');
    tempdom.innerHTML = innerHTML;
    return tempdom.innerHTML === dom.innerHTML;
}
function isSamePropsInnerHTML(dom, props) {
    return Boolean(props && props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html && isSameInnerHTML(dom, props.dangerouslySetInnerHTML.__html));
}
function hydrateComponent(vNode, parentDOM, dom, context, isSVG, isClass) {
    const type = vNode.type;
    const ref = vNode.ref;
    const props = vNode.props || {};
    let currentNode;
    if (isClass) {
        const instance = _CI(vNode, type, props, context);
        const input = instance.$LI;
        currentNode = hydrateVNode(input, parentDOM, dom, instance.$CX, isSVG);
        _MCCC(ref, instance);
        instance.$UPD = false; // Mount finished allow going sync
    }
    else {
        const input = _HI(type(props, context));
        currentNode = hydrateVNode(input, parentDOM, dom, context, isSVG);
        vNode.children = input;
        _MFCC(props, ref, vNode);
    }
    return currentNode;
}
function hydrateChildren(parentVNode, parentNode, currentNode, context, isSVG) {
    const childFlags = parentVNode.childFlags;
    const children = parentVNode.children;
    const props = parentVNode.props;
    const flags = parentVNode.flags;
    if (childFlags !== 1 /* HasInvalidChildren */) {
        let nextNode;
        if (childFlags === 2 /* HasVNodeChildren */) {
            if (isNull(currentNode)) {
                _M(children, parentNode, context, isSVG, null);
            }
            else {
                nextNode = currentNode.nextSibling;
                currentNode = hydrateVNode(children, parentNode, currentNode, context, isSVG);
                currentNode = currentNode ? currentNode.nextSibling : nextNode;
            }
        }
        else if (childFlags === 16 /* HasTextChildren */) {
            if (isNull(currentNode)) {
                parentNode.appendChild(document.createTextNode(children));
            }
            else if (parentNode.childNodes.length !== 1 || currentNode.nodeType !== 3) {
                parentNode.textContent = children;
            }
            else {
                if (currentNode.nodeValue !== children) {
                    currentNode.nodeValue = children;
                }
            }
            currentNode = null;
        }
        else if (childFlags & 12 /* MultipleChildren */) {
            let prevVNodeIsTextNode = false;
            for (let i = 0, len = children.length; i < len; i++) {
                const child = children[i];
                if (isNull(currentNode) || (prevVNodeIsTextNode && (child.flags & 16 /* Text */) > 0)) {
                    _M(child, parentNode, context, isSVG, currentNode);
                }
                else {
                    nextNode = currentNode.nextSibling;
                    currentNode = hydrateVNode(child, parentNode, currentNode, context, isSVG);
                    currentNode = currentNode ? currentNode.nextSibling : nextNode;
                }
                prevVNodeIsTextNode = (child.flags & 16 /* Text */) > 0;
            }
        }
        // clear any other DOM nodes, there should be only a single entry for the root
        if ((flags & 8192 /* Fragment */) === 0) {
            let nextSibling = null;
            while (currentNode) {
                nextSibling = currentNode.nextSibling;
                parentNode.removeChild(currentNode);
                currentNode = nextSibling;
            }
        }
    }
    else if (!isNull(parentNode.firstChild) && !isSamePropsInnerHTML(parentNode, props)) {
        parentNode.textContent = ''; // dom has content, but VNode has no children remove everything from DOM
        if (flags & 448 /* FormElement */) {
            // If element is form element, we need to clear defaultValue also
            parentNode.defaultValue = '';
        }
    }
}
function hydrateElement(vNode, parentDOM, dom, context, isSVG) {
    const props = vNode.props;
    const className = vNode.className;
    const flags = vNode.flags;
    const ref = vNode.ref;
    isSVG = isSVG || (flags & 32 /* SvgElement */) > 0;
    if (dom.nodeType !== 1 || dom.tagName.toLowerCase() !== vNode.type) {
        _ME(vNode, null, context, isSVG, null);
        parentDOM.replaceChild(vNode.dom, dom);
    }
    else {
        vNode.dom = dom;
        hydrateChildren(vNode, dom, dom.firstChild, context, isSVG);
        if (!isNull(props)) {
            _MP(vNode, flags, props, dom, isSVG);
        }
        if (isNullOrUndef(className)) {
            if (dom.className !== '') {
                dom.removeAttribute('class');
            }
        }
        else if (isSVG) {
            dom.setAttribute('class', className);
        }
        else {
            dom.className = className;
        }
        _MR(ref, dom);
    }
    return vNode.dom;
}
function hydrateText(vNode, parentDOM, dom) {
    if (dom.nodeType !== 3) {
        _MT(vNode, null, null);
        parentDOM.replaceChild(vNode.dom, dom);
    }
    else {
        const text = vNode.children;
        if (dom.nodeValue !== text) {
            dom.nodeValue = text;
        }
        vNode.dom = dom;
    }
    return vNode.dom;
}
function hydrateFragment(vNode, parentDOM, dom, context, isSVG) {
    const children = vNode.children;
    if (vNode.childFlags === 2 /* HasVNodeChildren */) {
        hydrateText(children, parentDOM, dom);
        return (vNode.dom = children.dom);
    }
    hydrateChildren(vNode, parentDOM, dom, context, isSVG);
    return (vNode.dom = children[children.length - 1].dom);
}
function hydrateVNode(vNode, parentDOM, currentDom, context, isSVG) {
    const flags = (vNode.flags |= 16384 /* InUse */);
    if (flags & 14 /* Component */) {
        return hydrateComponent(vNode, parentDOM, currentDom, context, isSVG, (flags & 4 /* ComponentClass */) > 0);
    }
    if (flags & 481 /* Element */) {
        return hydrateElement(vNode, parentDOM, currentDom, context, isSVG);
    }
    if (flags & 16 /* Text */) {
        return hydrateText(vNode, parentDOM, currentDom);
    }
    if (flags & 512 /* Void */) {
        return (vNode.dom = currentDom);
    }
    if (flags & 8192 /* Fragment */) {
        return hydrateFragment(vNode, parentDOM, currentDom, context, isSVG);
    }
    throwError();
    return null;
}
function hydrate(input, parentDOM, callback) {
    let dom = parentDOM.firstChild;
    if (!isNull(dom)) {
        if (!isInvalid(input)) {
            dom = hydrateVNode(input, parentDOM, dom, {}, false);
        }
        // clear any other DOM nodes, there should be only a single entry for the root
        while (dom && (dom = dom.nextSibling)) {
            parentDOM.removeChild(dom);
        }
    }
    if (_L.length > 0) {
        let listener;
        while ((listener = _L.shift()) !== undefined) {
            listener();
        }
    }
    parentDOM.$V = input;
    if (isFunction(callback)) {
        callback();
    }
}

export { hydrate };
