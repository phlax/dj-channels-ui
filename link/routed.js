
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";
import {Link as RouterLink} from "react-router-dom";

import {Context} from "../context";


export class Link extends React.Component {
    static contextType = Context;
    static propTypes = exact({
        children: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.string]).isRequired,
        className: PropTypes.string,
        onClick: PropTypes.func,
        to: PropTypes.string.isRequired,
    });

    onClick = (e) => {
	const {onClick, to} = this.props;
        e.preventDefault();
        if (onClick) {
            onClick(e);
        }
        this.context.send({route: to});
    };

    render () {
        return <RouterLink {...this.props} onClick={this.onClick} />;
    }
}
