import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import MountainCollection from "./MountainCollection";

function App() {


    const [mountains, setMountains] = useState([])


    useEffect(() => {
        fetch("/mountains")
        .then(response => response.json())
        .then(data => {
          setMountains(data)
    
          
        })
    }, []) 




    return (
        <div>
                <h1>Hello World</h1>
                <MountainCollection mountains={mountains} />
        </div>
    
    
    )
}

export default App;

