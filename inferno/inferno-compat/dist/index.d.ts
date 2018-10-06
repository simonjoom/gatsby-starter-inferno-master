import { Component, createComponentVNode, createPortal, createRenderer, createTextVNode, createVNode, directClone, EMPTY_OBJ, getFlagsForElementVnode, InfernoNode, linkEvent, normalizeProps, options, Props, Refs, VNode, findDOMfromVNode } from 'inferno';
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
export { Children, ClassicComponentClass, Component, ComponentSpec, EMPTY_OBJ, InfernoNode, Props, PropTypes, PureComponent, Refs, VNode, cloneVNode as cloneElement, cloneVNode, createClass, createComponentVNode, createElement, createFactory, createPortal, createRenderer, createTextVNode, createVNode, directClone, findDOMNode, getFlagsForElementVnode, hydrate, isValidElement, linkEvent, normalizeProps, options, render, unmountComponentAtNode, unstable_renderSubtreeIntoContainer, version };
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
    cloneElement: typeof cloneVNode;
    cloneVNode: typeof cloneVNode;
    createClass: typeof createClass;
    createComponentVNode: typeof createComponentVNode;
    createElement: typeof createElement;
    createFactory: typeof createFactory;
    createPortal: typeof createPortal;
    createRenderer: typeof createRenderer;
    createTextVNode: typeof createTextVNode;
    createVNode: typeof createVNode;
    directClone: typeof directClone;
    findDOMNode: typeof findDOMNode;
    findDOMfromVNode: typeof findDOMfromVNode;
    getFlagsForElementVnode: typeof getFlagsForElementVnode;
    hydrate: typeof hydrate;
    isValidElement: typeof isValidElement;
    linkEvent: typeof linkEvent;
    normalizeProps: typeof normalizeProps;
    options: {
        componentComparator: Function | null;
        createVNode: Function | null;
        renderComplete: Function | null;
        reactStyles?: boolean | undefined;
    };
    render: typeof render;
    unmountComponentAtNode: typeof unmountComponentAtNode;
    unstable_renderSubtreeIntoContainer: typeof unstable_renderSubtreeIntoContainer;
    version: string;
};
export default _default;
