
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";


export const BaseIcon = (props) => {
    const {name} = props;
    const className="icon icon-" + name;
    return (
        <i className={className} />);
};


BaseIcon.propTypes = exact({
    name: PropTypes.string.isRequired,
});


let memoize = fn => {
    let cache = {};
    return (...props) => {
        let stringifiedProps = JSON.stringify(props);
        if (Object.keys(cache).indexOf(stringifiedProps) === -1) {
            cache[stringifiedProps] = fn(...props);
        }
        return cache[stringifiedProps];
  };
};


export const Icon = memoize(BaseIcon);
