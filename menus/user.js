
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";
import {FormattedMessage} from "react-intl";

import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem} from "reactstrap";

import Channels from "@chango/core";
import {Context} from "../context";
import {APILink, ModalLink} from "../link";


class LoginMenu extends React.PureComponent {
    static propTypes = exact({});

    render () {
        return (
            <ModalLink
              modal="channels.auth.login"
              color="primary"
              className="ml-5">
              <FormattedMessage
                id="navbar.menu.signin"
                defaultMessage="Sign in" />
            </ModalLink>);
    }
}


class UserDropdown extends React.Component {
    static contextType = Context;
    static propTypes = exact({
        children: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired});

    state = {open: false};

    toggle = () => {
        this.setState({open: !this.state.open});
    };

    onLogout = () => {
        this.context.dispatch(Channels.actions.logout());
        this.context.send({route: "/"});
    };

    render () {
        const {children, user} = this.props;
        return (
            <ButtonDropdown
              isOpen={this.state.open}
              toggle={this.toggle}>
              <DropdownToggle caret color="link">
                {user.username}
              </DropdownToggle>
              <DropdownMenu right>
                {children(user)}
                <DropdownItem>
                  <APILink
                    api="channels.auth.logout"
                    onResponse={this.onLogout}>
                    <FormattedMessage
                      id="navbar.menu.signout"
                      defaultMessage="Sign out" />
                  </APILink>
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
        );
    }
}


export class UserMenu extends React.Component {
    static contextType = Context;
    static propTypes = exact({
        children: PropTypes.func.isRequired,
    });

    state = {user: null};

    subscribe = () => {
        const user = this.context.getState("user");
        if (user !== this.state.user) {
            this.setState({user});
        }
    };

    componentDidMount () {
        const user = this.context.useSelector(s => s.user);
        if (user !== this.state.user) {
            this.setState({user});
        }
        this.unsubscribe = this.context.subscribe(this.subscribe);
    }

    componentWillUnmount () {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    render () {
        const {user} = this.state;
        const {children} = this.props;
        if (user && user.username) {
            return (
                <UserDropdown user={user}>
                  {children}
                </UserDropdown>);
        } else {
            return (
                <LoginMenu />);
        }
    }
}
