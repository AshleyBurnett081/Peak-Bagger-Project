import React from 'react'
import { Col, Button, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';



function RouteCard({id, mountain_id, name, difficulty_class, length, elevation_gain, picture}) {

        return (
          <Card className='card'style={{ width: '18rem' }}>
            <Card.Img src={picture} alt={name} height={200} width={150} />
            <Card.Body className="text-center">
              <Card.Title className="name-text">{name}</Card.Title>
              <Card.Title className="form-text">Elevation Gain: {elevation_gain} ft.</Card.Title>
              <Card.Title className="difficulty-text"> Class {difficulty_class}</Card.Title>
              <Card.Title className="form-text">Length: {length} Miles</Card.Title>


              </Card.Body>
          </Card>
        );
      
  }






export default RouteCard