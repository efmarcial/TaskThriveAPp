import React, {useState, useEffect, useRef, createContext} from "react";
import * as SecureStore from "expo-secure-store";
const Context = createContext()

const Provider = ( { children }) => {

    
   
    const [domain, setDomain] = useState("https://g5n92vbj-8000.use.devtunnels.ms/");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState();
    const [appSettings, setAppSettings] = useState({});
    const [appServices, setAppServices] = useState({});
    const [username, setUsername] = useState("Welcome"); // Default username

    // Save the tokens safely
    const setAccessToken = async (accessToken) => {
        await SecureStore.setItemAsync('accessToken' , accessToken);
    }

    const setRefreshToken = async (refreshToken) => {
        await SecureStore.setItemAsync('refreshToken', refreshToken);
    }

    const checkTokens = async () => {
        const accessToken = await SecureStore.getItemAsync('accessToken');
        const refreshToken = await SecureStore.getItemAsync('refreshToken');
        console.log(`Global Access Token ${accessToken}`);
        console.log(`Global Refresh Token ${refreshToken}`);
        // Access Token
        if (accessToken) {
            try{
                console.log('Sending access token to database')
                const response = await fetch(`${domain}/api/v1.0/user/get-user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${accessToken}`
                    }
                });
                if (response.ok) {
                    setIsLoggedIn(true);
                    console.log('Access token is valid.')
                    const accessData = await response.json();
                    //Assume data contains user info or other indication

                    // Token is valid, navigate to the home screen with user information.
                    console.log(accessData)
                    await SecureStore.setItemAsync('accessToken', accessData.token.access);
                    setUserObj(accessData.data);
                } else {
                    console.warn('invalid access token')
                    setIsLoggedIn(false);
                }
            } catch (error){
                console.error("Token verification failed: ", error);
                setIsLoggedIn(false);
            }

        } else {
            console.log("Not logged in")
            setIsLoggedIn(false);
        }

        //Refresh Token
        /*if (refreshToken) {
            try{
                console.log("Sending refresh token to server")
                const response = await fetch(`${domain}/api/v1.0/user/get-user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : `Bearer ${refreshToken}`
                    },
                    body: {
                        
                        'refresh': {refreshToken}
                        
                    }
                });
                if (response.ok) {
                    console.log("Refresh token is valid")
                    const refreshData = await response.json();

                    // Save the new access token 
                    //await SecureStore.setItemAsync('accessToken', response.formData.access);
                    //Assume data contains user info or other indication
                    setIsLoggedIn(true);
                    setUserObj(refreshData.user);
                } else {
                    console.warn("Invalid refresh token")
                    setIsLoggedIn(false);
                }
            } catch (error){
                console.error("Token verification failed: ", error);
                setIsLoggedIn(false);
            }

        } else {
            setIsLoggedIn(false);
        }*/
    }

    useEffect(() => {
        checkTokens();
    },[]);

    function initAppServices() {
        console.log("Fetching services from database");
        return fetch(`${domain}/api/v1.0/app/services/services_list.json`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw res.json();
            }
        })
        .then(json => {
            console.log("Good Service JSON");
            //console.log(json);
            setAppServices(json);
        })
        .catch(error => {
            console.log(error);
        });
    }

    
function initAppSettings() {
    console.log("Fetching the Data");
    return fetch(`${domain}/api/v1.0/app/settings`, {
        method: 'GET',
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw res.json();
        }
    })
    .then(json => {
        console.log('Good Settings JSON');
        //console.log(json);
        setAppSettings(json);
    })
    .catch(error => {
        console.log(error);
    });
}

    useEffect(() => {
        initAppSettings()
    }, []);

    useEffect(() => {
        initAppServices()
    }, []);


    const globalContext = {
        domain,
        isLoggedIn,
        setIsLoggedIn,
        appSettings,
        setAppSettings,
        appServices,
        setAppServices,
        userObj,
        setUserObj,
        setAccessToken,
        setRefreshToken,
        initAppServices,
        initAppSettings
    }

    return <Context.Provider value={globalContext}>{children}</Context.Provider>




};

export { Context, Provider};