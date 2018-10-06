import { VNode } from 'inferno';
/**
 * Clones given virtual node by creating new instance of it
 * @param {VNode} vNodeToClone virtual node to be cloned
 * @param {Props=} props additional props for new virtual node
 * @param {...*} _children new children for new virtual node
 * @returns {VNode} new virtual node
 */
export declare function cloneVNode(vNodeToClone: VNode, props?: any, ..._children: any[]): VNode;
