import React from 'react'
import { Col } from 'react-bootstrap'
import ReviewCard from './ReviewCard'


function ReviewContainer({reviews}) {

  
        const mappedReviews = reviews.map(review => (
          <Col key={review.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <ReviewCard key={review.id} {...review}/>
          </Col>
        ))
      
    return (
      <div>
         
          
        
        <h3 className="form-text">Reviews:</h3>
        <div className="container">
          {mappedReviews}
        </div>
      </div>
        
    )
  }
  
  
  export default ReviewContainer