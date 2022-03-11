import React, {
    createContext,
    useState,
    useContext
} from 'react';

const ComponentContext = createContext();

export default ({children}) => {

    const [contextValues, setContextValues] = useState({});

    const getBindings = () => contextValues;

    const setBindings = props => setContextValues({...contextValues, ...props});

    return <ComponentContext.Provider value={{
        getBindings,
        setBindings
    }}>
        {children}
    </ComponentContext.Provider>;
};

export const useGetBindings = () => useContext(ComponentContext).getBindings;
export const useSetBindings = () => useContext(ComponentContext).setBindings;
