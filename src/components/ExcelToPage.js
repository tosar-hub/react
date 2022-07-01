import React, {useState} from "react";
import XLSX from "xlsx";
import {JsonToTable} from "react-json-to-table";
import '../styles/ExcelToPage.css'

function ExcelToPage() {
    const [columns, setColumns] = useState(null);
    const [file, setFile] = useState('');

    const onChange = async (e) => {
        const file = e.target.files[0];
        const goodName = ['xls', 'xlsx']
        const checkName = fil => {
            return goodName.includes(fil.name.split(".")[1]);
        }
        if (!checkName(file)) {
            alert('invalid file type !!!')
            setColumns(null)
            setFile('')
            return;
        }
        const data = await file.arrayBuffer();
        const workbook = XLSX.readFile(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setColumns(jsonData);
    }
    return (
        <div className='ExcelToPage'>
            <input value={file} type="file" onChange={onChange}/>
            <JsonToTable
                key={Date.now()}
                json={columns}/>
        </div>
    )
}

export default ExcelToPage;