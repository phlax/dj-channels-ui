
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";
import {IntlProvider} from "react-intl";

import ChannelsUI from "@chango/ui";
import {Context} from "../context";


export const quietIntl = () => {
};


export class App extends React.Component {
    static contextType = Context;
    static propTypes = exact({
        children: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.array,
            PropTypes.string
        ]).isRequired,
    });

    state = {translations: null, requesting: null};

    subscribeHistory = (location) => {
        if (location.pathname !== this.context.getState("route")) {
            this.context.send({route: location.pathname});
        }
    };

    subscribe = () => {
        const {getState} = this.context;
        const {requesting} = this.state;
        const contextRequesting = getState("routeRequest");
        if (contextRequesting !== requesting) {
            this.setState({requesting: contextRequesting});
        }
    };

    componentDidMount () {
        const {Channels: ChannelsData} = window;
        const {translations} = ChannelsData;
        const {history, subscribe} = this.context;
        this.unsubscribe = subscribe(this.subscribe);
        this.unsubscribeHistory = history.listen(this.subscribeHistory);
        this.setState({translations: translations || {}});
    }

    componentWillUnmount () {
        this.unsubscribe();
        this.unsubscribeHistory();
    }

    get locale () {
        return document.getElementsByTagName("html")[0].getAttribute("lang");
    }

    render () {
        const {children} = this.props;
        const {requesting, translations} = this.state;
        if (!translations) {
            return "";
        }
        return (
            <>
              <ChannelsUI.Throbber
                isAnimating={requesting ? true : false} />
              <ChannelsUI.AvatarProvider>
                <IntlProvider
                  onError={quietIntl}
                  locale={this.locale}
                  messages={translations}>
                  {children}
                </IntlProvider>
              </ChannelsUI.AvatarProvider>
            </>
        );
    }
}
