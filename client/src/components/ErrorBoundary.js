import React, {useState, useContext, createContext} from 'react';
import { Modal, Button } from 'semantic-ui-react';

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

      <Modal
        open={errors !== ""}
        onClose={() => setErrors("")}
        size='tiny'
      >
        <Modal.Header>Error</Modal.Header>
        <Modal.Content>
          <p>{errors}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setErrors("")}>Close</Button>
        </Modal.Actions>
      </Modal>
    </ErrorContext.Provider>
    )
};

export {ErrorBoundary, ErrorContext}