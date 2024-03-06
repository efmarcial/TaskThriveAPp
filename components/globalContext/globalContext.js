import React, {useState, useEffect, useRef, createContext} from "react";

const Context = createContext()

const Provider = ( { children }) => {

   
    const [domain, setDomain] = useState("https://kmzjc3f5-8000.use.devtunnels.ms");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [appSettings, setAppSettings] = useState({});

    function initAppSettings() {
        console.log("Fetching the Data")
        fetch(`${domain}/api/v1.0/app/settings`, {
            method: 'GET',
        })
        .then(res=> {
            if (res.ok){
                return res.json()
            }else{
                throw res.json()
            }
        })
        .then(json => {
            console.log('Good JSON');
            console.log(json);
            setAppSettings(json);
        })
        .catch(error => {
            console.log(error);
        })
    };

    useEffect(() => {
        initAppSettings()
    }, [])

    const globalContext = {
        domain,
        isLoggedIn,
        setIsLoggedIn,
        appSettings,
        setAppSettings
    }

    return <Context.Provider value={globalContext}>{children}</Context.Provider>




};

export { Context, Provider};