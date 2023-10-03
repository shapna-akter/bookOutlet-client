import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../lib/firebase.config";
import { logout } from "../redux/features/users/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  console.log(user);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(logout());
      setMenuOpen(false);
    });
  };
  const navItems = (
    <React.Fragment>
      <Link
        to="/allBook"
        onClick={closeMenu}
        className=""
      >
        ALLBooks
      </Link>
      {user?.email ? (
        <>
          <Link
            to="/addBook"
            onClick={closeMenu}
            className=""
          >
            AddBook
          </Link>
          <Link
            to="/reading"
            onClick={closeMenu}
            className=""
          >
            Reading
          </Link>

          <Link
            to="/finished"
            onClick={closeMenu}
            className=""
          >
            Finished
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/signup"
            onClick={closeMenu}
            className="block mt-4 lg:inline-block lg:mt-0 text-black-600 mr-8"
          >
            SignUp
          </Link>
          <Link
            to="/login"
            onClick={closeMenu}
            className="block mt-4 lg:inline-block lg:mt-0 text-black-600 mr-8"
          >
            Login
          </Link>
        </>
      )}
    </React.Fragment>
  );

  return (
      <div className="navbar bg-info">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-md text-primary flex gap-4 font-semibold"
            >
              {navItems}
            </ul>
          </div>
          <Link
            to="/"
            className="lg:text-3xl text-primary font-bold text-black-800 font-serif"
          >
            BooksOutlet
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-md text-primary flex gap-4 font-semibold">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {user?.email ? (
            <>
              <Link
                to="/login"
                onClick={handleLogout}
                className="btn btn-primary btn-xs lg:btn-sm font-semibold"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                onClick={closeMenu}
                className="block mt-4 lg:inline-block lg:mt-0 text-black-600 mr-8"
              >
                SignUp
              </Link>
              <Link
                to="/login"
                onClick={closeMenu}
                className="block mt-4 lg:inline-block lg:mt-0 text-black-600 mr-8"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
  );
};

export default Navbar;
