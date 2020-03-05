
import React from "react";
import {IntlProvider} from "react-intl";

import {shallow} from "enzyme";

import ChannelsUI from "@chango/ui";
import {quietIntl} from "@chango/ui/app";


class DummyComponent extends React.PureComponent {

    render () {
        return <div>COMPONENT</div>;
    }
}


class TestApp extends ChannelsUI.App {
    history = {listen: jest.fn(() => "UNSUBSCRIBE HISTORY")};
    getLocale = jest.fn(() => "pt-BR");
    subscribe = jest.fn(() => "UNSUBSCRIBE");

    get locale () {
        return this.getLocale();
    }

    set context (k) {
    }

    get context () {
        return {
            subscribe: this.subscribe,
            history: this.history};
    }
}


class TestApp2 extends ChannelsUI.App {
    history = {
        listen: jest.fn(() => "UNSUBSCRIBE HISTORY")};
    send = jest.fn();
    getState = jest.fn(() => "ROUTE");

    set context (k) {
    }

    get context () {
        return {
            subscribe: this.subscribe,
            getState: this.getState,
            history: this.history,
            send: this.send};
    }
}


test("App mount", () => {
    window.Channels = {};
    const mockSetState = jest.fn();
    const setState = ChannelsUI.App.prototype.setState;
    ChannelsUI.App.prototype.setState = mockSetState;
    const app = shallow(
        <TestApp>
          <DummyComponent />
        </TestApp>);
    const subscriber = app.instance().subscribeHistory;
    expect(app.instance().context.subscribe.mock.calls).toEqual(
        [[app.instance().subscribe]]);
    expect(app.instance().context.history.listen.mock.calls).toEqual([[subscriber]]);
    expect(app.instance().unsubscribeHistory).toEqual("UNSUBSCRIBE HISTORY");
    expect(app.text()).toEqual("");
    expect(mockSetState.mock.calls).toEqual([[{translations: {}}]]);
    ChannelsUI.App.prototype.setState = setState;
});


test("App render", () => {
    window.Channels = {translations: {foo: "FOO"}};
    const app = shallow(
        <TestApp>
          <DummyComponent />
        </TestApp>);
    const subscriber = app.instance().subscribeHistory;
    expect(app.instance().context.history.listen.mock.calls).toEqual([[subscriber]]);
    expect(app.instance().unsubscribeHistory).toEqual("UNSUBSCRIBE HISTORY");
    expect(app.text()).toEqual("<Throbber /><AvatarProvider />");
    const avatars = app.find(ChannelsUI.AvatarProvider);
    expect(Object.keys(avatars.props())).toEqual(["children"]);
    const intl = avatars.find(IntlProvider);
    // taken from state
    expect(intl.props().locale).toEqual("pt-BR");
    expect(intl.props().messages).toEqual({foo: "FOO"});
    expect(intl.props().onError).toEqual(quietIntl);
});


test("App locale", () => {
    window.Channels = {};
    const app = shallow(
        <TestApp2>
          <DummyComponent />
        </TestApp2>);

    const getAttribute = jest.fn(() => "LANGUAGE");
    window.document.getElementsByTagName = jest.fn(() => [{getAttribute}]);
    expect(app.instance().locale).toEqual("LANGUAGE");
    expect(getAttribute.mock.calls).toEqual([["lang"]]);
    expect(window.document.getElementsByTagName.mock.calls).toEqual([["html"]]);
});


test("App subscribeHistory", () => {
    window.Channels = {};
    const app = shallow(
        <TestApp2>
          <DummyComponent />
        </TestApp2>);

    app.instance().subscribeHistory({pathname: "ROUTE"});
    expect(app.instance().context.getState.mock.calls).toEqual(
        [["routeRequest"], ["route"]]);
    expect(app.instance().context.send.mock.calls).toEqual([]);

    app.instance().context.getState.mockClear();

    app.instance().subscribeHistory({pathname: "NEW ROUTE"});
    expect(app.instance().context.getState.mock.calls).toEqual(
        [["route"]]);
    expect(app.instance().context.send.mock.calls).toEqual(
        [[{route: "NEW ROUTE"}]]);
});


test("App componentWillUnmount", () => {
    window.Channels = {translations: {foo: "FOO"}};
    const app = shallow(
        <TestApp>
          <DummyComponent />
        </TestApp>);
    app.instance().unsubscribe = jest.fn();
    app.instance().unsubscribeHistory = jest.fn();

    app.instance().componentWillUnmount();

    expect(app.instance().unsubscribe.mock.calls).toEqual([[]]);
    expect(app.instance().unsubscribeHistory.mock.calls).toEqual([[]]);

});
