import React , {useContext , useState , useEffect} from 'react';
import { Outlet , NavLink, useNavigate } from 'react-router-dom';
import { context } from '../context/Statecontext';

const Login = () => {
    const {login , name} = useContext(context);
    const [userData, setuserData] = useState({name:"" , password:""});

    const navigate = useNavigate()
    const onChange = (e)=>{
        setuserData({...userData , [e.target.name]:e.target.value});
    }

    useEffect(()=>{
        if(name){
            navigate('/')
        }
    },[name])


    const handlelogin = (e)=>{
        e.preventDefault();
        login(userData);

    }
    return <div className='home' >
        <div className="formBox">

        <form onSubmit={handlelogin}>

            <input type="text" placeholder='Enter Your Name' onChange={onChange}  name='name' value={userData.name} required  /><br />
            <input type="password" placeholder='Enter password' onChange={onChange} name='password' value={userData.password} required/><br />
            don't Have an account sign-up <NavLink to='/signup' >Sign-Up</NavLink><br/><br/>
            <button className='button' type='submit'>login</button>
        </form>
        </div>
        <Outlet/>
    </div>
}


export default Login;