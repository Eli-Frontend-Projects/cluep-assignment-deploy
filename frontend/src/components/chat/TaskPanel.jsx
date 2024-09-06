import React from 'react';

// Function to create a button
const TaskButton = () => (
<button
  className="text-gray-500 rounded-2xl hover:bg-blue-600 border border-gray-300 w-[149px] h-[40px]"
>
    Task
  </button>
);

const TaskPanel = () => {

  return (
    <div className="flex justify-between w-full space-x-2">
      <TaskButton />
      <TaskButton />
      <TaskButton />
      <TaskButton />
    </div>
  );
};

export default TaskPanel;