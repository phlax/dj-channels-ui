
import React from "react";
import {Link as RouterLink} from "react-router-dom";

import {Button} from "reactstrap";

import {shallow} from "enzyme";

import Channels from "@chango/core";
import ChannelsUI, {Link, ModalLink} from "@chango/ui";


jest.mock( "@chango/core", () => {
    return {
        actions: {openModal: jest.fn(() => "OPEN MODAL")},
    };
});


test("Link exports", () => {
    expect(ChannelsUI.Link).toBe(Link);
    expect(ChannelsUI.ModalLink).toBe(ModalLink);
});


test("Link render", () => {
    const link = shallow(
        <ChannelsUI.Link to="TO">LINK</ChannelsUI.Link>);
    expect(link.text()).toEqual("LINK");
    const routerLink = link.find(RouterLink);
    expect(routerLink.props()).toEqual(
        {"children": "LINK",
         "onClick": link.instance().onClick,
         "to": "TO"}
    );

});


test("Link render onClick", () => {
    const link = shallow(
        <ChannelsUI.Link
          onClick={() => "CLICK"}
          to="TO">
          LINK
        </ChannelsUI.Link>);
    expect(link.text()).toEqual("LINK");
    const routerLink = link.find(RouterLink);
    expect(routerLink.props()).toEqual(
        {"children": "LINK",
         "onClick": link.instance().onClick,
         "to": "TO"}
    );

});


test("Link render className", () => {
    const link = shallow(
        <ChannelsUI.Link
          className="CLASSNAME"
          to="TO">
          LINK
        </ChannelsUI.Link>);
    expect(link.text()).toEqual("LINK");
    const routerLink = link.find(RouterLink);
    expect(routerLink.props()).toEqual(
        {"children": "LINK",
         "onClick": link.instance().onClick,
         "className": "CLASSNAME",
         "to": "TO"}
    );

});


test("Link onClick", () => {
    const event = {preventDefault: jest.fn()};
    const link = shallow(
        <ChannelsUI.Link
          to="TO">
          LINK
        </ChannelsUI.Link>);
    link.instance().context = {send: jest.fn()};
    link.instance().onClick(event);
    expect(link.instance().context.send.mock.calls).toEqual(
        [[{"route": "TO"}]]);
    expect(event.preventDefault.mock.calls).toEqual([[]]);
});


test("Link onClick prop", () => {
    const event = {preventDefault: jest.fn()};
    const onClick = jest.fn();
    const link = shallow(
        <ChannelsUI.Link
          onClick={onClick}
          to="TO">
          LINK
        </ChannelsUI.Link>);
    link.instance().context = {send: jest.fn()};
    link.instance().onClick(event);
    expect(link.instance().context.send.mock.calls).toEqual(
        [[{"route": "TO"}]]);
    expect(event.preventDefault.mock.calls).toEqual([[]]);
    expect(onClick.mock.calls).toEqual([[event]]);
});


test("ModalLink render", () => {
    const link = shallow(
        <ChannelsUI.ModalLink
          modal="MODAL">
          MODAL LINK
        </ChannelsUI.ModalLink>);
    expect(link.text()).toEqual("<Button />");
    const routerLink = link.find(Button);
    expect(routerLink.props()).toEqual(
        {"children": "MODAL LINK",
         "className": undefined,
         "color": "secondary",
         "onClick": link.instance().onClick,
         "tag": "button"});

});


test("ModalLink onClick", () => {
    const event = {preventDefault: jest.fn()};
    const link = shallow(
        <ChannelsUI.ModalLink
          modal="MODAL">
          MODAL LINK
        </ChannelsUI.ModalLink>);
    link.instance().context = {dispatch: jest.fn()};
    link.instance().onClick(event);
    expect(event.preventDefault.mock.calls).toEqual([[]]);
    expect(link.instance().context.dispatch.mock.calls).toEqual([["OPEN MODAL"]]);
    expect(Channels.actions.openModal.mock.calls).toEqual([["MODAL"]]);
});


test("APILink render", () => {
    const onResponse = jest.fn();
    const link = shallow(
        <ChannelsUI.APILink
          api="API"
          onResponse={onResponse}>
          LINK CONTENT
        </ChannelsUI.APILink>);
    expect(link.text()).toEqual("LINK CONTENT");
    const anchor = link.find("a");
    expect(anchor.props()).toEqual(
        {"children": "LINK CONTENT",
         "onClick": link.instance().onClick});
});
