
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {modalPropTypes} from "./base";


export class ConfirmModalTitle extends React.PureComponent {
    static propTypes = exact({
        config: PropTypes.object.isRequired,
    });

    render () {
        return "CONFIRM MODAL";
    }
}


export class ConfirmModalContent extends React.PureComponent {
    static propTypes = modalPropTypes;

    render () {
        return "CONFIRM MODAL CONTENT";
    }
}


export const ConfirmModal = {
    title: ConfirmModalTitle,
    content: ConfirmModalContent};
