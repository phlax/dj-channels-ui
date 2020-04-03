
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {Context} from "../context";
import {AddModalButton} from "../modal";

import {Table} from "reactstrap";


export class SearchAndAddTable extends React.Component {
    static contextType = Context;
    static propTypes = exact({
        api: PropTypes.string.isRequired,
	columns: PropTypes.array.isRequired,
	fetch: PropTypes.func,
	initial: PropTypes.object.isRequired,
	label: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	TableComponent: PropTypes.elementType,
    });

    state = {};

    onResult = (items) => {
        this.setState({items});
    };

    render () {
        const {items} = this.state;
        const {
            api, columns, label, fetch,
            title,
            initial,
            TableComponent=Table} = this.props;
        return (
            <>
              <AddModalButton
                columns={columns}
                api={api}
                onResult={this.onResult}
                title={title}
                label={label} />
              <TableComponent
                fetch={fetch}
                data={items === undefined ? initial.items : items}
                columns={this.context.getColumns(columns)} />
            </>);
    }
}
