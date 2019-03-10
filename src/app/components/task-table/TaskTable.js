import React, { useState, useContext } from 'react';
import TasksContext from '../../stores/tasks/tasksContext';

const TaskTable = ({ tasks }) => {
  const dispatch = useContext(TasksContext);
  const [showIndex, setShowIndex] = useState();

  const _clear = () => {
    dispatch({
      type: 'CLEAR'
    });
  };

  const _show = (index) => {
    if (showIndex !== index) {
      return setShowIndex(index);
    }

    return setShowIndex();
  };

  const _rename = (task) => {
    dispatch({
      type: 'RENAME',
    });
  };

  const _delete = (task) => {
    dispatch({
      type: 'REMOVE',
      task,
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
                <td onClick={() => _show(index)} onMouseLeave={() => setShowIndex()}>
                  More
                  <div className={`dropdown-content ${showIndex === index ? 'show' : ''}`} >
                    <a onClick={() => _rename(task)}>Rename</a>
                    <a onClick={() => _delete(task)}>Delete</a>
                  </div>
                </td>
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
