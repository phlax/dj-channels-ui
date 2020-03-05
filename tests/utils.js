
import React from "react";

import {shallow} from "enzyme";

import ChannelsUI from "@chango/ui";
import Wrapped from "@chango/ui/utils/wrapped";
import Refresh from "@chango/ui/utils/refresh";


class DummyComponent extends React.PureComponent {

    render () {
        return <div>COMPONENT</div>;
    }
}


test("wrapped.getDisplayName", () => {
    const getComponentName = jest.fn(() => "COMPONENT");
    Wrapped.__Rewire__("getComponentName", getComponentName);
    const result = Wrapped.getDisplayName("WRAPPER", "WRAPPED");
    expect(result).toEqual("WRAPPER(COMPONENT)");
    expect(getComponentName.mock.calls).toEqual([["WRAPPED"]]);
});


test("wrapped.getComponentName", () => {
    expect(Wrapped.getComponentName({})).toEqual("WrappedComponent");
    expect(Wrapped.getComponentName(
        {displayName: "DISPLAYNAME", name: "NAME"})).toEqual("DISPLAYNAME");
    expect(Wrapped.getComponentName(
        {name: "NAME"})).toEqual("NAME");
});


test("refresh.withData", () => {
    const getDisplayName = jest.fn(() => "DISPLAYNAME");
    Refresh.__Rewire__("getDisplayName", getDisplayName);

    const Wrapper = Refresh.withData(DummyComponent);

    expect(Wrapper.contextType).toEqual(ChannelsUI.Context);
    expect(Wrapper.displayName).toEqual("DISPLAYNAME");

    const unsubscribe = jest.fn();
    const {getData, setData, subscribe} = Wrapper.prototype;
    Wrapper.prototype.subscribe = jest.fn(() => unsubscribe);
    Wrapper.prototype.setData = jest.fn();
    Wrapper.prototype.getData = jest.fn(() => "STATE");

    const props = {foo: "bar"};
    const el = shallow(
        <Wrapper {...props} />);

    expect(el.text()).toEqual("<DummyComponent />");
    expect(Wrapper.prototype.subscribe.mock.calls).toEqual([[]]);
    expect(Wrapper.prototype.setData.mock.calls).toEqual([[]]);
    expect(Wrapper.prototype.getData.mock.calls).toEqual([[]]);

    expect(unsubscribe.mock.calls).toEqual([]);
    el.instance().componentWillUnmount();
    expect(unsubscribe.mock.calls).toEqual([[]]);

    Wrapper.prototype.setData = setData;
    let getState = jest.fn(() => "STATE");
    let setState = jest.fn();
    el.instance().context = {getState};
    el.instance().setState = setState;
    el.instance().setData();
    expect(getState.mock.calls).toEqual([["data"]]);
    expect(setState.mock.calls).toEqual([[{data: "STATE"}]]);

    Wrapper.prototype.subscribe = subscribe;
    getState = jest.fn(() => "STATE");
    const contextSubscribe = jest.fn(() => "UNSUBSCRIBE");
    setState = jest.fn();
    el.instance().context = {getState, subscribe: contextSubscribe};
    el.instance().setState = setState;
    expect(el.instance().subscribe()).toEqual("UNSUBSCRIBE");
    expect(contextSubscribe.mock.calls).toHaveLength(1);
    const event = contextSubscribe.mock.calls[0][0];
    el.instance().state = {data: "STATE"};
    event();
    expect(getState.mock.calls).toEqual([["data"]]);
    expect(setState.mock.calls).toEqual([]);

    el.instance().state = {data: "OLD STATE"};
    event();
    expect(getState.mock.calls).toEqual([["data"], ["data"]]);
    expect(setState.mock.calls).toEqual([[{data: "STATE"}]]);

    // takes data from this.state
    // context.getState not called again
    Wrapper.prototype.getData = getData;
    el.instance().state = {};
    getState = jest.fn(() => "STATE");
    el.instance().context = {getState};
    let data = el.instance().getData();
    expect(getState.mock.calls).toEqual([["data"]]);
    expect(data).toEqual("STATE");

    // takes data from this.state
    // context.getState not called again
    el.instance().state = {data: "NEW STATE"};
    data = el.instance().getData();
    expect(getState.mock.calls).toEqual([["data"]]);
    expect(data).toEqual("NEW STATE");

    // tries this.getState and context.getState
    // returns default, {}
    el.instance().state = {};
    getState = jest.fn();
    el.instance().context = {getState};
    data = el.instance().getData();
    expect(getState.mock.calls).toEqual([["data"]]);
    expect(data).toEqual({});

    const component = el.find(DummyComponent);
    expect(component.props()).toEqual({foo: "bar", data: "STATE"});
});
