import DisplayPage from "./Components/DisplayPage"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root/Root";
import DetailPage from "./Components/DetailPage";
import ErrorPage from "./Components/ErrorPage";
import Logins from "./Auth/Logins";
import SignUp from "./Auth/SignUp";
import Home from "./Root/Home";



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      errorElement: <ErrorPage/>,
      children:[
        {index:true, element:<Home/>},
        {path:'notes', element:<DisplayPage/>},
        {path:'detail/:noteId', element:<DetailPage/>},
      ]
    },
    {path:'/signup', element:<SignUp/>},
    {path:'/login', element:<Logins/>}
  ]);

  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
