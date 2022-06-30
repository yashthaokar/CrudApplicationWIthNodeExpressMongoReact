import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import style from "./RegisterPage.module.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Alertp from '../alert/Alert';

const RegisterPage = () => {
  const navigate = useNavigate()
  const [alert, setAlert] = useState(false)
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    repassword: ""
  })


  const onCHnageHandeler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }


  const registerClickHandeler = () => {
    const { password, repassword, name, email } = state
    if(name.trim()==="" || email.trim()===""|| password.trim()===""){
      alert("Required fields are empty")
    }else{
      if (password !== repassword) {
        alert("Your password is mismatching")
      } else {
        axios.post("http://localhost:8090/auth/register", state).then((response) => {
          console.log(response.data, "SucessFully Added")
        navigate('/')
        alert("You registered successfully")
        setState({
          name: "",
          email: "",
          password: "",
          repassword: ""
        })
        setAlert(false)
        }).catch((err) => {
          setAlert(true)
          console.log(err)
        })
      }
    }
   
  }


  return (
    <div className={style.container}>
      <Card sx={{ maxWidth: 475 }}>
        {alert && <Alertp text="Registration is failed"/>}
        <CardContent>
          <Typography sx={{ fontsize: 14 }} style={{ marginLeft: "160px" }} color="text.secondary" gutterBottom>
            <h1> Register</h1>
          </Typography>
          <Typography variant="h5" component="div" className="fields" style={{ marginTop: '10px', width: '50vw' }}>
            <TextField id="filled-basic" sx={{ width: '32vw' }} name='name'
              label="Your Name" variant="outlined" value={state.name} onChange={onCHnageHandeler} />
          </Typography>
          <Typography variant="h3" component="div" className="fields" style={{ marginTop: '10px' }}>
            <TextField id="filled-basic" sx={{ width: '32vw' }}
              name="email" label="Your Email" type="email" variant="outlined"
              value={state.email} onChange={onCHnageHandeler} />
          </Typography>
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            <TextField id="filled-basic" sx={{ width: '32vw' }} value={state.password}
              name="password" label="Your Password" type="password" variant="outlined"
              onChange={onCHnageHandeler} />
          </Typography>
          <Typography variant="body2" style={{ marginTop: '10px' }}>
            <TextField id="filled-basic" sx={{ width: '32vw' }} onChange={onCHnageHandeler}
              value={state.repassword} name="repassword" type="password" label="Re-Enter Password"
              variant="outlined" />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" sx={{ width: '32vw', marginLeft: '3px' }}
            variant='contained' onClick={registerClickHandeler}>
            Register
          </Button>
          <br />
        </CardActions>
        <CardActions>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Button size="small" sx={{ width: '32vw', marginLeft: '3px' }} variant='contained'>
              Login
            </Button>
          </Link>
          <br />
        </CardActions>
      </Card>
    </div>
  );
}
export default RegisterPage