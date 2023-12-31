import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import Button from '@mui/material/Button';

function NewReviewForm({handleToggleForm, currentUser, setReviews, addReviewToUser, routes}){

    
    const mappedRoutes = routes.map(route => 
        <option key={route.id} value={route.id} >{route.name}</option>
    )    
    
    
    
    
    
    
    
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
            <label htmlFor="route_id">Select Your Route:</label>
            <select
                id="route_id"
                name="route_id"
                onChange={formik.handleChange}
                value={formik.values.route_id} 
            >
            <option value= ''>Select A Route</option>
            {mappedRoutes}</select>
            
            
            <label className="form-text" htmlFor="rating">Rating:</label>
            <input
                id="rating"
                name="rating"
                type="text"
                placeholder="                 1-10"
                onChange={formik.handleChange}
                value={formik.values.rating} 
            />

            <label className="form-text" htmlFor="comment">Comment:</label>
            <input
                id="comment"
                name="comment"
                type="text"
                placeholder= "  Leave your Review Here"
                onChange={formik.handleChange}
                value={formik.values.comment} 
            />
            
            <Button variant='contained'type="submit">Submit</Button>

        </form>
        <Button variant='contained' onClick={handleToggleForm}>
        Add this route to your collection!
        </Button>
        </div>
    )
    
}

export default NewReviewForm