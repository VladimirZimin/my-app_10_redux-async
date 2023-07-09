import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tasksSlice } from "./tasksSlice";
import { filtersSlice } from "./filterSlice";
import { newsApi } from "./news";

// const customMiddle = (state) => {
//   return (next) => {
//     return (action) => {
//       if (typeof action === "function") {
//         action(state.dispatch);
//         return;
//       }
//       return next(action);
//     };
//   };
// };

export const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    filters: filtersSlice.reducer,

    // RTK
    [newsApi.reducerPath]: newsApi.reducer,
    // middleware: [customMiddle],
  },
  // RTK middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
});

setupListeners(store.dispatch);
