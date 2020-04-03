
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {Button} from "reactstrap";

import Channels from "@chango/core";

import {Context} from "../context";


export class ModalLink extends React.PureComponent {
    static contextType = Context;
    static propTypes = exact({
        children: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
            PropTypes.array]).isRequired,
        color: PropTypes.string,
        className: PropTypes.string,
        modal: PropTypes.string.isRequired
    });

    onClick = (e) => {
        const {modal} = this.props;
        this.context.dispatch(Channels.actions.openModal(modal));
        e.preventDefault();
    };

    render () {
        const {
            children, className, color} = this.props;
        return (
            <Button
              onClick={this.onClick}
              color={color}
              className={className}>
              {children}
            </Button>);
    }
}
