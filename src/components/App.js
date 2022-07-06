import React, {useState} from "react"
import XLSX from "xlsx"
import {JsonToTable} from "react-json-to-table"
import '../styles/App.css'

function App() {
    const [columns, setColumns] = useState(null)
    const [error, setError] = useState(null)
    const onChange = async (e) => {
        setColumns(null)
        setError(null)
        try {
            const file = e.target.files[0]
            const goodName = ['xls', 'xlsx'].includes(file.name.split(".")[1])
            if (!goodName) {
                setError('The excel file could not be found !!!')
                return
            }
            const data = await file.arrayBuffer()
            const workbook = XLSX.readFile(data)
            const worksheet = workbook.Sheets[workbook.SheetNames[0]]
            const jsonData = XLSX.utils.sheet_to_json(worksheet)
            setColumns(jsonData)
        } catch (e) {
            console.log(e.name + ':' + e.message)
            setColumns(null)
            setError(e.message)
        }
    }
    return (
        <div className='App'>
            <input type="file" onChange={onChange}/>
            {columns && <JsonToTable json={columns}/>}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
    )
}

export default App