import React from 'react'
import { Col, Button, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';



function MountainCard({name, elevation, number_of_routes, location, emergency_contact_information, picture, id}) {

        return (
          <Card style={{ width: '18rem' }}>
            <Card.Img src={picture} alt="name" height={200} width={150} />
            <Card.Body className="text-center">
              <Card.Title class="form-text">Name: {name}</Card.Title>
              <Card.Title class="form-text">Elevation: {elevation}</Card.Title>
              <Card.Title class="form-text">Number of Routes: {number_of_routes}</Card.Title>
              <Card.Title class="form-text">Location: {location}</Card.Title>
              <Card.Title class="form-text">Emergency Contact Number: {emergency_contact_information}</Card.Title>
              <Card.Title class="form-text">Mountain Id: {id}</Card.Title>
            </Card.Body>
          </Card>
        );
      
  }






export default MountainCard