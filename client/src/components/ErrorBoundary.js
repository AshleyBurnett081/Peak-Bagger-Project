import React, {useState, useContext, createContext} from 'react';

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
    </ErrorContext.Provider>
    )
};

export {ErrorBoundary, ErrorContext}