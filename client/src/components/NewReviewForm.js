import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import Button from '@mui/material/Button';

function NewReviewForm({handleToggleForm, currentUser, setReviews, addReviewToUser}){

    const userSchema = yup.object({
        comment: yup.string().required("Describe your climb"),
        rating: yup.string().required("Rate your route"),
        
    })
    const formik = useFormik ({
        initialValues: {
            comment: "",
            rating: "",
            route_id: "",
            user_id: currentUser.id
            
        },
        validationSchema: userSchema,
        onSubmit: values => {
            // alert(JSON.stringify(values, null));
            console.log("im in fetch")
            fetch("/reviews", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",   
                },
                body: JSON.stringify(values, null, 2),
            }).then(resp => {
                console.log("RESP", resp)
                if (resp.ok) {
                    resp.json()
                    .then(data => {
                        // debugger
                        addReviewToUser(data.review)
                    })
                }
                else {
                    resp.json()
                    .then(errorObj => {
                        alert(errorObj.error)
                    })
                }
            })
        },
    });
    return (
        <div>
        <form className="form-text" onSubmit={formik.handleSubmit}>
            <label htmlFor="route_id">Route_id:</label>
            <input
                id="route_id"
                name="route_id"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.route_id} 
            />
            <label className="form-text" htmlFor="rating">Rating:</label>
            <input
                id="rating"
                name="rating"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.rating} 
            />

            <label className="form-text" htmlFor="comment">Comment:</label>
            <input
                id="comment"
                name="comment"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.comment} 
            />
  
            <Button variant='contained' type="reset">Reset Form</Button>
            <Button variant='contained'type="submit">Submit</Button>

        </form>
        <Button variant='contained' onClick={handleToggleForm}>
        Add this route to your collection!
        </Button>
        </div>
    )
    
}

export default NewReviewForm