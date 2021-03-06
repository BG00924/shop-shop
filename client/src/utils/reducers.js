// import our actions
import {
    UPDATE_PRODUCTS,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from '../utils/actions'

//imports react hook useReducer that allows us to take in our state
// and update it thru our reducer()
// import { useReducer } from 'react'

const defaultState = {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: '',
}

// reducer function
export const reducers = (state = defaultState, action) => {
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

        // reducer to add to cart
        case ADD_TO_CART:
            return {
                ...state,
                cartOpen: true,
                cart: [...state.cart, action.product]
            }
        
        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products]
            }

        // remove item(s)
        case REMOVE_FROM_CART:
            let newState= state.cart.filter(product => {
                return product._id !== action._id
            })

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            }

        // update quantity
        case UPDATE_CART_QUANTITY:
            return {
                ...state,
                cartOpen: true,
                cart: state.cart.map(product => {
                    if (action._id === product._id) {
                        product.purchaseQuantity = action.purchaseQuantity
                    }
                    return product
                })
            }

        // clear cart
        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            }

        //toggle cart
        case TOGGLE_CART:
            return {
                ...state,
                cartOpen: !state.cartOpen
            };

        // if it's none of the actions, do not update state at all
        // and keep the things same!
        default:
            return state
    }
}

//export for useReducer hook
// export function useProductReducer(initialState) {
//     return useReducer(reducer, initialState)
// }

//This function, useProductReducer(), will be used to help 
//initialize our global state object and then provide us with the 
//functionality for updating that state by automatically running 
//it through our custom reducer() function. Think of this as a 
//more in-depth way of using the useState() Hook we've used so much. 

export default reducers