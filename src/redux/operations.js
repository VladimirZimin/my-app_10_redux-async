import axios from "axios";
// import {
//   fetchingError,
//   fetchingInProgress,
//   fetchingSuccess,
// } from "./tasksSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://644d9638cfdddac970a7880d.mockapi.io";

// export const fetchTasks1 = () => async (dispatch) => {
//   try {
//     // Індикатор завантаження
//     dispatch(fetchingInProgress());
//     // HTTP-запит
//     const response = await axios.get("/users");
//     // Обробка даних
//     dispatch(fetchingSuccess(response.data));
//   } catch (error) {
//     // Обробка помилки
//     dispatch(fetchingError(error.message));
//   }
// };

// ========== createAsyncThunk ==========

// createAsyncThunk() - функция
// имеет два аргумента: 1. тип экшена 2. будущее значение payload

// "tasks/fetchAll/pending" - початок запиту
// "tasks/fetchAll/fulfilled" - успішне завершення запиту
// "tasks/fetchAll/rejected" - завершення запиту з помилкою
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  // Використовуємо символ підкреслення як ім'я першого параметра,
  // тому що в цій операції він нам не потрібен
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/todos");
      // При успішному запиті повертаємо проміс із даними
      return response.data;
    } catch (error) {
      // При помилці запиту повертаємо проміс
      // який буде відхилений з текстом помилки
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

/**
 payloadCreator(arg, thunkAPI)

arg - значення, яке було передано операції під час виклику. Використовується, наприклад, для передачі ідентифікаторів об'єктів при видаленні, тексту нотаток при створенні, тощо.
thunkAPI - об'єкт, який передається в асинхронний генератор екшену в redux-thunk. Містить властивості та методи доступу до стору, відправки екшенів, а також деякі додаткові.
 */

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (title, thunkAPI) => {
    try {
      const response = await axios.post("/todos", { title });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, thunkAPI) => {
    try {
      await axios.delete(`/todos/${taskId}`);
      return taskId;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const toggleCompleted = createAsyncThunk(
  "tasks/toggleCompleted",
  async (task, thunkAPI) => {
    try {
      const response = await axios.put(`/todos/${task.id}`, {
        completed: !task.completed,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
