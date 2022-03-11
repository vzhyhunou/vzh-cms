import React, {
    createContext,
    useState,
    useContext
} from 'react';

const ComponentContext = createContext();

export default ({children}) => {

    const [contextValues, setContextValues] = useState({});

    const setBindings = props => setContextValues({...contextValues, ...props});

    return <ComponentContext.Provider value={{
        bindings: contextValues,
        setBindings
    }}>
        {children}
    </ComponentContext.Provider>;
};

export const useBindings = () => useContext(ComponentContext).bindings;
export const useSetBindings = () => useContext(ComponentContext).setBindings;
