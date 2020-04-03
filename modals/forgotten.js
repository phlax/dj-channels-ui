
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {FormattedMessage} from "react-intl";

import {
    Button,
    Form,
    FormGroup,
    Label,
    Input} from "reactstrap";


export class ResetModalTitle extends React.PureComponent {

    render () {
        return (
            <FormattedMessage
              id="modal.reset.title"
              defaultMessage="Password reset" />
        );
    }
}


export class ResetModalContent extends React.Component {
    static propTypes = exact({
	enableSubmit: PropTypes.func,
	onSubmit: PropTypes.func.isRequired,
	submit: PropTypes.bool.isRequired
    });

    state = {reset: null};

    onResetChange = (e) => {
        this.setState({reset: e.target.value});
        this.enableSubmit();
    };

    enableSubmit = () => {
        const {enableSubmit} = this.props;
        const {reset} = this.state;
        if (reset) {
            enableSubmit();
        }
    };

    componentDidUpdate (prevProps) {
	const {submit} = this.props;
        if (prevProps.submit !== submit) {
            console.log("pokemons state has changed.", this.state);
        }
    }

    render () {
        const {onSubmit} = this.props;
        return (
            <Form
            onSubmit={e => {e.preventDefault(); onSubmit(e);}}>
              <FormGroup>
                <Label for="reset">
                  <FormattedMessage
                    id="modal.reset.prompt"
                    defaultMessage="Enter a username or email to reset your password" />
                </Label>
                <Input
                  name="reset"
                  id="reset"
                  onChange={this.onResetChange} />
              </FormGroup>
            </Form>);
    }
}


export class ResetModalButtons extends React.PureComponent {
    static propTypes = exact({
	submitEnabled: PropTypes.bool.isRequired,
	onSubmit: PropTypes.func.isRequired
    });

    render () {
        const {onSubmit, submitEnabled} = this.props;
        return (
            <Button
              color="primary"
              disabled={!submitEnabled}
              onClick={onSubmit}>
              <FormattedMessage
                id="modal.reset.submit"
                defaultMessage="Reset your password" />
            </Button>
        );
    }
}


export const ResetPasswordModal = {
    title: ResetModalTitle,
    content: ResetModalContent,
    buttons: ResetModalButtons};
