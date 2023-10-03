import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loginUser } from "../redux/features/users/userSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
interface ILoginFormData {
  name?: string;
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  console.log(user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  const onSubmit = async (data: ILoginFormData) => {
    const { email, password } = data;
    const loginResult = await dispatch(loginUser({ email, password }));

    if (loginResult) {
      toast("Successfully logged in");
      console.log(data.email, "testing");
    } else {
      toast("Check if you've created an account or try again");
    }
  };

  useEffect(() => {
    if (user.email) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md">
        <h3 className="text-center font-bold text-4xl  my-2 font-serif">
          Log In
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
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
                className="text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800"
                onClick={() => {
                  const passwordInput = document.getElementById(
                    "password"
                  ) as HTMLInputElement;
                  passwordInput.type =
                    passwordInput.type === "password" ? "text" : "password";
                }}
              ></button>
            </div>
            <h2 className="my-3 text-sm text-slate-600">
              Are you new here ?{" "}
              <Link
                className="font-mono text-purple-800 font-bold "
                to="/signup"
              >
                sign up
              </Link>
            </h2>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-purple-800  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
