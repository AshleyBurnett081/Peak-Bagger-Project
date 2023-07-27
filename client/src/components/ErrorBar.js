import React, { useContext, useEffect, useState } from "react";
import { ErrorContext } from "./ErrorProvider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Error = () => {
  const { errors, setErrors } = useContext(ErrorContext);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (errors) {
      setOpen(true);
      // const timer = setTimeout(() => {
      //   setErrors([]);
      // }, 3000);

      // return () => {
      //   clearTimeout(timer);
      // };
    }
  }, [errors, setErrors]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar className="snackbar" open={open} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%", height:"3em" }}>
        {errors.length > 0 && errors[0]}
      </Alert>
    </Snackbar>
    
  );
};

export default Error;