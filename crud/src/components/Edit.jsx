import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Edit = () => {
  const navigate = useNavigate()
  const { id } = useParams("")
  console.log(id)
  // const [apidata, setApiData] = useEffect([])
  // const {name, email, age, mobile, address, work, desc} = apidata
  const [state, setState] = useState({
    name: "",
    email: "",
    age: "",
    mobile:"",
    address: "",
    work: "",
    desc: ""
  })
  const onChangeHandeler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const onClickHandeler = () => {
    axios.put(`http://localhost:8090/Edit/${id}`, state).then((response) => {
     setState(response.data)
    }).catch((err) => {
      console.log(err)
    })
    navigate('/')
    setState({
      name: "",
      email: "",
      age: "",
      mobile: "",
      address: "",
      work: "",
      desc: ""
    })
  }


  const dataHandeler = () => {
    axios.get(`http://localhost:8090/view/${id}`).then((response) => {
      setState(response.data)
    }).catch((err) => { console.log(err) })
  }
  useEffect(() => {
    dataHandeler()
  }, [])

  const onSubmitHandeler = (e) => {
    e.preventDefault()
  }
  return (<>
    <div className="container my-2">
      <NavLink to='/'><h3>Home</h3></NavLink>
    </div>
    <div className="container">

      <form className="mt-3" onSubmit={onSubmitHandeler}>
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" onChange={onChangeHandeler} name="name" value={state.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
            <input type="email" onChange={onChangeHandeler} name="email" value={state.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">Age</label>
            <input type="text" onChange={onChangeHandeler} name="age" value={state.age} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">Mobile</label>
            <input type="number" name="mobile" onChange={onChangeHandeler} value={state.mobile} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">Work</label>
            <input type="text" name="work" onChange={onChangeHandeler} value={state.work} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">Address</label>
            <input type="text" name="address" onChange={onChangeHandeler} value={state.address} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Description</label>
            <textarea name="desc" onChange={onChangeHandeler} value={state.desc} cols="150" rows="10"></textarea>
          </div>
          <button className="btn btn-primary" onClick={onClickHandeler}>Done</button>
        </div>
      </form>

    </div>
  </>
  )
}

export default Edit
