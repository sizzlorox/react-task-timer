import produce from 'immer';

export const initialState = localStorage.getItem('tasks') === null ? [] : JSON.parse(localStorage.getItem('tasks'));

const tasksReducer = produce((draft, action) => {
  switch (action.type) {
    case 'ADD':
      localStorage.setItem('tasks', JSON.stringify(action.value));
      return action.value;
    case 'REMOVE':
      const localStorageTasks = JSON.parse(localStorage.getItem('tasks'));
      const taskIndex = localStorageTasks.find(task => task === action.payload);
      if (taskIndex !== -1) {
        localStorageTasks.splice(taskIndex, 1);
      }
      return localStorageTasks;
    case 'CLEAR':
      localStorage.setItem('tasks', []);
      return [];
  }
});
export default tasksReducer;
