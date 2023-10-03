import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetReviewQuery,
  useGetSingleBookQuery,
  usePostReviewMutation,
} from "../redux/features/book/bookApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Swal from "sweetalert2";
import { useState, ChangeEvent, FormEvent } from "react";
import { setNotification } from "../redux/notification/notificationSlice";
import { IBook } from "./AllBooks";
import { addToWishlist } from "../redux/features/whislist/whislistSlice";
import { addToReaded } from "../redux/features/readedBook/readedBookSlice";

const BookDetail = () => {
  const { id } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const { data } = useGetSingleBookQuery(id);
  const book = data?.data;
  const [deleteBook, { isSuccess }] = useDeleteBookMutation();
  const navigate = useNavigate();
  const handleDeleteBook = async (id: string | undefined) => {
    console.log(user?.email, book?.user);
    try {
      if (user?.email === book?.user) {
        await deleteBook({ id: id, email: user?.email });
      } else {
        Swal.fire("UnAuthorized", "You can not delete the Book", "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (isSuccess) {
    Swal.fire("Successfully deleted");
    navigate("/allBook");
  }

  //! for Review Section
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const [postComment, { isLoading, isError, error }] = usePostReviewMutation();
  console.log(isLoading, isError, error);
  const { data: commentData } = useGetReviewQuery(id, {
    refetchOnMountOrArgChange: true,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const form =  event.target;
    console.log(inputValue);

    const option = {
      id: id,
      data: { review: inputValue },
    };

    console.log(option, "review");
    if (user?.email) {
      postComment(option)
        .unwrap()
        .then(() => {
          Swal.fire("Added review", "Successfully added reviews", "success");
          dispatch(
            setNotification({
              message: "Successfully added reviews",
              type: "success",
            })
          );
          setInputValue("");
        })
        .catch((error: any) => {
          console.log(error);
          Swal.fire("Error", "Failed to add review", "error");
          dispatch(
            setNotification({ message: "Failed to add review", type: "error" })
          );
        });
    } else {
      navigate("/login");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddBook = (BookData: IBook) => {
    dispatch(addToWishlist(BookData));
    Swal.fire("Added WishList", "Successfully added books", "success");
  };
  const handleAddReaded = (BookData: IBook) => {
    dispatch(addToReaded(BookData));
    Swal.fire("Added Readed", "Successfully added books", "success");
  };

  return (
    <div>
      <div className="card w-full bg-base-100 shadow-xl image-full rounded-none">
        <figure>
          <img
            src="https://thumbs.dreamstime.com/b/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <div className="min-h-screen">
            <div className="flex justify-center items-center">
              <main className="bg-white">
                <section className=" mx-auto mt-8 p-8 bg-white shadow-md rounded-lg divide-y-2">
                  <h2 className="text-2xl font-bold mb-4 text-purple-800">
                    {book?.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Author:</span>Author :{" "}
                    {book?.author}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Genre:</span> {book?.genre}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Publication Date:</span>{" "}
                    {book?.publicationDate}
                  </p>
                  {commentData?.data?.reviews?.map(
                    (comment: string, index: number) => (
                      <div
                        key={index}
                        className="flex gap-3 text-gray-600 items-center mb-4"
                      >
                        <p>
                          comment: {index + 1} {comment}
                        </p>
                      </div>
                    )
                  )}

                  {user?.email === book?.user && (
                    <section className=" w-full grid grid-cols-1 lg:grid-cols-2 gap-3 font-medium ">
                      <Link
                        to={`/bookUpdate/${id}`}
                        className="shadow hover:shadow-2xl p-2 text-center text-purple-800"
                      >
                        Edit Book
                      </Link>
                      <button
                        onClick={() => handleDeleteBook(id)}
                        className="shadow hover:shadow-2xl p-2 text-red-800 "
                      >
                        Delete Book
                      </button>
                    </section>
                  )}
                </section>
                {user?.email && (
                  <section className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm font-medium">
                    <button
                      onClick={() => handleAddBook(book)}
                      className="py-2 bg-purple-800 rounded-sm mt-2 px-1"
                    >
                      Add Reading
                    </button>
                    <button
                      onClick={() => handleAddReaded(book)}
                      className="py-2 bg-purple-800 rounded-sm mt-2 px-1 "
                    >
                      Add Finished
                    </button>
                  </section>
                )}

                <section className="block lg:flex justify-around max-w-m mx-auto  p-8 bg-white shadow-md rounded-lg ">
                  <form className="" onSubmit={handleSubmit}>
                    <p className="text-md text-center font-bold mb-4 text-black">
                      Add Review
                    </p>
                    <textarea
                      className="min-h-[100] border-2 outline-none w-full text-center font-mono  tex-2xl"
                      onChange={handleChange}
                      value={inputValue}
                    />
                    <button
                      type="submit"
                      className="border w-full text-purple-800 font-bold border-purple-800 rounded py-2 px-4 mr-2 "
                    >
                      Add Review
                    </button>
                  </form>
                </section>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
