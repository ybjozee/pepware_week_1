import React, { useState } from 'react';
import { Icon, Menu, Table } from 'semantic-ui-react';

const DataTable = (props) => {
    const tableData = props.tableData;
    const unitValue = props.unitValue;
    const durationArray = props.durationArray;

    const [activePage, setActivePage] = useState(0);
    const itemsPerPage = 50;
    const numberOfPages = Math.ceil(tableData.length / itemsPerPage);

    const formatNumber = (inputNumber) => new Intl.NumberFormat('en-NG', { style: 'decimal' }).format(inputNumber)

    const mapDataToTable = () => {
        const startIndex = activePage * itemsPerPage;
        return tableData.slice(startIndex, startIndex + itemsPerPage).map((data, index) => {
            return <Table.Row key={index}>
                {unitValue !== 0 && <Table.Cell>{data}</Table.Cell>}
                <Table.Cell>{formatNumber(unitValue !== 0 ? data * unitValue : data)}</Table.Cell>
                <Table.Cell>{activePage === 0 && index === 0 ? durationArray[0] : activePage === 0 && index === 1 ? durationArray[1] : `${formatNumber(index + (activePage * 100))} ${durationArray[2]} ago`}</Table.Cell>
            </Table.Row>
        });
    }

    const getFooterMenu = () => {
        let subMenu = [];
        for (let i = 0; i < numberOfPages; i++) {
            subMenu.push(<Menu.Item onClick={() => setActivePage(parseInt(i))} key={i}>{i + 1}</Menu.Item>);
        }
        return subMenu;
    }

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    {unitValue !== 0 && <Table.HeaderCell>Number Sold</Table.HeaderCell>}
                    <Table.HeaderCell>{`Total Sales Amount ${unitValue ? `(at $${unitValue} per pc)` : `($)`}`}</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                {mapDataToTable()}
            </Table.Body>

            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan='3'>
                        <Menu floated='right' pagination>
                            <Menu.Item onClick={() => setActivePage(Math.max(activePage, activePage - 1))} icon>
                                <Icon name='chevron left' />
                            </Menu.Item>
                            {getFooterMenu()}
                            <Menu.Item onClick={() => setActivePage(Math.min(numberOfPages - 1, activePage))} icon>
                                <Icon name='chevron right' />
                            </Menu.Item>
                        </Menu>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    );
}

export default DataTable;