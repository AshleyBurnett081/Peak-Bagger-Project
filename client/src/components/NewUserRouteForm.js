import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";


function NewUserRouteForm({handleToggleForm, currentUser, setUserRoutes, addUserRouteToUser}){

    const userSchema = yup.object({
        details: yup.string().required("Describe the details of your climb"),
        duration: yup.string().required("Record the duration of your climb"),
        
    })
    const formik = useFormik ({
        initialValues: {
            comment: "",
            duration: "",
            mountain_id: "",
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
                        addUserRouteToUser(data)
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
            <label htmlFor="mountain_id">Mountain_id:</label>
            <input
                id="mountain_id"
                name="mountain_id"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.mountain_id} 
            />
            <label class="form-text" htmlFor="comment">Comment:</label>
            <input
                id="comment"
                name="comment"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.comment} 
            />

             <label class ="form-text"htmlFor="duration">Duration:</label>
            <input
                id="duration"
                name="duration"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.duration}
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

export default NewUserRouteForm