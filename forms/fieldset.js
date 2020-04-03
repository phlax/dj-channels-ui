
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {FormErrors} from "./errors";
import {FormGroups} from "./groups";
import {Context} from "../context";


export class Fieldset extends React.Component {
    static contextType = Context;
    static propTypes = exact({
	fetch: PropTypes.func,
	formData: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
    });

    state = {items: null};

    get fields () {
        const {name, onChange, formData="form", fetch} = this.props;
        const form = this.context.getData(formData);
        const fieldMappings = {
            CharField: "text",
            BooleanField: "checkbox",
            MultipleChoiceField: "checkbox-table"
        };
        return form.fieldsets[name].fields.map(name => {
            const field = form.fields[name];
            return {
                name,
                type: fieldMappings[field.title],
                label: field.label,
                initial: field.initial,
                choices: field.choices,
                fetch,
                onChange};
        });
    }

    render () {
        const {errors} = this.state;
        return (
            <>
              <FormErrors
                errors={errors || []}
                messages={this.errorMessages || {}} />
              <FormGroups
                col={3}
                fields={this.fields} />
            </>
        );
    }
}
