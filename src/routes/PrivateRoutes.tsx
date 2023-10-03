import { ReactNode } from "react";
import { useAppSelector } from "../redux/hooks";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

const PrivateRoutes = ({ children }: IProps) => {
  const { user, isLoading } = useAppSelector((state) => state.user);
  const pathName = useLocation();

  if (isLoading) {
    return (
      <div className="mt-1 text-xl font-bold font-serif text-center flex justify-center items-center">
        <h2 className="border-2 rounded-full p-3 w-fit ">Loading ........</h2>
      </div>
    );
  }
  if (user?.email) {
    return children;
  }
  if (!user?.email && !isLoading) {
    return <Navigate to="/login" state={{ path: pathName }} />;
  }
};

export default PrivateRoutes;
