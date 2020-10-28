// import our actions
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
} from '../utils/actions'

//imports react hook useReducer that allows us to take in our state
// and update it thru our reducer()
import { useReducer } from 'react'

// reducer function
export const reducer = (state, action) => {
    switch (action.type) {
        // if action type value is the value of 'UPDATE_PRODUCTs,
        // return a new state object with an updated products array
        case UPDATE_PRODUCTS:
            return {
                ...state, 
                products: [...action.products],
            }
        // if action type value is the value of `UPDATE_CATEGORIES`, 
        // return a new state object with an updated categories array
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            }

        // if action type value is value of update_current_category,
        // return a new stat object with a new string
        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            }

        // if it's none of the actions, do not update state at all
        // and keep the things same!
        default:
            return state
    }
}

//export for useReducer hook
export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
}

//This function, useProductReducer(), will be used to help 
//initialize our global state object and then provide us with the 
//functionality for updating that state by automatically running 
//it through our custom reducer() function. Think of this as a 
//more in-depth way of using the useState() Hook we've used so much. 