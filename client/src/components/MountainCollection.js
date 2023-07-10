import React, {useState, useEffect} from 'react'
import {Card, Button, Row, Col, Container} from 'react-bootstrap'
import {useHistory, Link} from 'react-router-dom'
import MountainCard from './MountainCard'

function MountainCollection({mountains}) {

    const history = useHistory()
  
        const mappedMountains = mountains.map(mountain => (
          <Col key={mountain.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <MountainCard key={mountain.id} {...mountain}/>
          </Col>
        ))
      
    return (
      <div>
         <navbar>
          <button class="button" variant='secondary' onClick={()=>history.push("/")}>Home</button>      
          <button class="button" variant='secondary' onClick={()=>history.push("/routes")}>Routes</button>
          <button class="button" variant='secondary'>Signout</button>
        </navbar>
        <h3 class="form-text">Mountains</h3>
        <div class="container">
          {mappedMountains}
        </div>
      </div>
        
    )
  }
  
  
  export default MountainCollection