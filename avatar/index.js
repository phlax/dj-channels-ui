
import React from "react";
import PropTypes from "prop-types";

import {
    createAvatarComponent, Cache,
    ConfigProvider, GravatarSource} from "react-avatar";


const avatarCache = new Cache({
    // Keep cached source failures for up to 7 days
    sourceTTL: 7 * 24 * 3600 * 1000,
    sourceSize: 100
});


export const Avatar = createAvatarComponent({
    sources: [ GravatarSource ]
});


export class AvatarProvider extends React.PureComponent {
    static propTypes = {
        children: PropTypes.object.isRequired
    };
    render () {
        return (
            <ConfigProvider cache={avatarCache}>
              {this.props.children}
            </ConfigProvider>);
    }
}
