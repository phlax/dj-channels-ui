
import React from "react";
import PropTypes from "prop-types";

import {Context} from "../context";
import {getDisplayName} from "./wrapped";


export function withData(WrappedComponent) {

    class Wrapped extends React.Component {
        static contextType = Context;
        static displayName = getDisplayName("withData", WrappedComponent);
        static propTypes = {
            computedMatch: PropTypes.object,
            location: PropTypes.object};

        state = {data: null};

        componentDidMount () {
            this.unsubscribe = this.subscribe();
            this.setData();
        }

        componentWillUnmount () {
            this.unsubscribe();
        }

        render () {
            const {computedMatch, location, ...props} = this.props;
            return (
                <WrappedComponent
                  {...props}
                  data={this.getData()}
                />);
        }

        getData () {
            const {data} = this.state;
            return data || this.context.getState("data") || {};
        }

        setData () {
            const data = this.context.getState("data");
            this.setState({data});
        }

        subscribe () {
            return this.context.subscribe(() => {
                const data = this.context.getState("data");
                if (data !== this.state.data) {
                    this.setState({data});
                }
            });
        }
    }
    return Wrapped;
}


export default {withData};
