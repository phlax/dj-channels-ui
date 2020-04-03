
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";


export class AddModalTitle extends React.PureComponent {
    static propTypes = exact({
        config: PropTypes.object.isRequired,
    });

    render () {
        const {config} = this.props;
        return config.title || "TITLE";
    }
}
