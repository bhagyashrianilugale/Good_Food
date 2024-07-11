
import React, { Suspense, lazy, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Header';
import Body from './pages/Body';
import Error from './pages/Error';
import ContactUs from './pages/ContactUs';
import ResraurantMenu from './Components/RestaurantMenu';
import MindItemCollection from './Components/MindItemCollection';
import { createBrowserRouter , RouterProvider, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Login from './pages/Login';



const About = lazy(()=> import('./pages/About'));

const Cart = lazy(()=> import('./Components/Cart'));

const AppLayout = ()=>{

const [ userName, SetUserName ] = useState("");


//Authentication logic

useEffect(()=>{
// Authentication by API
  const data = {
      name: "Bhagyashri Ugale"
   }

   SetUserName(data.name);

}, []);

   return(
    <Provider store={appStore}>
          <div className="app">
              <Header/>
              <Outlet/>
          </div>
    </Provider>
   )
}

const appRouter  = createBrowserRouter([
   {
      path: "/",
      element: <AppLayout/>,
      children: [
         {
            path:"/",
            element: <Body/>
         },
         {
            path:"/about",
            element: <Suspense fallback={<h1>Loading...</h1>}><About/></Suspense>
         },
         {
            path:"/contact",
            element: <ContactUs/>
         },
         {
            path:"/restaurants/:resId",
            element: <ResraurantMenu/>
         },
         {
            path:"/collections/:resId/:itemName",
            element: <MindItemCollection/>
         },
         {
            path:"/cart",
            element: <Suspense fallback={<h1>Loading...</h1>}><Cart/></Suspense>
         },
         {
            path:"/login",
            element: <Login/>
         },
      ],
      errorElement: <Error/>
   },
  
]);


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);