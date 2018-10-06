/**
 * @module Inferno-Compat
 */
/**
 * Inlined PropTypes, there is propType checking ATM.
 */
declare function proptype(): void;
declare const PropTypes: {
    any: () => typeof proptype;
    array: typeof proptype;
    arrayOf: () => typeof proptype;
    bool: typeof proptype;
    checkPropTypes: () => null;
    element: () => typeof proptype;
    func: typeof proptype;
    instanceOf: () => typeof proptype;
    node: () => typeof proptype;
    number: typeof proptype;
    object: typeof proptype;
    objectOf: () => typeof proptype;
    oneOf: () => typeof proptype;
    oneOfType: () => typeof proptype;
    shape: () => typeof proptype;
    string: typeof proptype;
    symbol: typeof proptype;
};
export default PropTypes;
