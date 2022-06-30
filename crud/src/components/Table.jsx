import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Table = () => {
    

    const [apidata, setApiData] = useState([])
    const [sorteddata, setSorteddata] = useState([])
    const [token, setToken] = useState("")
    const [flag, setFlag] = useState(false)
    const [sorted, setSorted] = useState(false)
    const dataHandeler = () => {
        const headers = {
            token : localStorage.getItem('key')
        }
        axios.get("http://localhost:8090", {headers:headers}).then((response) => {
            setApiData(response.data)
            setFlag(!flag)
        }).catch((err) => { console.log(err) })
    }
    const deleteHandeler = (id) => {
        axios.delete(`http://localhost:8090/deleteUser/${id}`).then((response) => {
            console.log(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        dataHandeler()
    }, [flag])

    const sortingApiHandeler = () => {
        axios.get("http://localhost:8090/sort").then((response) => {
            setSorteddata(response.data)
            setFlag(!flag)
        }).catch((err) => { console.log(err) })
    }
    const sortHandeler = () => {
        setSorted(!sorted)
        sortingApiHandeler()
    }
    return (
        <>
            <button className="btn btn-primary mt-3 mx-4"
                style={{ backgroundColor: "black" }}>
                <Link to="/form" style={{ textDecoration: "none", color: 'red' }}>
                    Add more...
                </Link>
            </button>
            <button className="btn btn-primary mt-3 mx-4" onClick={sortHandeler}
                style={{ backgroundColor: "black", color: "red" }}>
                Sort data
            </button>
            {
                sorted ?
                    <div className="container mt-2" style={{width:"80%"}}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">UserName</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Job</th>
                                    <th scope="col">Number</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sorteddata.map((ele, i) => {
                                        return (
                                            <>
                                                <tr>
                                                    <th scope="row">{i}</th>
                                                    <td>{ele.name}</td>
                                                    <td>{ele.email}</td>
                                                    <td>{ele.work}</td>
                                                    <td>{ele.mobile}</td>
                                                    <td className='d-felx justify-content-between'>
                                                        <button className='btn btn-success'><Link to={`/view/${ele._id}`} style={{ color: "white" }}><i className="fa-solid fa-eye"></i></Link></button>
                                                        <button className='btn btn-primary mx-4'><Link to={`/Edit/${ele._id}`} style={{ color: "white" }}><i className="fa-solid fa-pen"></i></Link></button>
                                                        <button className='btn btn-danger' onClick={() => deleteHandeler(ele._id)}><i className="fa-solid fa-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    : <div className="container mt-2" style={{width:"80%"}}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">UserName</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Job</th>
                                    <th scope="col">Number</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    apidata.map((ele, i) => {
                                        return (
                                            <>
                                                <tr>
                                                    <th scope="row">{i}</th>
                                                    <td>{ele.name}</td>
                                                    <td>{ele.email}</td>
                                                    <td>{ele.work}</td>
                                                    <td>{ele.mobile}</td>
                                                    <td className='d-felx justify-content-between'>
                                                        <button className='btn btn-success'><Link to={`/view/${ele._id}`} style={{ color: "white" }}><i className="fa-solid fa-eye"></i></Link></button>
                                                        <button className='btn btn-primary mx-4'><Link to={`/Edit/${ele._id}`} style={{ color: "white" }}><i className="fa-solid fa-pen"></i></Link></button>
                                                        <button className='btn btn-danger' onClick={() => deleteHandeler(ele._id)}><i className="fa-solid fa-trash-can"></i></button>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
            }
        </>
    )
}

export default Table
