
import axios, { HttpStatusCode } from "axios";
import { Children, createContext, useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";


export const AuthContext = createContext({});

const client = axios.create({
    baseURL: "http://localhost:8000/api/v1/users"
})
 

export const AuthProvider = ({children}) => {
    const authContext = useContext(AuthContext);

    const [userData, setUserData] = useState(authContext);

        const router = useNavigate();

    const handleRegister = async(name, username, password) => {
        try{
            let request = await client.post("/register",{
                name: name,
                username: username,
                password: password
              })

              if(request.status === HttpStatusCode.Created){
                return request.data.message;
              }

        } catch(err) {
             throw err;  
        }
    };

    const handleLogin = async(username, password) =>{
        try{
            let request = await client.post("/login", {
                 username: username,
                password: password
            });

            if(request.status === HttpStatusCode.Ok){
                localStorage.setItem("token", request.data.token);
                router("/home");
                return "Login Successful";
            }

        } catch(err){
            if (err.response && err.response.data && err.response.data.message) {
        throw new Error(err.response.data.message);
      }
      throw new Error("Login failed. Please try again.");
      
        }
    };

    const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
        } catch
         (err) {
            throw err;
        }
    }


     const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }


    const data = {
        userData, setUserData, handleRegister, handleLogin,getHistoryOfUser,addToUserHistory
    };

    return(
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
};