// import { useEffect, useState } from 'react';
// import main_api from '../shared/mainAPi';
// import { Link } from 'react-router-dom';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useGetBookQuery } from "../redux/features/book/bookApi";
import { addToReaded } from "../redux/features/readedBook/readedBookSlice";
import { addToWishlist } from "../redux/features/whislist/whislistSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import Spinner from "../shared/Spinner";

interface IBook {
  _id?: string | any;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}
const Books = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data, isLoading } = useGetBookQuery(undefined);

  const books: IBook[] = data?.data;

  const dispatch = useAppDispatch();

  const handleAddBook = (BookData: IBook) => {
    dispatch(addToWishlist(BookData));
    Swal.fire("Added Reading", "Successfully added books", "success");
  };
  const handleAddReaded = (BookData: IBook) => {
    dispatch(addToReaded(BookData));
    Swal.fire("Added Finished", "Successfully added books", "success");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl text-center">
      <h2 className="text-3xl text-primary font-bold mb-4 text-center">
        All New Books
      </h2>
      {isLoading && <Spinner></Spinner>}
      <div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {books?.map((book, i) => {
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
      <div className="mt-10">
        <Link
          to="/allBook"
          className="text-base-100 bg-primary rounded-lg px-4 2xl:px-12 py-2 font-medium cursor-pointer hover:bg-neutral"
        >
          See All
        </Link>
      </div>
    </div>
  );
};

export default Books;
