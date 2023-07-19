import React, {useState, useEffect} from 'react'
import {Card, Button, Row, Col, Container, Navbar} from 'react-bootstrap'
import {useHistory, Link} from 'react-router-dom'
import UserCard from './UserCard'

function UserCollection({users}) {

    const history = useHistory()
  
        const mappedUsers = users.map(user => (
          <Col key={user.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <UserCard key={user.id} {...user}/>
          </Col>
        ))
      
    return (
      <div>
         <Navbar>
          <Button variant='contained' onClick={()=>history.push("/")}>Home</Button>      
          <Button variant='contained' onClick={()=>history.push("/routes")}>Routes</Button>
          <Button variant='contained'>Signout</Button>
        </Navbar>
        <h3 class="form-text">User Profiles</h3>
        <div class="container">
          {mappedUsers}
        </div>
      </div>
        
    )
  }
  
  
  export default UserCollection