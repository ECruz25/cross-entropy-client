import React, { useState } from 'react';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';

const ExcelLoader = () => {
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [isPredictionReady, setIsPredictionReady] = useState(false);

    const fileHandler = (event) => {
        let fileObj = event.target.files[0];
        ExcelRenderer(fileObj, (err, resp) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(resp)
                setRows(resp.rows.shift());
                setColumns(resp.rows[0].map((col, index) => ({ name: col, key: index })));
            }
        });

    }
    const sendFileToPredict = async () => {
        setIsPredictionReady(true);
        const response = await fetch('')
    }
    return <div>
        <input type="file" onChange={fileHandler} style={{ "padding": "10px" }} />
        <input type="checkbox" label="hasHeaders"></input>
        <OutTable data={rows} columns={columns} tableClassName="ExcelTable2007" tableHeaderRowClass="heading" />
        <button onClick={sendFileToPredict} />Save</button>
    </div >
}

export default ExcelLoader;