
import React from "react";

import {Button, Table} from "reactstrap";

import Channels from "@chango/core";
import {Context} from "../../context";

import {modalPropTypes} from "../base";

import {Search} from "../../search";


export class AddModalContent extends React.PureComponent {
    static contextType = Context;
    static propTypes = modalPropTypes;

    onClick = () => {
        this.context.dispatch(
            Channels.actions.setModalResponse(
                {response: "DID SOMETHING"}));
    };

    onSearch = (e) => {
        this.context.dispatch(
            Channels.actions.setModalResponse(
                {search: e.target.value}));
    };

    render () {
        const {config, TableComponent=Table} = this.props;
        const {columns} = config;
        const {items} = config;
        return (
            <>
              <Search onChange={this.onSearch} />
              {config.message}
              <TableComponent
                data={(items || [])}
                columns={this.context.getColumns(columns)} />
              <Button onClick={this.onClick} />
            </>);
    }
}
