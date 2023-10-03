import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createUser } from "../redux/features/users/userSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface ISignupFormData {
  name?: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { error, isError, user } = useAppSelector((state) => state.user);
  console.log(user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupFormData>();

  useEffect(() => {
    if (isError && error) {
      console.log(error);
      toast("Have an error");
    }
  }, [isError, error]);

  const onSubmit = (data: ISignupFormData) => {
    const { name, email, password } = data;
    console.log(data, name);
    dispatch(createUser({ email, password }));
    if (user?.email) {
      console.log(user);
    }
    navigate("/");
    toast("successFully Sign Up");
  };
  useEffect(() => {
    if (user.email) {
      navigate("/");
    }
  }, [user]);
  const passwordInput = document.getElementById("password") as HTMLInputElement;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md">
        <h3 className="text-center font-bold text-4xl  text-slate-400 my-2 font-serif">
          Sign Up
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg hover:shadow-2xl rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Your Name
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="Enter username"
              id="name"
              {...register("name", { required: "name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                Username is required
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Gender
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name ? "border-red-500" : ""
              }`}
              type="text"
              placeholder=" Gender"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                Username is required
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Date of birth
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name ? "border-red-500" : ""
              }`}
              type="date"
              placeholder=" Date of birth"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic">
                Username is required
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
              type="email"
              placeholder="Enter email"
              id="email"
              {...register("email", { required: "email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              type="password"
              placeholder="Enter password"
              id="password"
              {...register("password", { required: "password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                Password is required
              </p>
            )}
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              <button
                type="button"
                className="text-slate-400 font-mono  focus:outline-none focus:text-gray-800 mt-5"
                onClick={() => {
                  passwordInput.type =
                    passwordInput.type === "password" ? "text" : "password";
                }}
              >
                show
              </button>
            </div>
          </div>

          <h2 className="my-3 text-sm text-slate-600">
            Already have an account ?{" "}
            <Link className="font-mono font-bold text-purple-800 " to="/login">
              Login
            </Link>
          </h2>
          <div className="flex items-center justify-between">
            <button
              className="bg-purple-800  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
