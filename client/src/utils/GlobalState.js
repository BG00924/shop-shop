import React, { createContext, useContext } from "react";
import { useProductReducer } from './reducers';

// instantiate the global state object
const StoreContext = createContext()
const { Provider } = StoreContext

// custom provider function that will be used to manage and 
//update our state using the reducer we created earlier
const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
        products: [],
        categories: [],
        currentCategory: ''
    })
    // use this to confirm it works
    console.log(state)
    return <Provider value={[state, dispatch]} {...props} />
}

// custom function using useContext() hook so components that need
// data from <StoreProvider> can use it
const useStoreContext = () => {
    return useContext(StoreContext)
}

export { StoreProvider, useStoreContext }