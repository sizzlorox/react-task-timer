import React, { useReducer } from 'react';

import TasksContext from './stores/tasks/tasksContext';
import TasksReducer, { initialState } from './stores/tasks/tasksReducer';

// Components
import Timer from './components/timer/Timer';
import TaskTable from './components/task-table/TaskTable';

const App = () => {
  const [tasks, dispatch] = useReducer(TasksReducer, initialState);

  return (
    <TasksContext.Provider value={dispatch}>
      <div className="app-container">
        <div className="content">
          <Timer tasks={tasks} />
          <TaskTable tasks={tasks} />
        </div>
      </div>
    </TasksContext.Provider>
  );
};
export default App;
