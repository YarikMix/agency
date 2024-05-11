import {useTable} from "react-table";
import {Table} from "reactstrap";

function CustomTable({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    })

    return (
        <Table {...getTableProps()} className="table table-hover text-center">
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
                    {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()} key={column.getHeaderProps().key}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()} key={row.getRowProps().key} >
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()} key={cell.getCellProps().key}>
                                {cell.column.id === 'id' ? i + 1 : cell.render('Cell')}
                            </td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </Table>
    )
}

export default CustomTable