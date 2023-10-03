import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFoundPage from "../shared/NotFoundPage";
import Home from "../pages/Home";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import AddBook from "../components/AddNewBook";
import BookDetail from "../components/BookDetails";
import ALlBook from "../components/AllBooks";
import UpdateBook from "../components/UpdateBookData";
import PrivateRoutes from "./PrivateRoutes";
import Cart from "../components/Cart";
import ReadedBook from "../components/ReadedBookDetalis";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/addBook",
        element: (
          <PrivateRoutes>
            <AddBook />
          </PrivateRoutes>
        ),
      },
      {
        path: "/allBook",
        element: <ALlBook />,
      },
      {
        path: "/bookDetails/:id",
        element: <BookDetail></BookDetail>,
      },
      {
        path: "/bookUpdate/:id",
        element: (
          <PrivateRoutes>
            <UpdateBook />
          </PrivateRoutes>
        ),
      },
      {
        path: "/reading",
        element: (
          <PrivateRoutes>
            <Cart />
          </PrivateRoutes>
        ),
      },
      {
        path: "/finished",
        element: (
          <PrivateRoutes>
            <ReadedBook />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default routes;
