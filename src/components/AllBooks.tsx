import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetAllBookQuery } from "../redux/features/book/bookApi";
import { addToReaded } from "../redux/features/readedBook/readedBookSlice";
import { addToWishlist } from "../redux/features/whislist/whislistSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Spinner from "../shared/Spinner";

export interface IBook {
  _id?: string | any;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}
const ALlBook = () => {
  const { data, isLoading } = useGetAllBookQuery(undefined);
  const books: IBook[] = data?.data;
  const { user } = useAppSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books?.filter((book) => {
    const { title, author, genre } = book;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const bookDate = new Date(book?.publicationDate);
    const formattedDate = bookDate.toISOString().split("T")[0];
    return (
      title.toLowerCase().includes(lowerCaseSearchTerm) ||
      author.toLowerCase().includes(lowerCaseSearchTerm) ||
      genre.toLowerCase().includes(lowerCaseSearchTerm) ||
      formattedDate.includes(lowerCaseSearchTerm)
    );
  });

  const dispatch = useAppDispatch();

  const handleAddBook = (BookData: IBook) => {
    dispatch(addToWishlist(BookData));
    Swal.fire("Added WishList", "Successfully added books", "success");
  };
  const handleAddReaded = (BookData: IBook) => {
    dispatch(addToReaded(BookData));
    Swal.fire("Added Readed", "Successfully added books", "success");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl text-info font-bold mb-4 text-center">
        Our All Book Outlet
      </h2>

      <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
        <div className="flex flex-col items-center mb-4 w-full md:w-1/2 mt-16 lg:mt-0">
          <select
            name=""
            id=""
            className="py-2 my-2 px-2 outline-none border border-info"
          >
            <option value="" disabled>
              Search Book
            </option>
            <option value="">Genre</option>
            <option value="">Publication Year</option>
          </select>
          <div className="w-full md:w-3/4">
            <input
              type="text"
              placeholder="Search with title, author, genre"
              className="w-full border rounded py-2 px-2 mr-2 border-info"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          {user?.email && (
            <Link
              className="text-xl text-center font-bold bg-info text-white px-4 py-2 rounded-lg"
              to="/addBook"
            >
              Add new
            </Link>
          )}
        </div>
      </div>

      {isLoading && (
        <Spinner></Spinner>
      )}

      <div className="grid gap-5 lg:grid-cols-3 mt-5">
        {filteredBooks?.map((book, i) => {
          const { _id, title, author, genre, publicationDate } = book;
          return (
            <div
              key={i + 1}
              className="flex flex-wrap -mx-4 shadow-md hover:shadow-2xl hover:scale-105 py-1 text-center"
            >
              <Link to={`/bookDetails/${_id}`} className="w-full  px-4 my-1">
                <div className="card bg-white shadow-xl image-full">
                  <figure>
                    <img
                      src="https://thumbs.dreamstime.com/b/open-old-hardcover-book-light-blue-background-open-old-hardcover-book-light-blue-background-166398262.jpg"
                      alt="Book"
                    />
                  </figure>
                  <div className="card-body">
                    <div className="mx-auto text-center">
                      <h2 className="text-lg font-bold mb-2">{title}</h2>
                      <p>{author}</p>
                      <p>{genre}</p>
                      <p>Publication Date: {publicationDate}</p>
                    </div>

                    <div className="card-actions justify-end">
                      {user?.email && (
                        <section className="grid grid-cols-3 lg:grid-cols-3 gap-3 text-sm font-medium">
                          <Link
                            to={`/bookDetails/${_id}`}
                            className="py-2 bg-gray-200 text-info font-bold rounded-sm my-2 px-1"
                          >
                            See Details
                          </Link>
                          <button
                            onClick={() => handleAddBook(book)}
                            className="py-2 bg-gray-200 text-info font-bold my-2 px-1 rounded-sm"
                          >
                            Add Reading
                          </button>
                          <button
                            onClick={() => handleAddReaded(book)}
                            className="py-2 bg-gray-200 text-info font-bold rounded-sm my-2 px-1"
                          >
                            Add Finished
                          </button>
                        </section>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ALlBook;
