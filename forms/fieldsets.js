
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {FormGroup} from "reactstrap";


export class Fieldsets extends React.PureComponent {
    static propTypes = exact({
        fieldsets: PropTypes.array.isRequired,
	fieldsetOptions: PropTypes.object,
    });

    render () {
        const {fieldsetOptions, fieldsets} = this.props;
        const {legend: legendOptions, ...options} = fieldsetOptions || {};
        return (
            <>
              {fieldsets.map(([label, content, props], index) => {
                  const {legend={}, ...rest} = props || {};
                  return (
                      <FormGroup tag="fieldset" {...rest} {...options}  key={index}>
                        <legend className="col-form-label" {...legendOptions} {...legend}>{label}</legend>
                        {content}
                      </FormGroup>
                );
              })}
            </>
        );
    }
}
