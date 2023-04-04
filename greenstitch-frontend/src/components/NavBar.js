import React , {useContext} from 'react';
import { Outlet , NavLink } from 'react-router-dom';
import {context} from '../context/Statecontext';

const NavBar = () => {
    const {name , logout} = useContext(context);
    return <nav>
        {name ? <NavLink className='button red' to='/login'  onClick={logout} >Logout</NavLink> : <NavLink className='button' to='/login' >Login</NavLink>}
        <Outlet/>
    </nav>;
}

export default NavBar;