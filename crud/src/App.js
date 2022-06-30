import './App.css';
import Navbar from './components/Navbar';
import Table from './components/Table';
import {  Routes, Route} from "react-router-dom";
import Edit from './components/Edit';
import Detail from './components/detail/Detail';
import SearchPage from './components/SearchPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Login from './components/Login/Login';
import Form from './components/form/Form';
import Protected from './components/protection/Protected';

function App() {
  return (
    <>

      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/home" element={<Protected Component={Table}/>} />
        <Route path="/Search" element={<Protected Component={SearchPage} />} />
        <Route path="form" element={<Protected Component={Form}/>} />
        <Route path="Edit/:id" element={<Protected Component={Edit} />} />
        <Route path="view/:id" element={<Protected Component={Detail} />} />
      </Routes>
    </>
  );
}

export default App;
