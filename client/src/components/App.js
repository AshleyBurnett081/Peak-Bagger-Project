import React, { useEffect, useState, useContext } from "react";
import {ChatEngine} from 'react-chat-engine';
import { Switch, Route } from "react-router-dom";
import MountainCollection from "./MountainCollection";
import RouteCollection from './RouteCollection';
import UserCollection from './UserCollection';
import NewUserForm from "./NewUserForm";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProile";
import ReviewContainer from "./ReviewContainer";
import { ErrorContext } from "./ErrorProvider";
import ErrorBar from "./ErrorBar";



function App() {


    const [mountains, setMountains] = useState([])
    const [routes, setRoutes] = useState([])
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [reviews, setReviews] = useState([])
    const [userRoutes, setUserRoutes] = useState([])
    const [userReviews, setUserReviews] = useState([])
    // const { setErrors } = useContext(ErrorContext)
    
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
    

      // const userRoutes = user_routes.map(user_route => user_route.route)
      // const mappedRoutes = routes1.map(route => <RouteCard key={route.id} {...route} currentUser={currentUser}/>)


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
            <header className="welcome-message">
              <h1>++climbColorado++()</h1> 
            </header>
            <ErrorBar/>
            <nav>
              {!showLoginForm ? <LoginForm saveUser={saveUser} handleToggleForm={handleToggleForm}/> : <NewUserForm saveUser={saveUser} handleToggleForm={handleToggleForm}/>}
            </nav>
            <img  className='Login_pic' src="https://www.thoughtco.com/thmb/KYfAVyXgN1h_Jx3C3mt9JthMTSM=/5555x2835/filters:fill(auto,1)/CapitolPeak_DonGrail_GettyImages2-58b5b9545f9b586046c3e970.jpg" alt="Capital Peak"/>
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
  <UserProfile currentUser={currentUser} handleSignoutClick={handleSignoutClick} saveUser={saveUser} saveNewUserRoute={saveNewUserRoute} saveNewReview={saveNewReview} userRoutes ={userRoutes} addReviewToUser = {addReviewToUser} addUserRouteToUser={addUserRouteToUser} routes={routes}  />
  </Route>
  <Route path="/routes">
  <RouteCollection routes={routes} />
  </Route>
  <Route path = "/mountains">
  <MountainCollection mountains={mountains}/>
  </Route>
  <Route path = "/reviews">
  <ReviewContainer reviews={reviews}/>
  </Route>
  <Route path = "/chat">
  <ChatEngine
 			projectID='4086a57e-cd97-4896-b6bd-72d47c56b0c4'
 			userName='Ashley'
 			userSecret='She-Ra'
 		/>
  </Route> 
  </Switch>
  </div>

);
}
export default App;