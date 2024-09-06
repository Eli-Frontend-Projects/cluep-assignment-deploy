import React from 'react';

// Function to create a button with hover effect
const TaskButton = () => (
  <button
    className="text-gray-500 rounded-2xl border border-gray-300 w-[149px] h-[40px] transform transition-transform duration-300 hover:-translate-y-1"
  >
    Task
  </button>
);

const TaskPanel = () => {

  return (
    <div className="flex justify-start w-full space-x-3 overflow-hidden">
      <TaskButton />
      <TaskButton />
      <TaskButton />
      <TaskButton />
    </div>
  );
};

export default TaskPanel;
