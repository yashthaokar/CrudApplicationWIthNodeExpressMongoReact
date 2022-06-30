import React, { useState } from 'react'
import { Input } from '@mui/material';
import { Button } from '@mui/material';
import axios from 'axios';

const SearchPage = () => {
    const [value, setValue] = useState("")
    const [search, setSearch] = useState([])
    const [flag, setFlag] = useState(false)

    const changeHandeler = (e) => {
        setValue(e.target.value)
    }
    const searchApi = () => {
        axios.get(`http://localhost:8090/search/${value}`).then((response) => {
            setSearch(response.data)
            setFlag(!flag)
        }).catch((err) => {
            console.log(err)
        })
    }


    const btnClickHandeler = () => {
        console.log(value)
        searchApi()
        // console.log(search)
    }


    return (
        <>
            <Input type="text" style={{ width: "40vw", marginTop: "40px", marginLeft: "310px" }}
                onChange={changeHandeler} value={value}
                placeholder="You can search data by using name email & address" />
            <Button variant="contained" style={{ backgroundColor: "orange", color: "white" }}
                onClick={btnClickHandeler}>
                Search
            </Button>
            <div className="container mt-2">
                <table className="table" style={{marginTop:"60px"}}>
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Job</th>
                            <th scope="col">Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            search.map((ele, i) => {
                                let index = 0;
                                return (
                                    <>
                                        <tr>
                                            <th scope="row">{index+1}</th>
                                            <td>{ele.name}</td>
                                            <td>{ele.email}</td>
                                            <td>{ele.work}</td>
                                            <td>{ele.mobile}</td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default SearchPage
