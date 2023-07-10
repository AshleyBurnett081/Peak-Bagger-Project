import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import MountainCollection from "./MountainCollection";
import RouteCollection from './RouteCollection';
import UserCollection from './UserCollection'
function App() {


    const [mountains, setMountains] = useState([])
    const [routes, setRoutes] = useState([])
    const {users, setUsers} = useState([])

    useEffect(() => {
        fetch("/mountains")
        .then(response => response.json())
        .then(data => {
          setMountains(data)
    
          
        })
    }, []) 

    useEffect(() => {
        fetch("/routes")
        .then(response => response.json())
        .then(data => {
          setRoutes(data)
    
          
        })
    }, []) 

    useEffect(() => {
        fetch("/users")
        .then(response => response.json())
        .then(data => {
          setUsers(data)
    
          
        })
    }, []) 

    

    
    return (
        <div>
        
                <h1>Hello World</h1>
                    <MountainCollection mountains={mountains} />
                    <RouteCollection routes={routes} />
                    <UserCollection user ={users} />
                    </div>
    
    
    )
}

export default App;

