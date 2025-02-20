import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyTask from "../pages/Dashboard/MyTask";


  const router = createBrowserRouter([
    {
      path: '/',
      element:<MainLayout></MainLayout>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
          path:'/dashboard',
          element:<DashboardLayout></DashboardLayout>,
          children:[
           {
            path:'/',
            element:<Dashboard></Dashboard>
           },
           {
            path:'tasks',
            element:<MyTask></MyTask>
           }
          ]
        }
      ]
    },
  ]);

  export default router;