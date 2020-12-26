import React, {createContext, useContext, useReducer} from "react";

//For preparing the data layer
export const StateContext = createContext();

//Wraping my app and providing the data layer

export const StateProvider =({ reducer, initialState, children }) =>(
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// For Pulling the Information from the data layer
export const useStateValue =() => useContext(StateContext);
