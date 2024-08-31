
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Components/Header';
import Body from './pages/Body';
import Error from './pages/Error';
import ContactUs from './pages/ContactUs';
import ResraurantMenu from './Components/RestaurantMenu';
import MindItemCollection from './Components/MindItemCollection';
import { createBrowserRouter , RouterProvider, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Components/Footer';



const About = lazy(()=> import('./pages/About'));

const Cart = lazy(()=> import('./Components/Cart'));

const AppLayout = ()=>{

return(
    <Provider store={appStore}>
          <div className="flex flex-col">
              <Header/>
              <Outlet className="min-h-screen"/>
              <ToastContainer position="top-center"
                              autoClose={1000}
                              closeOnClick/>
               <div className="w-5 h-5 bg-red-500 z-50"
                        onClick={()=>{ globalThis.scrollTo({top:0, left:0, behavior:"smooth"})}}>
                       
               </div>
               <Footer/>
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