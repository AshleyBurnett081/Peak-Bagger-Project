import React, {useState, useEffect} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'
import {Card, Button, Row, Col, Container} from 'react-bootstrap'





function DriverProfile({currentDriver, handleSignoutClick, saveDriver, saveNewCar, setCars, saveNewDrive, addDriveToUser}) {
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
  
  const {first_name, age, profile_picture, drives, id} = currentDriver
  
  const routes = user_routes.map(user_route => user_route.route)
  const mappedCars = routes.map(car => <CarCard key={car.id} {...car} currentDriver={currentDriver}/>)
  
  const handleDelete = (e) => {
          fetch(`/api/v1/drivers/${id}`,{
            method: 'DELETE'
          })
          .then(res => {
            if (res.ok){
              saveDriver(null)
              // history.push("/signin")
            }
            
          })
          .catch(error => console.error(error))
          
      
  
  }
  
    return (
      <div>
        <header> 
        <h3 class="form-text">WELCOME TO JOY RIDE, {currentDriver.first_name}!</h3>
        </header>
          <navbar>
          <button class="button" variant='secondary' onClick={()=>history.push("/drivers")}>See all drivers</button>
          <button class="button" variant='secondary' onClick={()=>history.push("/routes")}>See all routes</button>
          <button class="button" variant='secondary' onClick={handleSignoutClick}>Signout</button>
          </navbar>
        
        <Container>
            <Card.Img variant="top" src={profile_picture}/>
            <Card.Title class="form-text">Name: {first_name}</Card.Title>
            <Card.Text class="form-text">Age: {age} years old</Card.Text>
            <button class="button" variant='secondary' onClick={toggleForm}>Edit your profile</button>
            {seeForm? <UpdateProfileForm currentDriver={currentDriver} saveDriver={saveDriver}/> : null}
            <button class="button" variant='secondary' onClick={toggleUserRoute}>Create a new car</button>
            {seeCreateUserRoute ? <NewCarForm seeCreateUserRoute={seeCreateUserRoute} saveNewCar={saveNewCar} setCars={setCars} addDriveToUser={addDriveToUser}/> : null}
            <button class="button" variant='secondary' onClick={toggleReview}>Create a new drive!</button>
            {seeReviewForm ? <NewDriveForm seeReviewForm={seeReviewForm} saveNewDrive={saveNewDrive} setNewReview={setNewReview} currentDriver={currentDriver} addDriveToUser={addDriveToUser}/> : null}
        </Container>
        <h2 class="form-text">My joy rides:</h2>
        <div class="container">
        {mappedCars}
        </div>
        <footer>
        <button class="button" variant='secondary'onClick={handleDelete}> Delete account</button>
        </footer> 
        </div> 
    )
  }
  
  export default DriverProfile