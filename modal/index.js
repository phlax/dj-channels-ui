
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";
import {FormattedMessage} from "react-intl";

import{
    Button,
    Modal as RModal,
    ModalBody,
    ModalFooter,
    ModalHeader} from "reactstrap";

import Channels from "@chango/core";

import {Context} from "../context";


export {AddModalButton} from "./button";


export class Modal extends React.Component {
    static contextType = Context;
    static propTypes = exact({className: PropTypes.string});

    state = {
	open: false,
	data: null,
	submit: false,
	submitEnabled: false};

    toggle = () => {
        this.context.dispatch(Channels.actions.closeModal());
    };

    onSubmit = () => {
        console.log("submitted");
        this.setState({submit: true});
    };

    enableSubmit = () => {
        this.setState({submitEnabled: true, submit: false});
    };

    disableSubmit = () => {
        this.setState({submitEnabled: false, submit: false});
    };

    subscribe = () => {
        const open = this.context.getState("modal");
        if (open !== this.state.open) {
            this.setState({open});
        }
        const data = this.context.getState("modalData");
        if (data !== this.state.data) {
            this.setState({data});
        }

    };

    componentDidMount () {
        const open = this.context.getState("modal");
        const data = this.context.getState("modalData");
        this.setState({data, open});
        this.unsubscribe = this.context.subscribe(this.subscribe);
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render () {
        const {data, open, submit, submitEnabled} = this.state;
        const {className} = this.props;
        const {modals} = this.context;
        let Buttons, Content, Title;
        if (open) {
            Title = modals[open].title;
            Content = modals[open].content;
            Buttons = modals[open].buttons;
        }
        return (
            <RModal isOpen={open ? true : false} toggle={this.toggle} className={className}>
              <ModalHeader toggle={this.toggle} className="py-2 bg-light">
                {Title &&
                 <Title config={data} />
                }
              </ModalHeader>
              <ModalBody>
                {Content &&
                 <Content
                   config={data}
                   toggle={this.toggle}
                   onSubmit={this.onSubmit}
                   disableSubmit={this.disableSubmit}
                   enableSubmit={this.enableSubmit}
                   submit={submit} />
                }
              </ModalBody>
              <ModalFooter className="py-2 bg-white">
                {Buttons &&
                 <Buttons
                   config={data}
                   submitEnabled={submitEnabled}
                   onSubmit={this.onSubmit} />
                }
                <Button color="secondary" onClick={this.toggle}>
                  <FormattedMessage
                    id="modal.button.cancel"
                    defaultMessage="Cancel" />
                </Button>
              </ModalFooter>
            </RModal>
        );
    }
}
