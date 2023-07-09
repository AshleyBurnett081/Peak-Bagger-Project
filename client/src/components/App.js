import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import MountainCollection from "./MountainCollection";
import RouteCollection from './RouteCollection';
function App() {


    const [mountains, setMountains] = useState([])
    const [routes, setRoutes] = useState([])

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




    return (
        <div>
        
                <h1>(Hello World)</h1>
                    <MountainCollection mountains={mountains} />
                    <RouteCollection routes={routes} />
        </div>
    
    
    )
}

export default App;

