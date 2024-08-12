import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './Layout/Layout';
import Home from './Pages/Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Index from './Pages/Index';
import Edit from './Pages/Edit';
import Create from './Pages/Create';
import VerifyAuth from './Auth/VerifyAuth';
import Delete from './Pages/Delete';
import Details from './Pages/Details';

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />} >
                    <Route index element={<Home />} />
                    <Route path='Auth' >
                        <Route path='login' element={<Login />} />
                        <Route path='Register' element={<Register />} />
                    </Route>
                    <Route path='/Books' element={<VerifyAuth />}>
                        <Route index element ={<Index />} />
                        <Route path='Edit/:id' element={<Edit />} />
                        <Route path='Create' element={<Create />} />
                        <Route path='Delete/:id' element={<Delete />} /> 
                        <Route path='Details/:id' element={<Details />} />
                    </Route>
                </Route>
            </Routes>       
        </>
    )


}

export default App;