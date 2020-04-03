
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {Context} from "../context";


export class APILink extends React.PureComponent {
    static contextType = Context;
    static propTypes = exact({
        api: PropTypes.string.isRequired,
        children: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.string]).isRequired,
        params:  PropTypes.object,
        onClick: PropTypes.func,
        onResponse: PropTypes.func
    });

    onClick = async (e) => {
        const {api, onClick, onResponse, params} = this.props;
        const {call} = this.context;
        if (onClick) {
            onClick(e);
        }
        e.preventDefault();
        e.stopPropagation();
        const response = await call(api, {params});
        if (onResponse) {
            onResponse(response);
        }
    };

    render () {
        const {api, children, onResponse, ...props} = this.props;
        return (
            <a onClick={this.onClick} {...props}>
              {children}
            </a>);
    }
}
