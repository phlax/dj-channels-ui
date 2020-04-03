
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {FormGroup} from "reactstrap";


export class FormErrors extends React.PureComponent {
    static propTypes = exact({
	errors: PropTypes.array.isRequired,
	messages: PropTypes.object.isRequired,
    });

    render () {
        const {errors, messages} = this.props;
        return (
            <>
              {errors.map((error, key) => {
                  return (
                      <FormGroup
                        key={key}
                        className="text-danger">
                        {messages[error]}
                      </FormGroup>);
              })}
            </>);
    }
}
