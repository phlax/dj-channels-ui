

import React from "react";
import exact from "prop-types-exact";
import {FormattedMessage} from "react-intl";

import {ModalLink} from "../link";


export class ContactMenu extends React.PureComponent {
    static propTypes = exact({});

    render () {
        return (
            <ModalLink modal="channels.auth.contact" color="link">
              <FormattedMessage
                id="navbar.menu.contact"
                defaultMessage="Contact us" />
            </ModalLink>);
    }
}
