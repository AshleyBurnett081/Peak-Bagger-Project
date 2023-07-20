import React from 'react'
import { Col, Button, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';



function MountainCard({name, elevation, number_of_routes, location, picture}) {

        return (
          <Card className="card" style={{ width: '18rem' }}>
            <Card.Img  src={picture} alt={name} height={150} width={150} />
            <Card.Body className="text-center">
              <Card.Title className="name-text">{name}</Card.Title>
              <Card.Title className="form-text">{elevation} ft. </Card.Title>
              <Card.Title className="difficulty-text">{number_of_routes} Routes</Card.Title>
              <Card.Title className="form-text">{location}</Card.Title>
            </Card.Body>
          </Card>
        );
      
  }






export default MountainCard