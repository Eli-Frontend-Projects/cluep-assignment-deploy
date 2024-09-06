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
    <div className="flex justify-start w-full space-x-3 w-[149px] h-[40px] overflow-hidden">
      <TaskButton />
      <TaskButton />
      <TaskButton />
      <TaskButton />
    </div>
  );
};

export default TaskPanel;