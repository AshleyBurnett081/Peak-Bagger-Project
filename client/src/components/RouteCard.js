import React from 'react'
import { Col, Button, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';



function RouteCard({id, mountain_id, name, difficulty_class, length, elevation_gain, picture}) {

        return (
          <Card style={{ width: '18rem' }}>
            <Card.Img src={picture} alt="name" height={200} width={150} />
            <Card.Body className="text-center">
              <Card.Title class="form-text">Name: {name}</Card.Title>
              <Card.Title class="form-text">Elevation Gain: {elevation_gain}</Card.Title>
              <Card.Title class="form-text">Difficulty Class: {difficulty_class}</Card.Title>
              <Card.Title class="form-text">Length: {length}</Card.Title>
              <Card.Title class="form-text">Id: {id}</Card.Title>
              <Card.Title class="form-text">Mountain Id: {mountain_id}</Card.Title>
            </Card.Body>
          </Card>
        );
      
  }






export default RouteCard