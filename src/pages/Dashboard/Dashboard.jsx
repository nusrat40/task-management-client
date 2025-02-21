import React, { useState, useEffect, useContext } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { closestCenter } from "@dnd-kit/core";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Importing styles for the calendar
import { AuthContext } from "../../provider/AuthProvider";

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext); // Use context hook first
  const [tasks, setTasks] = useState({
    "To-Do": [],
    "In Progress": [],
    "Done": [],
  });
  const [date, setDate] = useState(new Date()); // State for selected date

  // Ensure hooks are called unconditionally
  const API_URL = `https://task-management-server-green-psi.vercel.app/tasks?email=${user?.email || ""}`;

  useEffect(() => {
    if (!user) return; // Only fetch tasks if the user is logged in
    const fetchTasks = async () => {
      try {
        const { data } = await axios.get(API_URL);
        const organizedTasks = {
          "To-Do": data.filter((task) => task.category === "To-Do"),
          "In Progress": data.filter((task) => task.category === "In Progress"),
          "Done": data.filter((task) => task.category === "Done"),
        };
        setTasks(organizedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [API_URL, user]); // Add `user` to the dependency array

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    const sourceCategory = active.data.current.category;
    const destinationCategory = over.data.current.category;

    if (sourceCategory === destinationCategory) return;

    const updatedTasks = { ...tasks };
    const taskToMove = updatedTasks[sourceCategory].find(
      (task) => task._id === active.id
    );
    taskToMove.category = destinationCategory;

    updatedTasks[sourceCategory] = updatedTasks[sourceCategory].filter(
      (task) => task._id !== active.id
    );
    updatedTasks[destinationCategory].push(taskToMove);

    setTasks(updatedTasks);

    try {
      await axios.patch(`https://task-management-server-green-psi.vercel.app/tasks/${taskToMove._id}`, {
        category: destinationCategory,
        title: taskToMove.title,
        description: taskToMove.description,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Conditional rendering of loading and user check
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view the dashboard.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* First Row: Calendar and My Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Calendar */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Calendar</h2>
          <Calendar
            onChange={setDate}
            value={date}
            className="react-calendar"
          />
        </div>

        {/* My Tasks */}
        <div className="bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-lg font-semibold mb-4">My Tasks</h2>
          {Object.values(tasks).flat().map((task) => (
            <div key={task._id} className="flex justify-between items-center p-2 border-b">
              <span>{task.title}</span>
              <span className="text-gray-500">{task.category}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Second Row: Task Categories (Drag-and-Drop) */}
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(tasks).map((category) => (
            <TaskCategory key={category} category={category} tasks={tasks[category]} />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

const TaskCategory = ({ category, tasks }) => {
  const { setNodeRef } = useDroppable({
    id: category,
    data: { category },
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-white p-4 shadow-md rounded-lg min-h-[300px]"
    >
      <h2 className="text-lg font-semibold mb-4">{category}</h2>
      {tasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  );
};

const Task = ({ task }) => {
  const { setNodeRef, listeners, isDragging } = useDraggable({
    id: task._id,
    data: { category: task.category },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      className={`p-2 bg-gray-100 rounded-md mb-2 shadow-sm cursor-pointer ${isDragging ? "opacity-50" : ""}`}
    >
      {task.title}
    </div>
  );
};

export default Dashboard;
