import { ChildFlags, VNodeFlags } from 'inferno-vnode-flags';
import { ForwardRef, IComponent, InfernoNode, Props, Ref, Refs, VNode } from './types';
export declare function createVNode<P>(flags: VNodeFlags, type: string, className?: string | null, children?: InfernoNode, childFlags?: ChildFlags, props?: (Props<P> & P) | null, key?: string | number | null, ref?: Ref | Refs<P> | null): VNode;
export declare function createComponentVNode<P>(flags: VNodeFlags, type: Function | IComponent<any, any> | ForwardRef, props?: (Props<P> & P) | null, key?: null | string | number, ref?: Ref | Refs<P> | null): VNode;
export declare function createTextVNode(text?: string | number, key?: string | number | null): VNode;
export declare function createFragment(children: any, childFlags: ChildFlags, key?: string | number | null): VNode;
export declare function normalizeProps(vNode: any): any;
export declare function directClone(vNodeToClone: VNode): VNode;
export declare function createVoidVNode(): VNode;
export declare function createPortal(children: any, container: any): VNode;
export declare function _normalizeVNodes(nodes: any[], result: VNode[], index: number, currentKey: string): void;
export declare function getFlagsForElementVnode(type: string): VNodeFlags;
export declare function normalizeChildren(vNode: VNode, children: any): VNode;
export declare const options: {
    componentComparator: null | Function;
    createVNode: null | Function;
    renderComplete: null | Function;
    reactStyles?: boolean;
};
