import getUsersCall from "../../hooks/getUsersCall";
import { useSelector } from "react-redux";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../redux/usersSlice";

function PaginateServer() {
  const dispatch = useDispatch();
  const [pageNum, setPageNum] = useState(1);
  const [nextPage, setNextPage] = useState(0)
  const { users, totalPages } = 
  useSelector(
    (state) => state.user.users
  );

  useEffect(() => {
    getUsersData(pageNum);
  }, [pageNum]);

  const getUsersData = async (page) => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/getusers?offset=${page}&limit=20`
    );
    dispatch(getAllUsers(data));
  };

  function paginate(val) {
    console.log(val);
    setPageNum(val);
  }

  console.log(users);

  const numbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  console.log(numbers)

  return (
    <>
      <div className="grid grid-cols-4 gap-3">
        {users &&
          users.map((res) => (
            <div
              key={res.id}
              className="cursor-pointer relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96"
            >
              <div className="p-6">
                <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {res.first_name} {res.last_name}
                </h5>
                <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
                  {res.email}
                </p>
              </div>
            </div>
          ))}
      </div>

      {users && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  setPageNum(pageNum - 1);
                }}
              />
            </PaginationItem>

            {users.length > 0 &&
              numbers.slice(0, 30).map((_, i) => (
                <PaginationItem>
                  <PaginationLink 
                    isActive={pageNum === i + 1}
                    key={i + 1}
                    onClick={() => {
                      setPageNum(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  setPageNum(pageNum + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}

export default PaginateServer;
