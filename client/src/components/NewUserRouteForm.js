import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";


function NewUserRouteForm({handleToggleForm, currentUser, setUserRoutes, addUserRouteToUser}){

    const userSchema = yup.object({
        comment: yup.string().required("Leave a comment about your climb"),
        duration_of_climb: yup.string().required("Record the duration of your climb"),
        date: yup.string().required("Record the date of your climb"),
    })
    const formik = useFormik ({
        initialValues: {
            comment: "",
            duration_of_climb: "",
            route_id: "",
            date: "",
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
            <label htmlFor="route_id">Route Id:</label>
            <input
                id="route_id"
                name="route_id"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.route_id} 
            />
            <label class="form-text" htmlFor="comment">Comment:</label>
            <input
                id="comment"
                name="comment"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.comment} 
            />

            <label class ="form-text"htmlFor="duration_of_climb">Duration of Climb:</label>
            <input
                id="duration_of_climb"
                name="duration_of_climb"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.duration_of_climb}
            /> 
  
            <label class ="form-text"htmlFor="date">Date:</label>
            <input
                id="date"
                name="date"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.date}
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