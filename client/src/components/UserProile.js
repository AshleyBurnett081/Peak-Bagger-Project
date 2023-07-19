import React, {useState, useEffect} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import {Card, Container, Navbar} from 'react-bootstrap'
import RouteCard from './RouteCard'
import NewUserRouteForm from './NewUserRouteForm'
import NewReviewForm from './NewReviewForm'
import UpdateUserProfileForm from './UpdateUserProfileForm'
import RouteCollection from './RouteCollection'
import Button from '@mui/material/Button';

function UserProfile({currentUser, handleSignoutClick, saveUser, saveNewUserRoute, setRoutes, saveNewReview, addReviewToUser, addUserRouteToUser, routes}) {
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
  
  const {first_name, age, profile_picture, id, user_routes} = currentUser
  


  
  
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
        <h3 class="form-text">Welcome To Peak Bagger, {currentUser.first_name}!</h3>
        </header>
          <Navbar>
          <Button variant="contained" onClick={()=>history.push("/users")}>See all Climbers </Button>
          <Button  variant='contained' onClick={()=>history.push("/routes")}>See all Routes</Button>
          <Button  variant='contained' onClick={()=>history.push("/mountains")}>See all Mountains</Button>
          <Button  variant='contained' onClick={()=>history.push("/chat")}>Live Chat</Button>
          <Button  variant='contained' onClick={handleSignoutClick}>Signout</Button>
          </Navbar>
        
        <Container>
            <Card.Img variant="top" src={profile_picture}/>
            <Card.Title class="form-text"> {first_name}</Card.Title>
            <Card.Text class="form-text"> {age} years old</Card.Text>
            <Button  variant='contained' onClick={toggleForm}>Edit your profile</Button>
            {seeForm? <UpdateUserProfileForm currentUser={currentUser} saveUser={saveUser}/> : null}
            <Button  variant='contained' onClick={toggleUserRoute}>Add A Route To Your Collection!</Button>
            {seeCreateUserRoute ? <NewUserRouteForm seeCreateUserRoute={seeCreateUserRoute} saveNewUserRoute={saveNewUserRoute} setRoutes={setRoutes} addUserRouteToUser={addUserRouteToUser} currentUser={currentUser} routes={routes} /> : null}
            <Button  variant='contained' onClick={toggleReview}>Review A Route!</Button>
            {seeReviewForm ? <NewReviewForm seeReviewForm={seeReviewForm} saveNewReview={saveNewReview} setNewReview={setNewReview} currentUser={currentUser} addReviewToUser={addReviewToUser}/> : null}
        </Container>
        <h2 class="form-text">My Routes:</h2>
        <div class="container">
        <RouteCollection routes={currentUser.user_routes} />
        </div>
        <footer>
        <Button  variant='contained' onClick={handleDelete}> Delete account</Button>
        </footer> 
        </div> 
    )
  }
  
  export default UserProfile