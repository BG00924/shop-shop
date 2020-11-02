import React, { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY} from '../../utils/actions'
//imports our custom useStoreContext() hook
// import { useStoreContext } from "../../utils/GlobalState"

// redux requirements
import { useDispatch, useSelector } from 'react-redux'

import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  // const { data: categoryData } = useQuery(QUERY_CATEGORIES);
  // const categories = categoryData?.categories || [];

  //3 const
  // const [state, dispatch] = useStoreContext()

  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const {categories} = state
  const {loading, data: categoryData} = useQuery(QUERY_CATEGORIES)

  //allows us to use the async useQuery to update state
  useEffect(() => {
    // if categoryData exists or has changed from the 
    //response of useQuery, then run dispatch()
    if (categoryData) {
      // execute our dispatch function with our action 
      //object indicating the type of action and the data 
      //to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      })
      // write to idb
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
  }, [categoryData, loading, dispatch])

  // click handler to update global state instead of using function 
  // we receive as a prop from home component
  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    })
  }

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
