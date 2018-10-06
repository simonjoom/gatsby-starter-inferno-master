import { findDOMfromVNode } from 'inferno';

function isDOMinsideVNode(DOM, vNode) {
    const stack = [vNode];
    let _vNode;
    let flags;
    let children;
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
                let i = children.length;
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
        return findDOMfromVNode(ref.$LI);
    }
    if (ref.flags) {
        return findDOMfromVNode(ref);
    }
    return null;
}

export { findDOMNode, isDOMinsideVNode, isDOMinsideComponent };
