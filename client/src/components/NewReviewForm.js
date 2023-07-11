import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";


function NewReviewForm({handleToggleForm, currentUser, setReviews, addReviewToUser}){

    const userSchema = yup.object({
        details: yup.string().required("Describe your drive"),
        
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
            fetch("/user_routes", {
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
                        addReviewToUser(data)
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
        <form class="form-text" onSubmit={formik.handleSubmit}>
            <label htmlFor="route_id">Route_id:</label>
            <input
                id="route_id"
                name="route_id"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.route_id} 
            />
            <label class="form-text" htmlFor="rating">Rating:</label>
            <input
                id="rating"
                name="rating"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.rating} 
            />
  
            <button class='button' type="reset">Reset Form</button>
            <button class="button" type="submit">Submit</button>

        </form>
        <button class="button" onClick={handleToggleForm}>
        Add this route to your collection!
        </button>
        </div>
    )
    
}

export default NewReviewForm