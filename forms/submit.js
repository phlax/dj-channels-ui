
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {Button} from "reactstrap";


export class FormSubmit extends React.PureComponent {
    static propTypes = exact({
        children: PropTypes.oneOfType(
            [PropTypes.array, PropTypes.object]),
	onSubmit: PropTypes.func.isRequired,
	submitEnabled: PropTypes.bool,
    });

    render () {
        const {children, onSubmit, submitEnabled} = this.props;
	return (
            <Button
              color="primary"
              disabled={!submitEnabled}
              onClick={onSubmit}>
              {children}
            </Button>
        );
    }
}
