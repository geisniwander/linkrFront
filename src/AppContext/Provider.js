import React from "react";
import AppContext from "./Context";
import { useState } from "react";

export default function AppProvider({children}){

    const dataStringified = localStorage.getItem("data")
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [data, setData ] = useState(JSON.parse(dataStringified))
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    return(
        <AppContext.Provider value={{token, setToken, data, setData, config}}>
            {children}
        </AppContext.Provider>
    )
}