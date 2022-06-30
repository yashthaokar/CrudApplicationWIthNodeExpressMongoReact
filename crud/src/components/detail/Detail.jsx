import React from 'react'
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import WorkIcon from '@mui/icons-material/Work';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Detail = () => {
  const navigate = useNavigate()
  const { id } = useParams("")
  const [apidata, setApiData] = useState([])
  const { email, name, age, mobile, desc, work, address } = apidata
  const dataHandeler = () => {
    axios.get(`http://localhost:8090/view/${id}`).then((response) => {
      setApiData(response.data)
    }).catch((err) => { console.log(err) })
  }
  useEffect(() => {
    dataHandeler()
  }, [])
  const deleteHandeler = (id) => {
    axios.delete(`http://localhost:8090/deleteUser/${id}`).then((response) => {
      console.log(response.data)
      navigate('/home')
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <div className='container mt-4'>
      <h1 style={{ fontWeight: "300" }}>Welcome {name}</h1>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <div className='row'>
            <div className="left-view col-lg-6 col-md-6 col-12">

              <img style={{ width: 50 }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLeqsbTn6eqpr7PJzc/j5ebf4eLZ3N2wtrnBxsjN0NLGysy6v8HT1tissra8wMNxTKO9AAAFDklEQVR4nO2d3XqDIAxAlfivoO//tEOZWzvbVTEpic252W3PF0gAIcsyRVEURVEURVEURVEURVEURVEURVEURVEURVEURflgAFL/AirAqzXO9R7XNBVcy9TbuMHmxjN6lr92cNVVLKEurVfK/zCORVvW8iUBnC02dj+Wpu0z0Y6QlaN5phcwZqjkOkK5HZyPAjkIjSO4fIdfcOwFKkJlX4zPu7Ha1tIcwR3wWxyFhRG6g4Je0YpSPDJCV8a2Sv2zd1O1x/2WMDZCwljH+clRrHfWCLGK8REMiql//2si5+DKWKcWeAGcFMzzNrXC/0TUwQ2s6+LhlcwjTMlYsUIQzPOCb7YBiyHopyLXIEKPEkI/TgeuiidK/R9FniUDOjRDpvm0RhqjMyyXNjDhCfIMYl1gGjIMIuYsnGEYRMRZOMMunaLVwpWRW008v6fYKDIzxCwVAeNSO90BJW6emelYBRF/kHpYGVaoxTDAaxOFsfP9y8hpJ4xd7gOcij7JNGQ1EYFgkPJa1jQEiYZXRaRINKxSDUW9n+FT82lSKadkiru9/4XPqSLWOekGPoY05TAvLm9orm+YWuwHoBHkZKijNBJGmeb61eL6Ff/6q7bLr7yvv3vKGhpDRjvgjGaPz+gUg6YgcvpyAR2FIZ9U6nEEyZRTovmEU32KichpGn7C17XrfyH9gK/c0CMP05HZIM2uf9sEveizKveBy9/6Qt7o89ne33D525cfcIMW6ab+TMEukQbQbu+xu7X3A9bChmWaCeAkG17bpntwXgWxHaMzGPmUaR5dQZiKqRVeUZ3047fi3nAu28h4CHxCsZAgmEH8Y27jJAhm8c+5RQzRQNVGhVFSfxOYIjp/pP7RxzjevYXVGf4eLt+BJ1vCuLuLkrgABgCGXZ2wik5uty+oBvNirI6mkzhAf4Gsb58Hcm67Jzd+KwD10BYPLL3e0MjvKrgAULnOfveF/O4N2Xb9BZom3gJes3F9X5Zze8/6Yt09b4CrqsEjUv8oFBaR2rl+6CZr2xVrp24o/WitBKuGrrpl1+bFkmK2qXTON4VpbdfLa7o7y/WdLxG7lm2Lqh2clOwTegbvc/vj2U78CwhA87Bn8G5Nk3eOb0Nsr9flz3sG78UUtue4kpv1xvjg3TMay62BMlTlP+vrOMnJsRmt/ze0jsfkPPYdAH57hK+34PeOyc8XIXu5xT2HsUkdZz+adwg8HGFfQ3K5jtDvbUiO4Di9/ywHGrL88pDizZ++oTp+an+SMX/ndymUCwmHMdO7yuOx83pUx/eEMU0AvxWndwgidAqOZ8ypCwdEfvvEo6D9HwpA8wzvmOJEqAg9ySu8g4x0Hb9hSB/BANEKJ+LbPBU0lzbAJs4xt1AoshKkUGQmiH8/jJ0gdhTTLmSegHlPE0oOdXALnqDjKYh3px//fSgSWG8UqfrrIICzYYSJXRr9BSPbpNzw7gBjKjKOYI7ReIGqQRIap5+5MdjyvuDkExvGeXSlONWZAP3/AZBwJohU7QJRGU+cTVH18ELmRPNBmibW6MT/k1b0XhdkRBvyT6SB6EYv/GvhSmRNpGngRULsAlxMCGNXp7w3FfdEbTEEDdLI9TdIKRUzUesa3I461ER8cpNT7gMRhpKmYVS9ELOgCUQsa4SsulciKiLbY+AnHD8cpuhISsnxpamI84sbDq9qYJgf8wiiOBrC7Ml7M7ZECCqKoiiKoiiKoiiKoijv5AvJxlZRyNWWLwAAAABJRU5ErkJggg==" alt="img" />
              <h3 className='mt-3'>Name: <span style={{ fontWeight: 400 }}>{name}</span></h3>
              <h3 className='mt-3'>Age: <span style={{ fontWeight: 400 }}>{age}</span></h3>
              <p style={{ fontWeight: 700 }}><MailOutlineIcon /> Email: <span style={{ fontWeight: 500 }}>{email}</span></p>
              <p style={{ fontWeight: 700 }}><WorkIcon /> Occupation: <span style={{ fontWeight: 500 }}>{work}</span></p>

            </div>
            <div className="right-view col-lg-6 col-md-6 col-12">
              <p style={{ fontWeight: 700 }}><PhoneIphoneIcon /> Mobile: <span style={{ fontWeight: 500 }}>{mobile}</span></p>
              <p style={{ fontWeight: 700 }}><LocationOnIcon /> Location: <span style={{ fontWeight: 500 }}>{address}</span></p>
              <p style={{ fontWeight: 700 }}>Description: <span style={{ fontWeight: 500 }}>{desc}</span></p>
            </div>
            <div className="add_btn">
              <button className='btn btn-primary mx-2'><Link to={`/Edit/${apidata._id}`} style={{color:"white"}}> <CreateIcon /></Link> </button>
              <button className='btn btn-danger' onClick={() => deleteHandeler(apidata._id)}> <DeleteIcon /> </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Detail
