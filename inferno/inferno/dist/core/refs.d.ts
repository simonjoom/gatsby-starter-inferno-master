export declare function createRef(): {
    current: null;
};
export declare function forwardRef(render: any): {
    render: any;
} | undefined;
export declare function pushRef(dom: Element | null, value: Function): void;
export declare function unmountRef(ref: any): void;
export declare function mountRef(ref: any, value: any): void;
