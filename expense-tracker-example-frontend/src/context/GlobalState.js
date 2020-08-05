import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

//initial State
const initialState = {
    transactions: [],
    error: null,
    loading: true
}

//Create Context
export const GlobalContext = createContext(initialState);

//Provider comp
export const GlobalProvider = ({ children }) => { // all components in App will becomes these children?
    const [state, dispatch] = useReducer(AppReducer, initialState); //dispatch is used whenever reducer is called?

    //Actions to reducer

    async function getTransactions() {
        try {
          const res = await axios.get('/api/v1/transactions');
    
          dispatch({
            type: 'GET_TRANSACTIONS',
            payload: res.data.data
          });
        } catch (err) {
          dispatch({
            type: 'TRANSACTION_ERROR',
            payload: err.response.data.error
          });
        }
      }

      async function deleteTransaction(id) {
      try {
        await axios.delete(`/api/v1/transactions/${id}`);
  
        dispatch({
          type: 'DELETE_TRANSACTION',
          payload: id
        });
      } catch (err) {
        dispatch({
          type: 'TRANSACTION_ERROR',
          payload: err.response.data.error
        });
      }
    }

    async function addTransaction(transaction) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      try {
        const res = await axios.post('/api/v1/transactions', transaction, config);
  
        dispatch({
          type: 'ADD_TRANSACTION',
          payload: res.data.data
        });
      } catch (err) {
        dispatch({
          type: 'TRANSACTION_ERROR',
          payload: err.response.data.error
        });
      }
    }


    // below we are returning our GlobalContext and provider ( written with a .Provider)
    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}
    </GlobalContext.Provider>);
}