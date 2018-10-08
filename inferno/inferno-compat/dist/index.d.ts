import { Component, ComponentType, createComponentVNode, createPortal, createRenderer, createTextVNode, createVNode, directClone, EMPTY_OBJ, getFlagsForElementVnode, InfernoNode, linkEvent, normalizeProps, options, Props, Refs, __render, VNode, findDOMfromVNode, Fragment, createFragment, createRef, forwardRef, rerender, _L, _CI, _HI, _M, _MCCC, _ME, _MFCC, _MR, _MT, _MP } from 'inferno';
import { hydrate } from 'inferno-hydrate';
import { cloneVNode } from 'inferno-clone-vnode';
import { ClassicComponentClass, ComponentSpec, createClass } from 'inferno-create-class';
import { createElement } from 'inferno-create-element';
import { isValidElement } from './isValidElement';
import PropTypes from './PropTypes';
import { findDOMNode } from 'inferno-extras';
declare global {
    interface Event {
        persist: Function;
    }
}
declare function unmountComponentAtNode(container: Element | SVGAElement | DocumentFragment): boolean;
export declare type IterateChildrenFn = (value: InfernoNode | any, index: number, array: Array<InfernoNode | any>) => any;
declare const Children: {
    map(children: any[], fn: IterateChildrenFn, ctx: any): any[];
    forEach(children: any[], fn: IterateChildrenFn, ctx?: any): void;
    count(children: any[]): number;
    only(children: any[]): any;
    toArray(children: any[]): any[];
};
declare const version = "15.4.2";
declare class PureComponent<P, S> extends Component<P, S> {
    shouldComponentUpdate(props: any, state: any): boolean;
}
declare function unstable_renderSubtreeIntoContainer(parentComponent: any, vNode: any, container: any, callback: any): any;
declare function createFactory(type: any): any;
declare function render(rootInput: any, container: any, cb?: any, context?: any): any;
export { Children, ClassicComponentClass, Component, ComponentSpec, ComponentType, EMPTY_OBJ, Fragment, InfernoNode, Props, PropTypes, PureComponent, Refs, VNode, _CI, _HI, _L, _M, _MCCC, _ME, _MFCC, _MP, _MR, _MT, __render, cloneVNode as cloneElement, cloneVNode, createClass, createComponentVNode, createElement, createFactory, createFragment, createPortal, createRef, createRenderer, createTextVNode, createVNode, directClone, findDOMNode, findDOMfromVNode, forwardRef, getFlagsForElementVnode, hydrate, isValidElement, linkEvent, normalizeProps, options, render, rerender, unmountComponentAtNode, unstable_renderSubtreeIntoContainer, version };
declare const _default: {
    Children: {
        map(children: any[], fn: IterateChildrenFn, ctx: any): any[];
        forEach(children: any[], fn: IterateChildrenFn, ctx?: any): void;
        count(children: any[]): number;
        only(children: any[]): any;
        toArray(children: any[]): any[];
    };
    Component: typeof Component;
    EMPTY_OBJ: {};
    Fragment: string;
    PropTypes: {
        any: () => () => void;
        array: () => void;
        arrayOf: () => () => void;
        bool: () => void;
        checkPropTypes: () => null;
        element: () => () => void;
        func: () => void;
        instanceOf: () => () => void;
        node: () => () => void;
        number: () => void;
        object: () => void;
        objectOf: () => () => void;
        oneOf: () => () => void;
        oneOfType: () => () => void;
        shape: () => () => void;
        string: () => void;
        symbol: () => void;
    };
    PureComponent: typeof PureComponent;
    _CI: typeof _CI;
    _HI: typeof _HI;
    _L: Function[];
    _M: typeof _M;
    _MCCC: typeof _MCCC;
    _ME: typeof _ME;
    _MFCC: typeof _MFCC;
    _MP: typeof _MP;
    _MR: typeof _MR;
    _MT: typeof _MT;
    __render: typeof __render;
    cloneElement: typeof cloneVNode;
    cloneVNode: typeof cloneVNode;
    createClass: typeof createClass;
    createComponentVNode: typeof createComponentVNode;
    createElement: typeof createElement;
    createFactory: typeof createFactory;
    createFragment: typeof createFragment;
    createPortal: typeof createPortal;
    createRef: typeof createRef;
    createRenderer: typeof createRenderer;
    createTextVNode: typeof createTextVNode;
    createVNode: typeof createVNode;
    directClone: typeof directClone;
    findDOMNode: typeof findDOMNode;
    findDOMfromVNode: typeof findDOMfromVNode;
    forwardRef: typeof forwardRef;
    getFlagsForElementVnode: typeof getFlagsForElementVnode;
    hydrate: typeof hydrate;
    isValidElement: typeof isValidElement;
    linkEvent: typeof linkEvent;
    normalizeProps: typeof normalizeProps;
    options: {
        componentComparator: ((lastVNode: VNode, nextVNode: VNode) => boolean) | null;
        createVNode: ((vNode: VNode) => void) | null;
        renderComplete: ((rootInput: string | number | boolean | {} | VNode | InfernoElement<any> | import("../../inferno/src/core/types").InfernoNodeArray | JSX.Element | null, parentDOM: Element | Node | SVGAElement | DocumentFragment | ShadowRoot | HTMLElement) => void) | null;
        reactStyles?: boolean | undefined;
    };
    render: typeof render;
    rerender: typeof rerender;
    unmountComponentAtNode: typeof unmountComponentAtNode;
    unstable_renderSubtreeIntoContainer: typeof unstable_renderSubtreeIntoContainer;
    version: string;
};
export default _default;
