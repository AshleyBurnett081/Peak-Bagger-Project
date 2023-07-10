import React from 'react'
import { Col, Button, Card } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';



function UserCard({profile_picture, first_name, last_name, user_name, age, current_zip_code, favorite_mountain, email, id}) {

        return (
          <Card style={{ width: '18rem' }}>
            <Card.Img src={profile_picture} alt="name" height={200} width={150} />
            <Card.Body className="text-center">
              <Card.Title class="form-text">User Name: {user_name}</Card.Title>
              <Card.Title class="form-text">First Name: {first_name}</Card.Title>
              <Card.Title class="form-text">Last Name: {last_name}</Card.Title>
              <Card.Title class="form-text">age: {age}</Card.Title>
              <Card.Title class="form-text">Location: {current_zip_code}</Card.Title>
              <Card.Title class="form-text">Favorite Mountain: {favorite_mountain}</Card.Title>
              <Card.Title class="form-text">Email: {email}</Card.Title>
              <Card.Title class="form-text">ID: {id}</Card.Title>
            </Card.Body>
          </Card>
        );
      
  }






export default UserCard