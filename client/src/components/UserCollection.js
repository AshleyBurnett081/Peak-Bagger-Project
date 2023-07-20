import React, {useState, useEffect} from 'react'
import {Col, Container, Navbar} from 'react-bootstrap'
import {useHistory, Link} from 'react-router-dom'
import UserCard from './UserCard'
import Button from '@mui/material/Button';


function UserCollection({users}) {

    const history = useHistory()
  
        const mappedUsers = users.map(user => (
          <Col key={user.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <UserCard key={user.id} {...user}/>
          </Col>
        ))
      
    return (
      <div>
          <Button variant='contained' onClick={()=>history.push("/")}>Home</Button>      
          <Button variant='contained' onClick={()=>history.push("/routes")}>Routes</Button>
        <h3 className="form-text">User Profiles</h3>
        <div className="container">
          {mappedUsers}
        </div>
      </div>
        
    )
  }
  
  
  export default UserCollection