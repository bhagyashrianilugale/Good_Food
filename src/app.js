
import React, { Suspense, lazy, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Header';
import Body from './Components/Body';
import Error from './Components/Error';
import ContactUs from './Components/ContactUs';
import ResraurantMenu from './Components/RestaurantMenu';
import Grocery from './Components/Grocery';
import MindItemCollection from './Components/MindItemCollection';
import { createBrowserRouter , RouterProvider, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from './utils/UserContext';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

//React Components
/*
 -Header
    - logo
    - nav items
 -Body
   - search component
   - restaurant Container
      -Img
      - Star rating
      - cuisine
 -Footer
   - copy rights
   - links
   - links, contact, address

*/

const Grocery = lazy(()=> import('./Components/Grocery'));

const About = lazy(()=> import('./Components/About'));

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
      <UserContext.Provider value={{ loggedUser : userName, SetUserName }}>
          <div className="app">
              <Header/>
              <Outlet/>
          </div>
      </UserContext.Provider>
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
            path:"/collections/:itemId",
            element: <MindItemCollection/>
         },
         {
            path:"/grocery",
            element: <Suspense fallback={<h1>Loading...</h1>}><Grocery/></Suspense>
         },
         {
            path:"/cart",
            element: <Suspense fallback={<h1>Loading...</h1>}><Cart/></Suspense>
         },
      ],
      errorElement: <Error/>
   },
  
]);


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);