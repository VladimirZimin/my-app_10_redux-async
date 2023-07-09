import { createSlice, isAnyOf } from "@reduxjs/toolkit";
// Імпортуємо операцію
import { fetchTasks, addTask, deleteTask, toggleCompleted } from "./operations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const customArr = [fetchTasks, addTask, deleteTask, toggleCompleted];

const fn = (status) => customArr.map((el) => el[status]);

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const tasksSlice1 = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Виконається в момент старту HTTP-запиту
    fetchingInProgress(state) {
      state.isLoading = true;
    },
    // Виконається якщо HTTP-запит завершився успішно
    fetchingSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    // Виконається якщо HTTP-запит завершився з помилкою
    fetchingError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchingInProgress, fetchingSuccess, fetchingError } =
  tasksSlice1.actions;

// ========== createAsyncThunk ==========
export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  // Додаємо обробку зовнішніх екшенів
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })

      // ====== addTask ======
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })

      // ====== deleteTask ======
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex((task) => {
          return task.id === action.payload;
        });
        state.items.splice(index, 1);
        console.log("index:", index);
      })

      // ====== toggleCompleted ======
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          (task) => task.id === action.payload.id
        );
        state.items.splice(index, 1, action.payload);
      })
      // сокращаем: addMatcher(isAnyOf()) если что то срабатывает вызови handlePending

      // v1
      .addMatcher(isAnyOf(...fn("pending")), handlePending)

      // v2
      .addMatcher(
        isAnyOf(
          fetchTasks.rejected,
          addTask.rejected,
          deleteTask.rejected,
          toggleCompleted.rejected
        ),
        handleRejected
      );
  },
});
