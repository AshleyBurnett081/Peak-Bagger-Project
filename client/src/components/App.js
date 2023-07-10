import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import MountainCollection from "./MountainCollection";
import RouteCollection from './RouteCollection';
import UserCollection from './UserCollection'
function App() {


    const [mountains, setMountains] = useState([])
    const [routes, setRoutes] = useState([])
    const {users, setUsers} = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [showLoginForm, setShowLoginForm] = useState(false)



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

    const saveUser = (new_user) => {
        setCurrentUser(new_user)
      }

      const handleToggleForm = () => {
        setShowLoginForm(currentVal => !currentVal);
      };
    



      const handleSignoutClick= () => {
        fetch("/signout", {method: "DELETE"})
          .then(() => {
          setCurrentUser(null); 
          
        }, );
      }

      useEffect(() => {
        fetch("/check-user")
        .then(response => {
          if (response.ok){
            response.json()
            .then(saveUser)
          }
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

