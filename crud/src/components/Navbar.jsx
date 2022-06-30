import { Button } from '@mui/material';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate()
    const onlogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                     <Link className="navbar-brand" to="/home">Y@shCode</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link to="/home" >
                        <Button style={{ color: "green" }}>Home</Button>
                    </Link>
                    <Link to="search" >
                        <Button style={{ color: "green" }}>Search</Button>
                    </Link>
                    <Button style={{fontSize: "14px", color: "green" }} onClick={onlogout}>Logout</Button>
                    
                </div>
            </nav>
        </>
    )
}

export default Navbar;
