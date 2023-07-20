
import React from 'react'
import { Card } from 'react-bootstrap';




function ReviewCard({id, mountain_id, route_id, rating, comment, picture}) {

        return (
          <Card className='card' style={{ width: '18rem' }}>
            <Card.Img src={picture} alt='epic mountain pic' height={200} width={150} />
            <Card.Body className="text-center">
            <Card.Title className="name-text"> Route ID: {route_id}</Card.Title>  
            <Card.Title className="name-text">Rating: {rating}</Card.Title>
            <Card.Title className="form-text"> {comment} </Card.Title>


              </Card.Body>
          </Card>
        );
      
  }


  export default ReviewCard