
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";
import {FormattedMessage} from "react-intl";
import {Form} from "reactstrap";

import {FormErrors, FormGroups, FormSubmit} from "../forms";
import {modalPropTypes} from "./base";


export class ContactModalTitle extends React.PureComponent {
    static propTypes = exact({
        config: PropTypes.object.isRequired,
    });

    render () {
        return (
            <FormattedMessage
              id="modal.contact.title"
              defaultMessage="Contact us" />
        );
    }
}


export class ContactModalContent extends React.Component {
    static propTypes = modalPropTypes;

    state = {
        name: null,
        email: null,
        subject: null,
        message: null,
        errors: null};

    onChange = (e) => {
        const {name, value} = e.target;
        const state = {};
        state[name] = value;
        this.setState(state);
    };

    toggleSubmit = () => {
        const {disableSubmit, enableSubmit} = this.props;
        const {email, subject, message} = this.state;
        (email && subject && message
         ? enableSubmit
         : disableSubmit)();
    };

    componentDidUpdate (prevProps, prevState) {
        const {email, subject, message} = this.state;
        const toggle = (
            email !== prevState.email
                || subject !== prevState.subject
                || message !== prevState.message);
        if (toggle) {
            this.toggleSubmit();
        }

    }

    get fields () {
        return [
            {name: "name",
             type: "text",
             label: (
                 <FormattedMessage
                   id="modal.contact.name"
                   defaultMessage="Name" />),
             onChange: this.onChange},
            {name: "email",
             type: "email",
             required: true,
             label: (
                 <FormattedMessage
                   id="modal.contact.email"
                   defaultMessage="Email" />),
             onChange: this.onChange},
            {name: "subject",
             type: "text",
             required: true,
             label: (
                 <FormattedMessage
                   id="modal.contact.subject"
                   defaultMessage="Subject" />),
             onChange: this.onChange},
            {name: "message",
             type: "textarea",
             required: true,
             label: (
                 <FormattedMessage
                   id="modal.contact.message"
                   defaultMessage="Message" />),
             onChange: this.onChange},
        ];
    }

    render () {
        const {errors} = this.state;
        const {onSubmit} = this.props;
        return (
            <Form onSubmit={onSubmit}>
              <FormErrors
                errors={errors || []}
                messages={this.errorMessages || {}} />
              <FormGroups
                col={3}
                fields={this.fields} />
            </Form>
        );
    }
}


export class ContactModalButtons extends React.PureComponent {
    static propTypes = exact({
        onSubmit: PropTypes.func.isRequired,
        submitEnabled: PropTypes.bool,
    });

    render () {
        return (
            <FormSubmit {...this.props}>
              <FormattedMessage
                id="modal.contact.send"
                defaultMessage="Send message" />
            </FormSubmit>
        );
    }
}


export const ContactModal = {
    title: ContactModalTitle,
    content: ContactModalContent,
    buttons: ContactModalButtons};
