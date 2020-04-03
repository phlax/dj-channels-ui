
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";
import {
    defineMessages, injectIntl} from "react-intl";

import {
    Form,
    Input,
    InputGroupAddon,
    InputGroup,
    InputGroupText,
} from "reactstrap";


const translation = defineMessages({
    search: {
        id: "toolbar.search.placeholder",
        defaultMessage: "Search"
    }
});


export class BaseSearch extends React.PureComponent {
    static propTypes = exact({
        intl: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
    });

    render () {
        const {intl, onChange} = this.props;
        return (
            <Form>
              <InputGroup>
                <Input
                  onClick={this.onClick}
                  onChange={onChange}
                  className="form-control-sm"
                  placeholder={intl.formatMessage(translation.search)} />
                <InputGroupAddon
                  addonType="append">
                  <InputGroupText
                    className="form-control-sm p-1">
                    <i className="icon icon-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
	);
    }
}

export const Search = injectIntl(BaseSearch);

export {translation};
