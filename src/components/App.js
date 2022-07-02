import React, {useState} from "react"
import XLSX from "xlsx"
import {JsonToTable} from "react-json-to-table"
import '../styles/App.css'

function App() {
    const [columns, setColumns] = useState(null)
    const [res, setRes] = useState('')

    const onChange = async (e) => {
        const file = e.target.files[0]
        if (!file) {
            return
        }
        const inName = ['xls', 'xlsx']
        const goodName = (nam) => {
            return inName.includes(nam.split(".")[1])
        }
        if (!goodName(file.name)) {
            setColumns(null)
            setRes('The excel file could not be found !!!')
            return
        }
        const data = await file.arrayBuffer()
        const workbook = XLSX.readFile(data)
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)
        setColumns(jsonData)
        setRes('')
    }
    return (
        <div className='App'>
            <input type="file" onChange={onChange}/>
            <p style={{color: 'red'}}>{res}</p>
            <JsonToTable
                key={Date.now()}
                json={columns}/>
        </div>
    )
}
export default App