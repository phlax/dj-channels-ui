
import React from "react";
import PropTypes from "prop-types";
import {Router, Route, Switch} from "react-router-dom";

import {API} from "@chango/core";
import {Context} from "../context";
import {App} from "../app";
import {allModals} from "../modals";


export class Provider extends React.Component {
    static propTypes = {
        routes: PropTypes.array.isRequired,
        reducers: PropTypes.object,
        modals: PropTypes.object,
        columns: PropTypes.object,
    };

    constructor (props) {
        super(props);
        const {columns, reducers, modals} = this.props;
        this.api = new API({
            reducers,
            columns,
            modals: modals || allModals});
    }

    render () {
        const {routes} = this.props;
        return (
            <Context.Provider value={this.api}>
              <App>
                <Router
                  history={this.api.history}>
                  <Switch>
                    {routes.map(([path, Component, exact], index) => {
                        return (
                            <Route
                              key={index}
                              exact={exact}
                              path={path}
                              render={(props) => <Component match={props.match} />} />);
                    })}
                  </Switch>
                </Router>
              </App>
            </Context.Provider>);
    }
}

export default {Provider};
