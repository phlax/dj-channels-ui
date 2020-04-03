
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";
import {FormattedMessage} from "react-intl";

import {
    Button,
    Col,
    Form,
    FormGroup,
    FormText} from "reactstrap";

import Channels from "@chango/core";
import {Context} from "../context";
import {ModalLink} from "../link";
import {FormErrors, FormGroups, FormSubmit} from "../forms";
import {modalPropTypes} from "./base";


export class LoginModalTitle extends React.PureComponent {
    static propTypes = exact({});

    render () {
        return (
            <FormattedMessage
              id="modal.login.title"
              defaultMessage="Sign in" />
        );
    }
}


export class LoginModalContent extends React.Component {
    static contextType = Context;
    static propTypes = modalPropTypes;

    state = {
        username: null,
        password: null,
        errors: undefined};

    get errorMessages () {
        return {
            "login.fail": (
                <FormattedMessage
                  id="modal.login.fail"
                  defaultMessage="Password or username not recognized" />)
        };
    }

    get fields () {
        return [
            {name: "username",
             type: "text",
             required: true,
             label: (
                 <FormattedMessage
                   id="modal.login.username"
                   defaultMessage="Username" />),
             onChange: this.onChange},
            {name: "password",
             type: "password",
             required: true,
             label: (
                 <FormattedMessage
                   id="modal.login.password"
                   defaultMessage="Password" />),
             onChange: this.onChange},
        ];
    }

    onChange = (e) => {
        const {name, value} = e.target;
        const state = {};
        state[name] = value;
        this.setState(state);
    };

    toggleSubmit = () => {
        const {disableSubmit, enableSubmit} = this.props;
        const {password, username} = this.state;
        if (username && password) {
            enableSubmit();
        } else {
            disableSubmit();
        }
    };

    subscribeLogin = () => {
        this.unsubscribeLogin();
        const api = this.context.consume("channels.auth.login") || {};
        const {errors, user} = api;
        if (api === undefined) {
            this.unsubscribeLogin = this.context.subscribe(
                this.subscribeLogin);
        }
        if (errors !== this.state.errors) {
            this.setState({errors});
        } else {
            delete this.unsubscribeLogin;
            this.context.dispatch(Channels.actions.login(user));
            this.context.send({route: window.location.pathname});
            this.props.toggle();
        }
    };

    componentWillUnmount () {
        if (this.unsubscribeLogin) {
            this.unsubscribeLogin();
        }
    }

    componentDidUpdate (prevProps, prevState) {
        const {password, username} = this.state;
        const {disableSubmit, submit} = this.props;
        const doSubmit = (
            prevProps.submit !== submit
                && submit);
        const toggle = (
            username !== prevState.username
                || password !== prevState.password);
        if (doSubmit) {
            if (!this.unsubscribeLogin) {
                this.unsubscribeLogin = this.context.subscribe(
                    this.subscribeLogin);
            }
            this.context.send({
                api: "channels.auth.login",
                params: {password, username}});
            disableSubmit();
        } else if (toggle) {
            this.toggleSubmit();
        }
    }

    render () {
        const {errors} = this.state;
        const {onSubmit} = this.props;
        const auth = this.context.getState("settings")["channels.core.auth"];
        const {allow_registration: allowRegistration} = auth;
        return (
            <Form onSubmit={onSubmit}>
              <FormErrors
                errors={errors || []}
                messages={this.errorMessages || {}} />
              <FormGroups
                col={3}
                fields={this.fields} />

              <FormGroup className="mb-0" row>
                <Col sm={8}>
                  <FormText className="text-center">
                    <ModalLink modal="xtle.auth.reset" color="link">
                      <FormattedMessage
                        id="modal.login.forgotten_password"
                        defaultMessage="I have forgotten my password" />
                    </ModalLink>
                  </FormText>
                  {allowRegistration &&
                   <FormText className="text-center">
                     <ModalLink modal="register" color="link">
                      <FormattedMessage
                        id="modal.login.register"
                        defaultMessage="Sign up for a new account" />
                     </ModalLink>
                   </FormText>
                  }
                </Col>
                <Col sm={4}>
                  Sign in with github...
                </Col>
                <Button
                  onClick={e => {e.preventDefault(); onSubmit(e);}}
                  type="submit"
                  className="d-none" />
              </FormGroup>
            </Form>);
    }
}


export class LoginModalButtons extends React.PureComponent {
    static propTypes = exact({
        onSubmit: PropTypes.func.isRequired,
        submitEnabled: PropTypes.bool,
    });

    render () {
        console.log("rendering buttons", FormSubmit, this.props);
        return (
            <FormSubmit {...this.props}>
              <FormattedMessage
                id="modal.login.signin"
                defaultMessage="Sign in" />
            </FormSubmit>
        );
    }
}


export const LoginModal = {
    title: LoginModalTitle,
    content: LoginModalContent,
    buttons: LoginModalButtons};
