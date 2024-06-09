//Client pagination

import useAllusers from "../../hooks/getUsersCall";
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

const Home = () => {
  const [page, setPage] = useState(1);
  const allUsers = useSelector((state) => state.user.users);
  useAllusers();

  const pageItem = 30;

  function paginateCall(page) {
     setPage(page);
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-3">
        {allUsers &&
          allUsers
            .slice(page * pageItem - pageItem, page * pageItem)
            .map((res) => (
              <div
                key={res.id}
                className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96"
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

      {allUsers && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  paginateCall(page - 1);
                }}
              />
            </PaginationItem>

            {allUsers.length > 0 &&
              [...Array(allUsers.length / pageItem)].map((_, i) => (
                <PaginationItem>
                  <PaginationLink
                    key={i + 1}
                    onClick={() => {
                      paginateCall(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  paginateCall(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default Home;
