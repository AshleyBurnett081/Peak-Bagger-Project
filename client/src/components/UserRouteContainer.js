import React from 'react'
import { Col } from 'react-bootstrap'
import UserRouteCard from './UserRouteCard'
function UserRouteContainer({routes}) {

  
        const mappedRoutes = routes.map(route => (
          <Col key={route.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <UserRouteCard key={route.id} {...route}/>
          </Col>
        ))
      
    return (
      <div>
         
          
        
        <h3 className="form-text">Routes:</h3>
        <div className="container">
          {mappedRoutes}
        </div>
      </div>
        
    )
  }
  
  
  export default UserRouteContainer