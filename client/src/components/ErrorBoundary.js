import React, {useState, createContext} from 'react';
import { Modal, Button } from 'semantic-ui-react';
import CustomizedSnackbars from './SnackBar.js';

const ErrorContext = createContext();

const ErrorBoundary = ({children}) => {
    const [hasError, setHasError] = useState(false);
    const [errors, setErrors] = useState([]);
    
    const handleAddError = (error) =>{
        setErrors([...errors, error])
    }
    
    const handleError = (error) => {
        setHasError(true);
        console.error(error)
    };

    return (
    <ErrorContext.Provider value={{hasError, handleError, errors, handleAddError}}> 
    {children}
    {errors}
    </ErrorContext.Provider>
    )
};

export {ErrorBoundary, ErrorContext}