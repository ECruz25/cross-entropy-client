import React, { useState, useEffect } from 'react';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

const ExcelLoader = () => {
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [data, setData] = useState([]);
    const [isPredictionReady, setIsPredictionReady] = useState(false);

    const fileHandler = (event) => {
        let fileObj = event.target.files[0];
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                const dataColumns = resp.rows[0].map((col, index) => ({ name: col, key: index + 1 }));
                resp.rows.shift()
                const dataRows = resp.rows;
                const data = dataRows.map(row => {
                    const newRow = dataColumns.map(column => ({ [column.name]: row[column.key - 1] }))
                    debugger
                })

                setColumns(dataColumns);
                resp.rows.shift()
                setRows(resp.rows);
            }
        });

    }
    const sendFileToPredict = () => {
        setIsPredictionReady(true);

    }
    return <div>
        <input type="file" onChange={fileHandler} style={{ "padding": "10px" }} />
        <input type="checkbox" label="hasHeaders"></input>
        <OutTable data={rows} columns={columns} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
        <button onClick={sendFileToPredict}>Save</button>
    </div >
}

export default ExcelLoader;