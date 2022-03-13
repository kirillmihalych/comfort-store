import axios from 'axios'
import React, { useEffect, useContext, useReducer } from 'react'
import { products_reducer } from '../reducers/products_reducer'
import { products_url } from '../utils/constants'

const ProductsContext = React.createContext()

const initialState = {
  isSidebarOpen: false,
  isLoading: false,
  products: [],
  feautred_products: [],
}

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(products_reducer, initialState)

  const closeSidebar = () => {
    dispatch({ type: 'CLOSE_SIDEBAR' })
  }
  const openSidebar = () => {
    dispatch({ type: 'OPEN_SIDEBAR' })
  }

  const fetchProducts = async (url) => {
    dispatch({ type: 'IS_LOADING' })
    try {
      const response = await axios.get(url)
      dispatch({ type: 'FETCH_PRODUCTS', payload: response.data })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchProducts(products_url)
  }, [])

  return (
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar }}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  return useContext(ProductsContext)
}
