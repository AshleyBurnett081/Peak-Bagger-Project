import React from 'react'
import {Col} from 'react-bootstrap'
import {useHistory, Link} from 'react-router-dom'
import MountainCard from './MountainCard'
import Button from '@mui/material/Button';

function MountainCollection({mountains, handleSignoutClick}) {

    const history = useHistory()
  
        const mappedMountains = mountains.map(mountain => (
          <Col key={mountain.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <MountainCard key={mountain.id} {...mountain}/>
          </Col>
        ))
      
    return (
      <div>
          <Button variant='contained' onClick={()=>history.push("/")}>Home</Button>      
          <Button variant='contained' onClick={()=>history.push("/routes")}>Routes</Button>
        <h3 className="form-text">Mountains</h3>
        <div className="container">
          {mappedMountains}
        </div>
      </div>
        
    )
  }
  
  
  export default MountainCollection