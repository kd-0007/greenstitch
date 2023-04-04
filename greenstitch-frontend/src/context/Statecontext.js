import React , { createContext , useState} from 'react';
import axios from 'axios';

export const context = createContext();
const Statecontext = (props) => {

    const [name, setname] = useState(null);
    const [error, seterror] = useState(null);

    const signup = async ({name , password , cpassword}) => {
    const config = { headers: { "Content-Type": "application/json" } };
        try {
            const {data} = await axios.post(`/signup` ,
             {name, password , cpassword},
             config
             )
             setname(data.user.name);
            
        } catch (error) {
            seterror(error.response.data.message);
        }
    }

    const login = async ({name , password }) => {
        const config = { headers: { "Content-Type": "application/json" }};
            try {
                const {data} = await axios.post(`/login` ,
                 {name, password },
                 config
                 )
                 setname(data.user.name);
                
            } catch (error) {
                seterror(error.response.data.message);
            }
        }


    const auth = async () => {
            const config = { headers: { "Content-Type": "application/json" } };
                try {
                    const {data} = await axios.get(`/authtoken` ,
                     config
                     )
                     setname(data.user.name);
                    
                } catch (error) {
                    seterror(error.response.data.message);
                    
                }
            }    
            const logout = async () => {
                const config = { headers: { "Content-Type": "application/json" } };
                    try {
                        const {data} = await axios.get(`/logout` ,
                         config
                         )
                         setname(null);
                        
                    } catch (error) {
                        seterror(error.response.data.message);

                    }
                }    
    


    return (<context.Provider value={{name , signup , error , seterror , login , auth , logout}} >
        {props.children}
    </context.Provider>)
}



export default Statecontext;