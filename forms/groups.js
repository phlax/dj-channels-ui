
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import CheckboxTable from "@phlax/react-checkbox-table";

import {
    Col,
    FormGroup as BaseFormGroup,
    Label,
    Input} from "reactstrap";

import {SearchAndAddTable} from "../tables";


export class Options extends React.PureComponent {
    static propTypes = exact({
        options: PropTypes.array.isRequired
    });

    render () {
        const {options} = this.props;
        return (
            <>
              {options.map((item, index) => {
                  return (
                      <option key={index}>{item}</option>
                  );
              })}
            </>
        );
    }
}


export class FormGroup extends React.Component {
    static propTypes = exact({
        col: PropTypes.number,
        field: PropTypes.object.isRequired
    });

    state = {};

    onChange = (e) => {
        const {field} = this.props;
        const {onChange} = field;
        this.setState({value: e.target.value});
        onChange(e);
    };

    render () {
        const {value} = this.state;
        const {col, field} = this.props;
        const {
            autocomplete, name, choices,
            label, required, initial,
            options, fetch,
            type} = field;
        const extraProps = {};

        if (type === "checkbox") {
            if ((value === undefined && initial === true) || value === true) {
                extraProps["checked"] = true;
            }
        }
        return (
            <BaseFormGroup row>
              <Label
                for={name}
                sm={col}>
                {label}{required ? "*" : ""}
              </Label>
              <Col sm={12 - col}>
                {(type === "checkbox-table") && (
                    <SearchAndAddTable
                      TableComponent={CheckboxTable}
                      columns={["username"]}
                      api={this.searchAPI}
                      initial={{items: choices.map(c => ({pk: c.value, username: c.display}))}}
                      fetch={fetch}
                      title={name}
                      label={label} />
                )}
                {(type === "select") && (
                    <Input
                      type={type}
                      name={name}
                      id={name}
                      autoComplete={autocomplete}
                      onChange={this.onChange}>
                      <Options options={options} />
                    </Input>
                )}
                {(type !== "select" && type !== "checkbox-table") && (
                    <Input
                      type={type}
                      name={name}
                      id={name}
                      value={value === undefined ? initial || undefined : value}
                      autoComplete={autocomplete}
                      onChange={this.onChange}
                      {...extraProps} />
                )}
              </Col>
            </BaseFormGroup>);
    }
}


export class FormGroups extends React.PureComponent {
    static propTypes = exact({
        col: PropTypes.number,
        fields: PropTypes.array.isRequired
    });

    render () {
        const {col, fields} = this.props;
        return (
            <>
              {fields.map((field, index) => {
                  return (
                      <FormGroup
                        col={col}
                        field={field}
                        key={index} />);
              })}
            </>);
    }
}
