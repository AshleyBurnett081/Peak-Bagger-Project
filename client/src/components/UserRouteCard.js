
import React from 'react'
import { Card } from 'react-bootstrap';




function UserRouteCard({id, mountain_id, route_id, comment, duration_of_climb, date,  picture}) {

        return (
          <Card className='card'style={{ width: '18rem' }}>
            <Card.Img src={picture} alt='epic mountain pic' height={200} width={150} />
            <Card.Body className="text-center">
            <Card.Title className="name-text"> Route ID: {route_id}</Card.Title>  
            <Card.Title className="name-text">{date}</Card.Title>
            <Card.Title className="difficulty-text"> Duration {duration_of_climb} Hours</Card.Title>
            <Card.Title className="form-text"> {comment} </Card.Title>


              </Card.Body>
          </Card>
        );
      
  }


  export default UserRouteCard