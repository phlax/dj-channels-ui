
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {Avatar, Link} from "@chango/ui";


export class UserAvatar extends React.PureComponent {
    static propTypes = exact({
        md5: PropTypes.string.isRequired,
	url: PropTypes.string,
        username: PropTypes.string.isRequired,
    });

    render () {
        const {md5, username, url} = this.props;
        return (
            <>
              <Link to={url}>
                <Avatar md5Email={md5} size={20} />{" "}
                {username}
              </Link>
            </>);
    }
}
