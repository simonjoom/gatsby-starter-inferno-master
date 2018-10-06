import { Component } from 'inferno';
export interface Mixin<P, S> extends Component<P, S> {
    statics?: {
        [key: string]: any;
    };
    mixins?: any;
    displayName?: string;
    propTypes?: {
        [index: string]: Function;
    };
    getDefaultProps?(): P;
    getInitialState?(): S;
}
export interface ComponentClass<P, S> extends Mixin<P, S> {
    new (props?: P, context?: any): Component<P, S>;
    propTypes?: {};
    contextTypes?: {};
    childContextTypes?: {};
    defaultProps?: P;
    displayName?: string;
}
export interface ComponentSpec<P, S> extends Mixin<P, S> {
    [propertyName: string]: any;
    render(props: P, context: any): any;
}
export interface ClassicComponent<P, S> extends Component<P, S> {
    replaceState(nextState: S, callback?: () => any): void;
    isMounted(): boolean;
    getInitialState?(): S;
}
export interface ClassicComponentClass<P, S> extends ComponentClass<P, S> {
    new (props?: P, context?: any): ClassicComponent<P, S>;
    getDefaultProps?(): P;
}
export declare function createClass<P, S>(obj: ComponentSpec<P, S>): ClassicComponentClass<P, S>;
