// import { useEffect, useState } from 'react';
// import main_api from '../shared/mainAPi';
// import { Link } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useGetBookQuery } from "../redux/features/book/bookApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addToWishlist } from "../redux/features/whislist/whislistSlice";
import { addToReaded } from "../redux/features/readedBook/readedBookSlice";
import Swal from "sweetalert2";

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
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 text-center">
      <h2 className="mt-1 text-3xl font-bold font-serif">all New Books</h2>

      {isLoading && (
        <div className="mt-1 text-xl font-bold font-serif text-center flex justify-center items-center">
          <h2 className=" border-2 p-2 w-fit ">Loading ......</h2>
        </div>
      )}
      <div className="grid  lg:grid-cols-3 gap-7 sm:max-w-sm sm:mx-auto lg:max-w-full mt-5">
        {books?.map((book, i) => {
          const { _id, title, author, genre, publicationDate } = book;
          return (
            <div
              key={i + 1}
              className="flex flex-wrap justify-center my-2  gap-3 shadow-md hover:shadow-1xl hover:scale-105  text-center"
            >
              <Link to={`/bookDetails/${_id}`} className="w-full  px-4 my-1 ">
                <div className="card w-96 bg-base-100 shadow-xl image-full">
                  <figure>
                    <img
                      src="https://thumbs.dreamstime.com/b/old-book-flying-letters-magic-light-background-bookshelf-library-ancient-books-as-symbol-knowledge-history-218640948.jpg"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <div className="mx-auto text-center">
                      <h2 className=" text-lg font-bold mb-2">{title}</h2>
                      <p className="">{author}</p>
                      <p className="">{genre}</p>
                      <p className="">Publication Date: {publicationDate}</p>
                    </div>

                    <div className="card-actions justify-end">
                      {user?.email && (
                        <section className="mx-auto  grid grid-cols-3 lg:grid-cols-3 gap-3 text-sm font-medium">
                          <Link
                            to={`/bookDetails/${_id}`}
                            className="py-2 bg-gray-200 text-purple-800 font-bold rounded-sm my-2 px-1"
                          >
                            See Details
                          </Link>
                          <button
                            onClick={() => handleAddBook(book)}
                            className="py-2 bg-gray-200 text-purple-800 font-bold  my-2 px-1 rounded-sm"
                          >
                            Add Reading
                          </button>
                          <button
                            onClick={() => handleAddReaded(book)}
                            className="py-2 bg-gray-200 text-purple-800 font-bold  rounded-sm my-2 px-1"
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
          className="block w-96 mt-10 lg:inline-block lg:mt-0 text-gray-100  mr-8 p-2 bg-purple-800 hover:text-purple-800 hover:bg-gray-300 hover:shadow-2xl hover:scale-110  mx-auto  font-bold text-xl "
        >
          See All
        </Link>
      </div>
    </div>
  );
};

export default Books;
