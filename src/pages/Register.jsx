import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import signup from '../assets/signup.png'
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";


const Register = () => {
    const axiosPublic =useAxiosPublic();
    const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photo = e.target.photo.value;

        if (password.length < 6) {
            setError("Password should be at least 6 characters long");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Password must include at least one uppercase letter");
            return;
        }
        if (!/[a-z]/.test(password)) {
            setError("Password must include at least one lowercase letter");
            return;
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                setUser(user);
                updateUserProfile({ displayName: name, photoURL: photo })
                .then(()=>{
                
                    //create user in the database
                    const userInfo={
                      name:name,
                      email:email,
                      photo:photo
                    }
                    axiosPublic.post('/users',userInfo)
                    .then(res => {
                      if (res.data.insertedId) {
                        console.log('user added to the database')
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'User created successfully.',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate('/');
                    }
      
                    })
      
            })
            .catch((error) => toast.error(error.message));
        })
    
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen px-4"
        >
           
            <div className="max-w-5xl w-full shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 p-8"
                >
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register Now!</h1>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block font-semibold text-gray-700">Name</label>
                            <input type="text" name="name" placeholder="Your name" className="w-full px-4 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700">Photo URL</label>
                            <input type="text" name="photo" placeholder="Photo URL" className="w-full px-4 py-2 border rounded-md" />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700">Email</label>
                            <input type="email" name="email" placeholder="Your email" className="w-full px-4 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700">Password</label>
                            <input type="password" name="password" placeholder="Password" className="w-full px-4 py-2 border rounded-md" required />
                            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>
                        <button className="w-full bg-[#fae150]  py-2 rounded-md transition font-bold">Register</button>
                    </form>
                    <p className="text-center mt-4">
                        Already have an account? <Link className="underline" to="/login">Log in</Link>
                    </p>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="hidden md:block flex-1"
                >
                    <img src={signup} alt="Sign Up" className="w-full h-full object-cover" />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Register;
