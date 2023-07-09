import { useSelector } from "react-redux";
import { selectTaskCount } from "redux/selectors";
import css from "./TaskCounter.module.css";

export const TaskCounter = () => {
  const { active, completed } = useSelector(selectTaskCount);

  // const count = tasks.reduce(
  //   (acc, task) => {
  //     if (task.completed) {
  //       acc.completed += 1;
  //     } else {
  //       acc.active += 1;
  //     }
  //     return acc;
  //   },
  //   { active: 0, completed: 0 }
  // );

  return (
    <div>
      <p className={css.text}>Active: {active}</p>
      <p className={css.text}>Completed: {completed}</p>
    </div>
  );
};
