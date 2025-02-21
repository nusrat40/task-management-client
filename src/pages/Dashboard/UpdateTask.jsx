import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const UpdateTask = () => {

    const { _id, title, description,category} = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
//   const { id } = useParams();

  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });

  // Fetch existing task details
//   useEffect(() => {
//     axiosPublic.get(`/tasks/${id}`)
//       .then((res) => setTask(res.data))
//       .catch((err) => console.error("Error fetching task:", err));
//   }, [id, axiosPublic]);

  // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "title" && value.length > 50) return;
//     if (name === "description" && value.length > 200) return;
//     setTask({ ...task, [name]: value });
//   };

  // Handle form submission
  const handleSubmit =async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
   

    const updatedTask = {
      title,
      description,
      category,
      
    };
    
    const taskRes = await axiosPublic.patch(`tasks/${_id}`,updatedTask);
    if(taskRes.data.modifiedCount > 0){
       
        Swal.fire({
            position: "center",
            icon: "success",
            title: 'Task is updated.',
            showConfirmButton: false,
            timer: 1500
          });
    }
    
    navigate('/dashboard/tasks')
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-3xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Title */}
        <div>
          <label className="block font-semibold">Title </label>
          <input
            type="text"
            name="title"
            defaultValue={title}
            placeholder="Enter task title..."
            maxLength="50"
            className="w-full p-2 border rounded-md"
            required
          />
         
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            defaultValue={description}
            placeholder="Enter task description..."
            maxLength="200"
            className="w-full p-2 border rounded-md"
          ></textarea>
          
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold">Category</label>
          <select
            name="category"
            defaultValue={category}
            className="w-full p-2 border rounded-md"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        {/* Buttons */}
        <button
          type="submit"
          className="w-full bg-[#fae150] p-2 rounded-md "
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
