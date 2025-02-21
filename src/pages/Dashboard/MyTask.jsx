import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyTask = () => {
  const { user } = useContext(AuthContext); 
  const axiosPublic = useAxiosPublic();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/tasks?email=${user.email}`) 
        .then((res) => setTasks(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email, axiosPublic]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/tasks/${id}`);
    
        if (res.data.deletedCount > 0) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: 'Task has been deleted',
            showConfirmButton: false,
            timer: 1500,
          });
        }
        setTasks(tasks.filter(task => task._id !== id));
      }
    });
  };


  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-3xl">
      <h2 className="text-2xl font-bold mb-4 text-center">My Tasks</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full ">
          <thead>
            <tr className="">
              <th className="border-b-2 p-2">Title</th>
              <th className="border-b-2 p-2">Description</th>
              <th className="border-b-2 p-2">Category</th>
              <th className="border-b-2 p-2">Timestamp</th>
              <th className="border-b-2 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id} className="text-center">
                  <td className=" p-2">{task.title}</td>
                  <td className=" p-2">{task.description}</td>
                  <td className=" p-2">{task.category}</td>
                  <td className="p-2">{new Date(task.timestamp).toLocaleString()}</td>
                  <td className=" p-2 space-x-2">
                    <button className="bg-[#fbea83] px-3 py-1 rounded-md">
                      <Link to={`/dashboard/updateTask/${task._id}`}>Edit</Link>
                    </button>
                    <button
                      className="bg-[#dfbf06] px-3 py-1 rounded-md"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">No tasks found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTask;
