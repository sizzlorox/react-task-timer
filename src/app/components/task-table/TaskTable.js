import React, { useContext } from 'react';
import TasksContext from '../../stores/tasks/tasksContext';

const TaskTable = ({ tasks }) => {
  const dispatch = useContext(TasksContext);
  const _clear = () => {
    dispatch({
      type: 'CLEAR'
    });
  };

  return (
    <div className="table-container">
      <table className="task-table">
        <tbody>
          <tr>
            <th>Task</th>
            <th>Time</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
          {
            tasks && tasks.length ? tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.name}</td>
                <td>{task.time}</td>
                <td>{task.date}</td>
                <td>More</td>
              </tr>
            )) : null
          }
        </tbody>
      </table>
      <button onClick={_clear}>Remove all tasks</button>
    </div>
  );
};
export default TaskTable;
