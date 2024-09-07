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
    <div className="flex justify-start  pt-3 col-span-2 scrollbar-hidden">
      {/* Container div for buttons */}
      <div className="flex space-x-2">
        <TaskButton />
        <TaskButton />
        <TaskButton />
        <TaskButton />
      </div>
    </div>
  );
};

export default TaskPanel;
