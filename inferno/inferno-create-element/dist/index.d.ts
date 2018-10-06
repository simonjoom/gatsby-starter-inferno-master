import { Component, Props, VNode } from 'inferno';
/**
 * Creates virtual node
 * @param {string|Function|Component<any, any>} type Type of node
 * @param {object=} props Optional props for virtual node
 * @param {...{object}=} _children Optional children for virtual node
 * @returns {VNode} new virtual ndoe
 */
export declare function createElement<T>(type: string | Function | Component<any, any>, props?: (T & Props<T>) | null, _children?: any): VNode;
