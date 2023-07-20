import { useEffect, useState, useContext } from "react";
import React from "react";
import {useFormik} from "formik";
import * as yup from "yup";
import { ErrorContext } from "./ErrorBoundary";
import Button from '@mui/material/Button';

function NewUserForm({saveUser, handleToggleForm}) {
    
    const{handleAddError} = useContext(ErrorContext)

    const userSchema = yup.object({
        first_name: yup.string().required("Please enter your first name"),
        last_name: yup.string().required("Please enter your last name"),
        email: yup.string().required("Please enter your email"),
        password: yup.string().required("Password is required"),
        user_name: yup.string().required("user_name is required"),
        age: yup.string().required("Please enter your age"),
        current_zip_code: yup.string().required("Please enter your zip code"),
        profile_picture: yup.string().required("Please enter a valid URL for picture"),
        favorite_mountain: yup.string().required("Please enter your favorite Mountain"),
    })
    


    
    
    
    const formik = useFormik ({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            user_name: "",
            age: "",
            current_zip_code: "",
            profile_picture: "",
            favorite_mountain: "",
        },
        validationSchema: userSchema,
        onSubmit: values  => {
            // alert(JSON.stringify(values, null));
            console.log("im in fetch")
            fetch("/signup", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",   
                },
                body: JSON.stringify(values, null, 2),
            }).then(resp => {
                console.log("RESP", resp)
                if (resp.ok) {
                    resp.json()
                    .then(user => {
                        saveUser(user)
                    })
                }
                else {
                    resp.json()
                    .then(errorObj => {
                        handleAddError(errorObj.error)
                    })
                }
            })
        },
    });
    return (
        <div>
        <form onSubmit={formik.handleSubmit}>
            <label className="form-text" htmlFor="first_name">First Name:</label>
            <input
                id="first_name"
                name="first_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.first_name}
            />

            <label className="form-text" htmlFor="last_name">Last Name:</label>
            <input
                id="last_name"
                name="last_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.last_name}
            />

            <label className="form-text" htmlFor="email">Email:</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />

            <label className="form-text" htmlFor="password">Password:</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />

            <label className="form-text" htmlFor="user_name">User Name:</label>
            <input
                id="user_name"
                name="user_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.user_name}
            />

            <label className="form-text" htmlFor="age">Age:</label>
            <input
                id="age"
                name="age"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.age}
            />

            <label className="form-text" htmlFor="current_zip_code">Zip Code:</label>
            <input
                id="current_zip_code"
                name="current_zip_code"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.current_zip_code}
            />

            <label className="form-text" htmlFor="profile_picture">Profile Picture URL:</label>
            <input
                id="profile_picture"
                name="profile_picture"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.profile_picture}
            />

            <label className="form-text" htmlFor="favorite_mountain">Favorite Mountain:</label>
            <input
                id="favorite_mountain"
                name="favorite_mountain"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.favorite_mountain}
            />
            <Button variant='contained' type= "reset">Clear Form</Button>
            <Button variant='contained' type="submit">Submit</Button>

        </form>
        <Button variant='contained' onClick={handleToggleForm}>
        Do you already climb with us? Try Logging In!
        </Button>
        </div>
    )
    
}

export default NewUserForm