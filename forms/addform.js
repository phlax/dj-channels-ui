
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {Button} from "reactstrap";

import {Context} from "../context";
import {Fieldsets} from "./fieldsets";
import {Fieldset} from "./fieldset";


export class AddForm extends React.Component {
    static contextType = Context;
    static propTypes = exact({
	addLabel: PropTypes.string.isRequired,
	addAPI: PropTypes.string.isRequired,
        onSuccess: PropTypes.func.isRequired,
        fieldsetOptions: PropTypes.object,
        formData: PropTypes.string,
    });

    state = {submitData: {}};

    onChange = (e) => {
        const {submitData} = this.state;
        const {target} = e;
        const {checked, name, type, value} = target;
        let v = type === "checkbox" ? checked : value;
        const update = {};
        update[name] = v;
        this.setState({submitData: {...submitData, ...update}});
    };

    onClick = async () => {
        const {submitData} = this.state;
        const {addAPI, onSuccess} = this.props;
        const {code, errors} = await this.context.call(addAPI, {params: submitData});
        if (!errors) {
            onSuccess(code);
        } else {
            this.setState({errors});
        }
    };

    get fieldsets () {
        const {formData="form"} = this.props;
        const form = this.context.getData(formData) || {fieldsets: {}};
        return Object.entries(form.fieldsets).map(([name, fieldset], index) => {
            return [
                fieldset.label,
                <Fieldset
                  name={name}
                  formData={formData}
                  onChange={this.onChange}
                  key={index} />];
        });
    }

    render () {
        const {addLabel, fieldsetOptions} = this.props;
        return (
            <>
              <Fieldsets
                fieldsetOptions={fieldsetOptions}
                fieldsets={this.fieldsets} />
              <Button onClick={this.onClick}>
                {addLabel}
              </Button>
            </>);
    }
}
