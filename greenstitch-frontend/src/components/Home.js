import React , {useContext} from 'react';
import { Outlet } from 'react-router-dom';
import {context} from '../context/Statecontext';

const Home = () => {
    const {name} = useContext(context);

    return <section className='home' >
        <p align = 'center'>  {name ? <>Welcome! : {name}, May you have an wonderful day  </> : <>Sample Login and Signup</> }  </p>
        
        <Outlet/>
    </section>;
}


export default Home;