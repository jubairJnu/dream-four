import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
   RouterProvider,
} from "react-router-dom";
import routes from './router/routes.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <div className="">
   <RouterProvider router={routes} />
   </div>
  </React.StrictMode>,
)
