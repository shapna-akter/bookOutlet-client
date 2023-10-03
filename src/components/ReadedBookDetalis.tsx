// import Swal from "sweetalert2";
import {
  // addToReaded,
  removeFromReaded,
  // removeOneReaded,
} from "../redux/features/readedBook/readedBookSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface IBook {
  _id?: string | any;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  quantity?: number;
  total?: number;
}
const ReadedBook = () => {
  const { books } = useAppSelector((state) => state?.readBook);

  const dispatch = useAppDispatch();

  // const handleAddBook = (book: IBook) => {
  //   dispatch(addToReaded(book));
  // };
  const handleRemoveBook = (book: IBook) => {
    dispatch(removeFromReaded(book));
  };
  // const handleRemoveOne = (book: IBook) => {
  //   dispatch(removeOneReaded(book));
  // };

  return (
    <div className="">
      <h2 className="text-center my-3 text-xl font-bold"> Finished book </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {books?.map((book: IBook) => (
          <div
            className="border divide-y-2 mx-2 lg:h-[14rem] lg:p-5 py-2  block   rounded-md"
            key={book?.title}
          >
            <div className="px-2 w-full flex flex-col gap-3">
              <h1 className="text-2xl self-center">{book?.title}</h1>
            </div>
            <div className="border-l pl-5 flex flex-col justify-between gap-3">
              <label></label>
              <label></label>
              <button
                onClick={() => handleRemoveBook(book)}
                className="bg-purple-800 hover:bg-purple-500 text-white font-bold"
              >
                remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadedBook;
