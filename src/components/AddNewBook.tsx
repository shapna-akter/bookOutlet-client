import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { usePostBookMutation } from "../redux/features/book/bookApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setNotification } from "../redux/notification/notificationSlice";
import { useNavigate } from "react-router-dom";
export interface IBook {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews: number;
  user?: string | null;
}

const AddBook = () => {
  const { user } = useAppSelector((state) => state?.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [addBook, { isLoading, error }] = usePostBookMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBook>();

  const onSubmit = (data: IBook) => {
    console.log(data);
    if (user?.email) {
      data.user = user?.email;
      console.log(data);
      addBook(data)
        .unwrap()
        .then(() => {
          Swal.fire("Added Book", "Successfully added books", "success");
          dispatch(
            setNotification({
              message: "Successfully added books",
              type: "success",
            })
          );
          reset();
        })
        .catch((error: any) => {
          console.log(error);
          Swal.fire("Error", "Failed to add book", "error");
          dispatch(
            setNotification({ message: "Failed to add book", type: "error" })
          );
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "You are not valid user",
        text: "Login Please",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="mt-1 text-xl font-bold font-serif text-center flex justify-center items-center">
        <h2 className="border-2 rounded-full p-3 w-fit ">Loading ........</h2>
      </div>
    );
  }
  if (error) {
    console.log(error);
  }
  const handleCancel = () => {
    navigate(-1);
  };
  return (
    <div className="min-h-screen p-8">
      <h2 className="text-3xl text-primary font-bold mb-4 text-center">
        Add A Book
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              className="block text-white-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title:
            </label>
            <input
              className={`border-2 border-info p-3 rounded-lg cursor-pointer w-full ${
                errors.title ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="Enter product title"
              id="title"
              {...register("title", { required: "title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-xs italic">
                Book title is required
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-white-700 text-sm font-bold mb-2"
              htmlFor="author"
            >
              Author:
            </label>
            <input
              className={`border-2 border-info p-3 rounded-lg cursor-pointer w-full ${
                errors.author ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="Enter author name"
              id="author"
              {...register("author", { required: "author is required" })}
            />
            {errors.author && (
              <p className="text-red-500 text-xs italic">
                Author name is required
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-white-700 text-sm font-bold mb-2"
              htmlFor="genre"
            >
              Genre:
            </label>
            <input
              className={`border-2 border-info p-3 rounded-lg cursor-pointer w-full ${
                errors.genre ? "border-red-500" : ""
              }`}
              type="text"
              placeholder="Enter product genre"
              id="genre"
              {...register("genre", { required: "genre is required" })}
            />
            {errors.genre && (
              <p className="text-red-500 text-xs italic">
                Book genre is required
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-white-700 text-sm font-bold mb-2"
              htmlFor="publicationDate"
            >
              Publication Date
            </label>
            <input
              className={`border-2 border-info p-3 rounded-lg cursor-pointer w-full ${
                errors.publicationDate ? "border-red-500" : ""
              }`}
              type="date"
              placeholder="Select publication date"
              id="publicationDate"
              {...register("publicationDate", {
                required: "publicationDate is required",
              })}
            />
            {errors.publicationDate && (
              <p className="text-red-500 text-xs italic">
                Publication date is required
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-white-700 text-sm font-bold mb-2"
              htmlFor="publicationDate"
            >
              Price
            </label>
            <input
              className={`border-2 border-info p-3 rounded-lg cursor-pointer w-full ${
                errors.publicationDate ? "border-red-500" : ""
              }`}
              type="number"
              placeholder="Select publication date"
              id="publicationDate"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6 lg:mt-12">
          <input
            type="button"
            value="Cancel"
            className="text-base-100 bg-primary rounded-lg px-4 2xl:px-12 py-2 font-medium cursor-pointer hover:bg-primary-dark"
            onClick={handleCancel}
          />
          <input
            type="submit"
            value="Add Book"
            className="text-base-100 bg-primary rounded-lg px-4 2xl:px-12 py-2 font-medium cursor-pointer hover:bg-primary-dark"
          />
        </div>
      </form>
    </div>
  );
};

export default AddBook;
