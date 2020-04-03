
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";
import {FormattedMessage} from "react-intl";

import {
    Col,
    Form,
    FormGroup,
    FormText} from "reactstrap";

import {ModalLink} from "../link";
import {FormErrors, FormGroups, FormSubmit} from "../forms";


export class RegisterModalTitle extends React.PureComponent {
    static propTypes = exact({});

    render () {
        return (
            <FormattedMessage
              id="modal.register.title"
              defaultMessage="Create an account" />
        );
    }
}


export class RegisterModalContent extends React.Component {
    static propTypes = exact({
        enableSubmit: PropTypes.func.isRequired,
        disableSubmit: PropTypes.func.isRequired,
        toggle: PropTypes.func.isRequired,
        onSubmit: PropTypes.func.isRequired,
        submit: PropTypes.bool,
    });

    state = {
        email: null,
        username: null,
        password: null,
        password2: null};

    get fields () {
        return [
            {name: "email",
             type: "email",
             required: true,
             label: (
                 <FormattedMessage
                   id="modal.register.email"
                   defaultMessage="Email" />),
             onChange: this.onChange},
            {name: "username",
             type: "text",
             required: true,
             label: (
                 <FormattedMessage
                   id="modal.register.username"
                   defaultMessage="Username" />),
             onChange: this.onChange},
            {name: "password",
             type: "password",
             autocomplete: "new-password",
             required: true,
             label: (
                 <FormattedMessage
                   id="modal.register.password"
                   defaultMessage="Password" />),
             onChange: this.onChange},
            {name: "password2",
             type: "password",
             autocomplete: "new-password",
             required: true,
             label: (
                 <FormattedMessage
                   id="modal.register.password_repeat"
                   defaultMessage="Repeat password" />),
             onChange: this.onChange},

        ];
    }

    onSubmit = (e) => {
        console.log("submitting", e);
        e.preventDefault();
        const {username, password} = this.state;
        const redirect = new URLSearchParams(document.location.search).get("redirect");
        console.log(this);
        this.context.send(JSON.stringify({
            "register": {username, password},
            "redirect": redirect,
        }));
    };

    onChange = (e) => {
        const {name, value} = e.target;
        const state = {};
        state[name] = value;
        this.setState(state);
    };

    enableSubmit = () => {
        const {disableSubmit, enableSubmit} = this.props;
        const {email, password, password2, username} = this.state;
        const enable = (
            email
                && username
                && password
                && password2
                && password === password2);
        if (enable) {
            enableSubmit();
        } else {
            disableSubmit();
        }
    };

    componentDidUpdate (prevProps) {
        if (prevProps.submit !== this.props.submit) {
            console.log("pokemons state has changed.", this.state);
        }
    }

    render () {
        const {errors} = this.state;
        return (
            <Form className="register">
              <FormErrors
                errors={errors || []}
                messages={this.errorMessages || {}} />
              <FormGroups
                col={4}
                fields={this.fields} />

              <FormGroup className="mb-0" row>
                <Col sm={8}>
                  <FormText className="text-center">
                    <ModalLink modal="login" color="link">
                      <FormattedMessage
                        id="modal.register.signin"
                        defaultMessage="Sign in as an existing user" />
                    </ModalLink>
                  </FormText>
                </Col>
                <Col sm={4}>
                  Sign in with github...
                </Col>
              </FormGroup>
            </Form>);
    }
}


export class RegisterModalButtons extends React.PureComponent {
    static propTypes = exact({
        onSubmit: PropTypes.func.isRequired,
        submitEnabled: PropTypes.bool,
    });

    render () {
        return (
            <FormSubmit {...this.props}>
              <FormattedMessage
                id="modal.register.submit"
                defaultMessage="Sign up" />
            </FormSubmit>
        );
    }
}


export const RegisterModal = {
    title: RegisterModalTitle,
    content: RegisterModalContent,
    buttons: RegisterModalButtons};
