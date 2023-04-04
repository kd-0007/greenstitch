import React , {useContext , useState , useEffect} from 'react';
import { Outlet , NavLink, useNavigate } from 'react-router-dom';
import { context } from '../context/Statecontext';

const Signup = () => {
    const {signup , name} = useContext(context);
    const [userData, setuserData] = useState({name:"" , password:"",cpassword:""});

    const navigate = useNavigate()
    const onChange = (e)=>{
        setuserData({...userData , [e.target.name]:e.target.value});
    }

    useEffect(()=>{
        if(name){
            navigate('/')
        }
    },[name])


    const handleSignup = (e)=>{
        e.preventDefault();
        signup(userData);

    }
    return <div className='home'>
                <div className="formBox">

            <form onSubmit={handleSignup}>

                <input type="text" placeholder='Enter Your Name' onChange={onChange}  name='name' value={userData.name} required /><br />
                <input type="password" placeholder='Enter password' onChange={onChange} name='password' value={userData.password} required /><br />
                <input type="password" placeholder='Confirm password' onChange={onChange} name='cpassword' value={userData.cpassword} /><br />
                already Have an account login-up <NavLink to='/login' >login</NavLink><br/><br/>
                <button className='button' type='submit'>Sign-up</button>
            </form>
            </div>
        <Outlet/>
    </div>;
}


export default Signup;