import { Middleware } from "@reduxjs/toolkit";

const logger: Middleware = (store) => (next) => (action) => {
    console.log( store.getState());
    console.log(action)
  next(action)
  console.log(store.getState());
  
};

export default logger;
