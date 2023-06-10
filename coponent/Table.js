import React, { useMemo } from "react";
import { useTable } from "react-table";
import { COLUMNS } from "./column";

const data = [
  { name: "a", value: 12 },
  { name: "b", value: 15 }
]

const BasicTable = ({ pokemonStats }) => {
  const columns = useMemo(() => COLUMNS, []);
  // const pokdata = useMemo(() => pokemonStats || [], [pokemonStats]);

  console.log(pokemonStats);
  console.log(data)
  // const data = pokemonStats.stats;

  // const {} = useTable({columns, pokdata})

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      pokemonStats,
    });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
    // <h1>
    //   hi
    // </h1>
  );
};

export default BasicTable;
