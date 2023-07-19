import React, { useEffect, useState } from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import Button from '@mui/material/Button';

function NewUserRouteForm({handleToggleForm, currentUser, setUserRoutes, addUserRouteToUser, routes}){


    
    const mappedRoutes = routes.map(route => 
        <option key={route.id} value={route.id} >{route.name}</option>
    )

    
    
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
                        addUserRouteToUser(data.user_route)
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
            <option value="">Select A Route</option>
            {mappedRoutes}</select>
            
            <label className="form-text" htmlFor="comment">Comment:</label>
            <input
                id="comment"
                name="comment"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.comment} 
            />

            <label className ="form-text"htmlFor="duration_of_climb">Duration of Climb:</label>
            <input
                id="duration_of_climb"
                name="duration_of_climb"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.duration_of_climb}
            /> 
  
            <label className ="form-text"htmlFor="date">Date:</label>
            <input
                id="date"
                name="date"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.date}
            /> 
            <Button variant='contained' type="reset">Reset Form</Button>
            <Button  variant='contained' type="submit">Submit</Button>

        </form>
        <Button variant='contained' onClick={handleToggleForm}>
        Add this route to your collection!
        </Button>
        </div>
    )
    
}

export default NewUserRouteForm




