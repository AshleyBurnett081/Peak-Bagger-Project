import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import MountainCollection from "./MountainCollection";
import RouteCollection from './RouteCollection';
import UserCollection from './UserCollection';
import NewUserForm from "./NewUserForm";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProile"


function App() {


    const [mountains, setMountains] = useState([])
    const [routes, setRoutes] = useState([])
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [reviews, setReviews] = useState([])
    const [userRoutes, setUserRoutes] = useState([])
    const [userReviews, setUserReviews] = useState([])

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
    
    useEffect(() => {
      fetch("/reviews")
      .then(response => response.json())
      .then(data => {
      setReviews(data)
  
        
      })
  }, [])
  
  useEffect(() => {
    fetch("/user_routes")
    .then(response => response.json())
    .then(data => {
    setUserRoutes(data)

      
    })
}, []) 

        
    
    
  const addReviewToUser = (newReview) => {
    setCurrentUser(current_user => {
      return {
        ...current_user,
        reviews: [
          ...current_user.reviews, newReview
        ]
      }

    })
  }
  
  const addUserRouteToUser = (newUserRoute) => {
    setCurrentUser(current_user => {
      return {
        ...current_user,
        user_routes: [
          ...current_user.user_routes, newUserRoute
        ]
      }

    })
  }  
    
    
    
    const saveNewUserRoute = (new_user_route) => {
      setUserRoutes(new_user_route)
    }

    const saveNewReview = (new_user_review) => {
      setUserReviews(new_user_review)
    }
    
    
    
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
    <Switch>
      <Route path = '/users'>
        <UserCollection handleSignoutClick={handleSignoutClick} users={users} />
      </Route>
      <Route exact path = '/'>
      <UserProfile currentUser={currentUser} handleSignoutClick={handleSignoutClick} saveUser={saveUser} saveNewUserRoute={saveNewUserRoute} saveNewReview={saveNewReview} userRoutes ={userRoutes} addReviewToUser = {addReviewToUser} addUserRouteToUser={addUserRouteToUser} />
      </Route>
      <Route path="/routes">
        <RouteCollection routes={routes} />
      </Route>
      <Route path = "/mountains">
        <MountainCollection mountains={mountains}/>
      </Route> 
    </Switch>
  </div>
);
}
export default App;