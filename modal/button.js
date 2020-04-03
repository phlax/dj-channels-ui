
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {Button} from "reactstrap";

import {Context} from "../context";


export class AddModalButton extends React.Component {
    static contextType = Context;
    static propTypes = exact({
        api: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        columns: PropTypes.array.isRequired});

    state = {items: null};

    onClick = async () => {
        const {columns, title} = this.props;
        const modal = await this.context.modal(
            "channels.ui.add",
            {title, columns},
            true);
        this.closeModal = modal.listen(this.modal);
    };

    modal = async (e, modal) => {
        const {api} = this.props;
        const {result, search} = e;
        if (search) {
            const items = await this.context.call(
                api, {params: {search}}, true);
            modal.update({items});
        } else if (result) {
            this.onResult(result);
            this.closeModal();
        }
    };

    componentWillUnmount () {
        if (this.closeModal) {
            this.closeModal();
        }
    }

    render () {
        const {label} = this.props;
        return (
            <Button
              onClick={this.onClick}>
              {label}
            </Button>);
    }
}
