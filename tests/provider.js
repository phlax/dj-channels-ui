
import React from "react";
import {Router, Route, Switch} from "react-router-dom";

import {shallow} from "enzyme";

import ChannelsUI from "@chango/ui";
import Provider from "@chango/ui/provider";


class DummyRoute extends React.PureComponent {

    render () {
        return "DUMMY ROUTE";
    }
}


test("Provider", () => {
    const routes = [
        ["PATH1", DummyRoute, true],
        ["PATH2", DummyRoute, false],
        ["PATH3", DummyRoute, true]];
    const API = jest.fn(() => ({api: "API", history: {data: "HISTORY"}}));
    Provider.__Rewire__("API", API);
    const provider = shallow(
        <ChannelsUI.Provider routes={routes} />);
    expect(API.mock.calls).toEqual(
        [[{modals: ChannelsUI.allModals,
           reducers: undefined}]]);
    expect(provider.instance().api).toEqual({api: "API", history: {data: "HISTORY"}});
    expect(provider.props().value).toBe(provider.instance().api);
    const app = provider.childAt(0);
    expect(app.type()).toBe(ChannelsUI.App);
    const {children, ...appProps} = app.props();
    expect(appProps).toEqual({});
    const router = app.childAt(0);
    expect(router.type()).toBe(Router);
    expect(router.props().history).toEqual({data: "HISTORY"});
    const switchy = router.childAt(0);
    expect(switchy.type()).toBe(Switch);

    routes.forEach(([path, component, exact], index) => {
        const route = switchy.childAt(index);
        expect(route.type()).toBe(Route);
        expect(route.props().exact).toBe(exact);
        expect(route.props().path).toEqual(path);
        const {render} = route.props();
        const rendered = render({match: "MATCH"});
        expect(rendered.type).toBe(component);
        expect(rendered.props).toEqual({match: "MATCH"});
    });
});
