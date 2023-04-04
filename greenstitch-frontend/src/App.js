import { useEffect , useContext } from 'react';
import './App.css';
import './components/styles.css'
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import {context} from './context/Statecontext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const {error , seterror , auth } = useContext(context);

  useEffect(()=>{
    auth();
    if(error){
      toast(error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      seterror(null);
    }
  }, [error])

  return (
    <div className="App">
     
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path='/' element = {<Home/>} />  
        <Route path='/login' element = {<Login/>} />  
        <Route path='/signup' element = {<Signup/>} />  

      </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
