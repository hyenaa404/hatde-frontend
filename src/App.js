import React, { useEffect } from "react";
import AppRouter from "./router/landing-router"
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus } from "./features/authenticate/authThunk";

function App() {
    const dispatch = useDispatch();
    // const authStatus = useSelector((state) => state.auth.isAuthenticated)
    // const authStatus = true;
    // useEffect(()=> {
    //     if(authStatus === null){
    //     dispatch(checkAuthStatus());
    // }
    // }, [])
    
    return (
        
            <div className="App">
             <AppRouter/>
            </div>
    );
}

export default App;
