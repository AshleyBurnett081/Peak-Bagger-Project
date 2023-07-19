import React from 'react'
import { Col } from 'react-bootstrap'
import {useHistory, Link} from 'react-router-dom'
import RouteCard from './RouteCard'
import Button from '@mui/material/Button';
function MountainCollection({routes, handleSignoutClick}) {

    const history = useHistory()
  
        const mappedRoutes = routes.map(route => (
          <Col key={route.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <RouteCard key={route.id} {...route}/>
          </Col>
        ))
      
    return (
      <div>
         
          <Button variant='contained' onClick={()=>history.push("/")}>Home</Button>      
          <Button variant='contained' onClick={()=>history.push("/mountains")}>Mountains</Button>
          <Button variant='contained' onClick={handleSignoutClick}>Signout</Button>
        
        <h3 class="form-text">Routes</h3>
        <div class="container">
          {mappedRoutes}
        </div>
      </div>
        
    )
  }
  
  
  export default MountainCollection