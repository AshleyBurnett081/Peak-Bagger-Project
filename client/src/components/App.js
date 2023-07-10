import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import MountainCollection from "./MountainCollection";
import RouteCollection from './RouteCollection';
import UserCollection from './UserCollection';
import NewUserForm from "./NewUserForm";
import LoginForm from "./LoginForm";



function App() {


    const [mountains, setMountains] = useState([])
    const [routes, setRoutes] = useState([])
    const [users, setUsers] = useState([])
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

        if (!currentUser) {
            return (
            <>
            <header class="welcome-message">
              +++++Project Peak Bagger+++++ 
            </header>
            <navbar>
              {!showLoginForm ? <LoginForm saveUser={saveUser} handleToggleForm={handleToggleForm}/> : <NewUserForm saveUser={saveUser} handleToggleForm={handleToggleForm}/>}
            </navbar>
            <img src="https://www.thoughtco.com/thmb/KYfAVyXgN1h_Jx3C3mt9JthMTSM=/5555x2835/filters:fill(auto,1)/CapitolPeak_DonGrail_GettyImages2-58b5b9545f9b586046c3e970.jpg" alt="!"/>
            </>
            )
            }  





    return (
        <div>
        
                <h1>Hello World</h1>
                    
                    <MountainCollection mountains={mountains} />
                    <UserCollection users={users} />
                    
                    </div>
    
    
    )
}

export default App;

