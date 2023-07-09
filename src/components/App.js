import { GlobalStyle } from "../GlobalStyle";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "redux/operations";
import { selectError, selectIsLoading } from "redux/selectors";
import { Layout } from "./Layout/Layout";
import { AppBar } from "./AppBar/AppBar";
import { TaskForm } from "./TaskForm/TaskForm";
import { TaskList } from "./TaskList/TaskList";
import css from "./App.module.css";
import Loader from "./Loader/Loader";
import RtkQuery from "./RtkQuery/RtkQuery";

const App = () => {
  const dispatch = useDispatch();
  // Отримуємо частини стану
  // const { items, isLoading, error } = useSelector((state) => state.tasks);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  // Викликаємо операцію
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Рендерим розмітку в залежності від значень у стані
  return (
    <>
      <GlobalStyle />
      <Layout>
        <AppBar />
        <TaskForm />
        <div className={css.wrapper}>{isLoading && !error && <Loader />}</div>
        <TaskList />
        <div className={css.rtk}>
          <RtkQuery />
        </div>
      </Layout>
    </>
  );
};

export default App;
