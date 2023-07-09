import React, {useState, useEffect} from 'react'
import {Card, Button, Row, Col, Container} from 'react-bootstrap'
import {useHistory, Link} from 'react-router-dom'
import RouteCard from './RouteCard'

function MountainCollection({routes}) {

    const history = useHistory()
  
        const mappedRoutes = routes.map(route => (
          <Col key={route.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <RouteCard key={route.id} {...route}/>
          </Col>
        ))
      
    return (
      <div>
         <navbar>
          <button class="button" variant='secondary' onClick={()=>history.push("/")}>Home</button>      
          <button class="button" variant='secondary' onClick={()=>history.push("/mountains")}>Mountains</button>
          <button class="button" variant='secondary'>Signout</button>
        </navbar>
        <h3 class="form-text">Routes</h3>
        <div class="container">
          {mappedRoutes}
        </div>
      </div>
        
    )
  }
  
  
  export default MountainCollection