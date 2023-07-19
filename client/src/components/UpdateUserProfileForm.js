import React from "react"
import {useFormik} from "formik";
import * as yup from "yup";
import Button from '@mui/material/Button';

function UpdateUserProfileForm({currentUser, saveUser}) {

    

    const formik = useFormik({
        initialValues: {
          email: currentUser.email,
          profile_picture: currentUser.profile_picture,
          first_name: currentUser.first_name,
          last_name: currentUser.last_name,
          user_name: currentUser.user_name,
          age: currentUser.age,
          current_zip_code: currentUser.current_zip_code,
          favorite_mountain: currentUser.favorite_mountain
        },
        validationSchema: yup.object({
          email: yup.string().required("Email is required"),
          profile_picture: yup.string().required("Profile picture is required"),
          first_name: yup.string().required("First Name is required"),
          last_name: yup.string().required("Last Name is required"),
          user_name: yup.string().required("User Name is required"),
          age: yup.string().required("Age is required"),
          current_zip_code: yup.string().required("Zip code is required"),
          favorite_mountain: yup.string().required("You favorite mountain is required"),
        }),
        onSubmit: values => {
          fetch(`/users/${currentUser.id}`, {
            method:"PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          }).then(resp => {
            if (resp.ok) {
              resp.json()
              .then(user => {
                saveUser(user) 
              })
            }
            else {
              resp.json()
              .then(error => {
                alert("Something went wrong",error.error)
              })
            }
          })
        },
    });
    return (
      <>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            
            <label htmlFor="profile_picture">Profile picture:</label>
            <input
                id="profile_picture"
                name="profile_picture"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.profile_picture}
            />

            <label htmlFor="first_name">First Name:</label>
            <input
                id="first_name"
                name="first_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.first_name}
            />

            <label htmlFor="last_name">Last Name:</label>
            <input
                id="last_name"
                name="last_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.last_name}
            />

            <label htmlFor="user_name">User Name:</label>
            <input
                id="user_name"
                name="user_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.user_name}
            />

            <label htmlFor="age">Age:</label>
            <input
                id="age"
                name="age"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.age}
            />

            <label htmlFor="current_zip_code">Zip_code:</label>
            <input
                id="current_zip_code"
                name="current_zip_code"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.current_zip_code}
            />

            <label htmlFor="favorite_mountain">Profile picture:</label>
            <input
                id="favorite_mountain"
                name="favorite_mountain"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.favorite_mountain}
            />
            
            <Button variant='contained' type="submit">Update</Button>
        
        </form>
      </>
      )
    }
    
    export default UpdateUserProfileForm;