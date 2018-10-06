import { Component } from 'inferno';

var ERROR_MSG = 'a runtime error occured! Use Inferno in development environment to find the error.';
var isBrowser = !!(typeof window !== 'undefined' && window.document);
function isFunction(o) {
    return typeof o === 'function';
}
function isObject(o) {
    return typeof o === 'object';
}
function throwError(message) {
    if (!message) {
        message = ERROR_MSG;
    }
    throw new Error(("Inferno Error: " + message));
}

// don't autobind these methods since they already have guaranteed context.
const AUTOBIND_BLACKLIST = {
    componentDidMount: 1,
    componentDidUnmount: 1,
    componentDidUpdate: 1,
    componentWillMount: 1,
    componentWillUnmount: 1,
    componentWillUpdate: 1,
    constructor: 1,
    render: 1,
    shouldComponentUpdate: 1
};
function extend(base, props) {
    for (const key in props) {
        base[key] = props[key];
    }
    return base;
}
function bindAll(ctx) {
    for (const i in ctx) {
        const v = ctx[i];
        if (typeof v === 'function' && !v.__bound && !AUTOBIND_BLACKLIST[i]) {
            (ctx[i] = v.bind(ctx)).__bound = true;
        }
    }
}
function collateMixins(mixins, keyed = {}) {
    for (let i = 0, len = mixins.length; i < len; i++) {
        const mixin = mixins[i];
        // Surprise: Mixins can have mixins
        if (mixin.mixins) {
            // Recursively collate sub-mixins
            collateMixins(mixin.mixins, keyed);
        }
        for (const key in mixin) {
            if (mixin.hasOwnProperty(key) && typeof mixin[key] === 'function') {
                (keyed[key] || (keyed[key] = [])).push(mixin[key]);
            }
        }
    }
    return keyed;
}
function multihook(hooks, mergeFn) {
    return function () {
        let ret;
        for (let i = 0, len = hooks.length; i < len; i++) {
            const hook = hooks[i];
            const r = hook.apply(this, arguments);
            if (mergeFn) {
                ret = mergeFn(ret, r);
            }
            else if (r) {
                ret = r;
            }
        }
        return ret;
    };
}
function mergeNoDupes(previous, current) {
    if (current) {
        if (!isObject(current)) {
            throwError('Expected Mixin to return value to be an object or null.');
        }
        if (!previous) {
            previous = {};
        }
        for (const key in current) {
            if (current.hasOwnProperty(key)) {
                if (previous.hasOwnProperty(key)) {
                    throwError(`Mixins return duplicate key ${key} in their return values`);
                }
                previous[key] = current[key];
            }
        }
    }
    return previous;
}
function applyMixin(key, inst, mixin) {
    const hooks = inst[key] !== void 0 ? mixin.concat(inst[key]) : mixin;
    if (key === 'getDefaultProps' || key === 'getInitialState' || key === 'getChildContext') {
        inst[key] = multihook(hooks, mergeNoDupes);
    }
    else {
        inst[key] = multihook(hooks);
    }
}
function applyMixins(Cl, mixins) {
    for (const key in mixins) {
        if (mixins.hasOwnProperty(key)) {
            const mixin = mixins[key];
            let inst;
            if (key === 'getDefaultProps') {
                inst = Cl;
            }
            else {
                inst = Cl.prototype;
            }
            if (isFunction(mixin[0])) {
                applyMixin(key, inst, mixin);
            }
            else {
                inst[key] = mixin;
            }
        }
    }
}
function createClass(obj) {
    class Cl extends Component {
        constructor(props, context) {
            super(props, context);
            bindAll(this);
            if (this.getInitialState) {
                this.state = this.getInitialState();
            }
        }
        replaceState(nextState, callback) {
            this.setState(nextState, callback);
        }
        isMounted() {
            return this.$LI !== null && !this.$UN;
        }
    }
    Cl.displayName = obj.name || obj.displayName || 'Component';
    Cl.propTypes = obj.propTypes;
    Cl.mixins = obj.mixins && collateMixins(obj.mixins);
    Cl.getDefaultProps = obj.getDefaultProps;
    extend(Cl.prototype, obj);
    if (obj.statics) {
        extend(Cl, obj.statics);
    }
    if (obj.mixins) {
        applyMixins(Cl, collateMixins(obj.mixins));
    }
    if (Cl.getDefaultProps) {
        Cl.defaultProps = Cl.getDefaultProps();
    }
    return Cl;
}

export { createClass };
