
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {Button} from "reactstrap";

import {Context} from "../context";
import {Fieldsets} from "./fieldsets";
import {Fieldset} from "./fieldset";


export class EditForm extends React.Component {
    static contextType = Context;
    static propTypes = exact({
	editLabel: PropTypes.string.isRequired,
	editAPI: PropTypes.string.isRequired,
	searchAPI: PropTypes.string.isRequired,
        onSuccess: PropTypes.func.isRequired,
        fieldsetOptions: PropTypes.object,
        path: PropTypes.string.isRequired,
        formData: PropTypes.string,
        instanceData: PropTypes.string,
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
        const {
            editAPI,
            formData="form",
            instanceData="object",
            onSuccess} = this.props;
        const instance = this.context.getData(instanceData) || {fieldsets: {}};
        const form = this.context.getData(formData) || {fieldsets: {}};
        const params = Object.fromEntries(
            Object.entries(form.fields).map(([name, field]) => {
                return [name, field.initial];
            }));
        const {code, errors} = await this.context.call(
            editAPI,
            {params: {pk: instance.pk, ...params, ...submitData}});
        if (!errors) {
            onSuccess(code);
        } else {
            this.setState({errors});
        }
    };

    fetch = async (pageIndex, pageSize) => {
	const {searchAPI} = this.props;
        console.log("FETCH NEW PAGGE in editform", pageIndex, pageSize);
	await this.context.call(searchAPI, {params: {pageIndex, pageSize}});
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
                  fetch={this.fetch}
                  onChange={this.onChange}
                  key={index} />];
        });
    }

    render () {
        const {editLabel, fieldsetOptions} = this.props;
        return (
            <>
              <Fieldsets
                fieldsetOptions={fieldsetOptions}
                fieldsets={this.fieldsets} />
              <Button onClick={this.onClick}>
                {editLabel}
              </Button>
            </>);
    }
}
