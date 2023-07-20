import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Card, Navbar} from 'react-bootstrap'
import DeleteIcon from '@mui/icons-material/DeleteForever';
import NewUserRouteForm from './NewUserRouteForm'
import NewReviewForm from './NewReviewForm'
import UpdateUserProfileForm from './UpdateUserProfileForm'
import UserRouteContainer from './UserRouteContainer'
import Button from '@mui/material/Button';
import ReviewContainer from './ReviewContainer';


function UserProfile({currentUser, handleSignoutClick, saveUser, saveNewUserRoute, setRoutes, saveNewReview, addReviewToUser, addUserRouteToUser, routes, reviews}) {
    const history = useHistory()
    const [seeForm, setSeeForm] = useState(false) //profile update
    const [seeCreateUserRoute, setCreateUserRoute] = useState(false)
    const [newReview, setNewReview] = useState(null)
    const [seeReviewForm, setSeeReviewForm] = useState(false)
    
    const toggleForm = () => {
      setSeeForm(currentVal => !currentVal)
  
    }
  
  const toggleUserRoute = () => {
    setCreateUserRoute(currentVal => !currentVal)
  }
  
  const toggleReview = () => {
    setSeeReviewForm(currentVal => !currentVal)
  }
  
  const {first_name, age, profile_picture, id} = currentUser
  
  // const routes = user_routes.map(user_route => user_route.route)
  // const mappedRoutes = routes.map(route => <RouteCard key={route.id} {...route} currentUser={currentUser}/>)

  
  
  const handleDelete = (e) => {
          fetch(`/users/${id}`,{
            method: 'DELETE'
          })
          .then(res => {
            if (res.ok){
              saveUser(null)
              // history.push("/signin")
            }
            
          })
          .catch(error => console.error(error))
          
      
  
  }
  
    return (
      <div>
        <header> 
        <h3 className="form-text">Welcome To Peak Bagger, {currentUser.first_name}!</h3>
        </header>
          <Navbar>
          <Button variant="contained" onClick={()=>history.push("/users")}>See all Climbers </Button>
          <Button  variant='contained' onClick={()=>history.push("/routes")}>See all Routes</Button>
          <Button  variant='contained' onClick={()=>history.push("/mountains")}>See all Mountains</Button>
          <Button  variant='contained' onClick={()=>history.push("/chat")}>Live Chat</Button>
          <Button  variant='contained' onClick={()=>history.push("/reviews")}>See All Reviewed Routes </Button>
          <Button  variant='contained' onClick={handleSignoutClick}>Signout</Button>
          </Navbar>
        
        <div>
            <Card.Img variant="top" src={profile_picture}/>
            <Card.Title className="form-text"> {first_name}</Card.Title>
            <Card.Text className="form-text"> {age} years old</Card.Text>
            <Button  variant='contained' onClick={toggleForm}>Edit your profile</Button>
            {seeForm? <UpdateUserProfileForm currentUser={currentUser} saveUser={saveUser}/> : null}
            <Button  variant='contained' onClick={toggleUserRoute}>Add A Route To Your Collection!</Button>
            {seeCreateUserRoute ? <NewUserRouteForm seeCreateUserRoute={seeCreateUserRoute} saveNewUserRoute={saveNewUserRoute} setRoutes={setRoutes} addUserRouteToUser={addUserRouteToUser} currentUser={currentUser} routes={routes} /> : null}
            <Button  variant='contained' onClick={toggleReview}>Review A Route!</Button>
            {seeReviewForm ? <NewReviewForm seeReviewForm={seeReviewForm} saveNewReview={saveNewReview} setNewReview={setNewReview} currentUser={currentUser} addReviewToUser={addReviewToUser} routes={routes}/> : null}
        </div>
        <div className="container">
        <UserRouteContainer routes={currentUser.user_routes} currentUser={currentUser} />   
        </div>
        <div className="container">
        <ReviewContainer reviews={currentUser.reviews} currentUser={currentUser} />   
        </div>
        <footer>
        <Button variant='contained' color="error" startIcon={<DeleteIcon />} onClick={handleDelete}> Delete account</Button>
        </footer> 
        </div> 
    )
  }
  
  export default UserProfile





 