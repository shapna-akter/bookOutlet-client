// import Swal from "sweetalert2";
import {
  // addToWishlist,
  // removeOne,
  removeFromWishlist,
} from "../redux/features/whislist/whislistSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface IBook {
  _id?: string | any;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  quantity?: number;
}
const Cart = () => {
  const { books } = useAppSelector((state) => state.wishlist);

  const dispatch = useAppDispatch();

  // const handleAddBook = (book: IBook) => {
  //   dispatch(addToWishlist(book));
  // };
  const handleRemoveBook = (book: IBook) => {
    dispatch(removeFromWishlist(book));
  };
  // const handleRemoveOne = (book: IBook) => {
  //   dispatch(removeOne(book));
  // };

  return (
    <div className="">
      <h2 className="text-center my-3 text-xl font-bold"> Reading book </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {books?.map((book: IBook) => (
          <div
            className="border lg:h-[14rem] divide-y-2 mx-1 lg:p-5 py-2  block   rounded-md"
            key={book?.title}
          >
            <div className="px-2 w-full flex flex-col gap-3">
              <h1 className="text-2xl self-center text-center">
                {book?.title}
              </h1>
              <p className="self-center text-center"></p>
            </div>
            <div className="border-l pl-5 flex flex-col justify-between gap-3">
              <button
                onClick={() => handleRemoveBook(book)}
                className="bg-purple-800 hover:bg-purple-500 text-white font-bold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
