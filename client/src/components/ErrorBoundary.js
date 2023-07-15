// import React, {useState, useContext, createContext} from 'react';

// export const ErrorContext = createContext({hasError: false});

// export const ErrorBoundary = (props) => {
//     const [hasError, setHasError] = useState(false);
    
//     const handleError = (error) => {
//         setHasError(true);
//         console.error(error)
//     };

//     if (hasError) {
//         return <p>Someting Went Wrong!</p>;
//     }
//     return <ErrorContext.Provider value={{hasError, handleError}}> 
//     {props.childern} 
//     </ErrorContext.Provider>
// }

// export default ErrorBoundary