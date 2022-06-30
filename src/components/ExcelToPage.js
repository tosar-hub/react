import React, {useState} from "react";
import XLSX from "xlsx";
import {JsonToTable} from "react-json-to-table";
import '../styles/ExcelToPage.css'

function ExcelToPage() {
    const [columns, setColumns] = useState([]);
    const onChange = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.readFile(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setColumns(jsonData);

        // console.log(columns);
    }
    return (
        <div className='ExcelToPage'>
            <input type="file" onChange={onChange}/>
            <JsonToTable json={columns}/>
        </div>
    )
}

export default ExcelToPage;