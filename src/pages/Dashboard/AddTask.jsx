import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import pic from '../../assets/addTask.png'
import { AuthContext } from "../../provider/AuthProvider";

const AddTask = () => {
  const navigate = useNavigate();
  const {user}=useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title" && value.length > 50) return;
    if (name === "description" && value.length > 200) return;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title.trim()) {
      alert("Title is required!");
      return;
    }

    const newTask = {
        ...task,
        timestamp: new Date().toISOString(),
        userEmail: user?.email, // Include logged-in user's email
      };

    try {
      const response = await axiosPublic.post("/tasks", newTask);
      if (response.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Task added successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/tasks"); // Redirect to tasks page
      }
    } catch (error) {
      console.error("Error adding task:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Try again.",
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-xl grid grid-cols-1 lg:grid-cols-2 items-center">
  {/* Left Side: Form */}
  <div className="h-full flex flex-col justify-center">
    <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block font-semibold">Title </label>
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Enter task title..."
          maxLength="50"
          className="w-full p-2 border rounded-md"
          required
        />
        <p className="text-sm text-gray-500">{task.title.length}/50</p>
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold">Description</label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Enter task description..."
          maxLength="200"
          className="w-full p-2 border rounded-md"
        ></textarea>
        <p className="text-sm text-gray-500">{task.description.length}/200</p>
      </div>

      {/* Category */}
      <div>
        <label className="block font-semibold">Category</label>
        <select
          name="category"
          value={task.category}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full bg-[#fae150] p-2 rounded-md">
        Add Task
      </button>
    </form>
  </div>

  {/* Right Side: Image */}
  <div className="h-full flex items-center justify-center">
    <img src={pic} alt="Add Task" className="w-full h-auto max-h-[500px]" />
  </div>
</div>

  );
};

export default AddTask;
