import React, { useState } from "react";
import Header from "./shared/Header";
import Sidebar from "./Sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { editBookmark, removeBookmark } from "@/redux/bookmarkSlice";
import { useNavigate } from "react-router-dom";

const BookMark=()=>{
    const { bookmarks } = useSelector((store) => store.bookmark);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const [editMode, setEditMode] = useState(null);
  const [editMessage, setEditMessage] = useState("");

  const handleEditSubmit = (id) => {
    if (editMessage.trim() === "") {
      toast.error("Message cannot be empty.");
      return;
    }

    dispatch(editBookmark({ id, message: editMessage }));
    toast.success("Bookmark updated successfully.");
    setEditMode(null);
  };

  const handleDelete = (id) => {
    dispatch(removeBookmark(id));
    toast.success("Bookmark removed successfully.");
  };
  return (
    <div>
      <Header />
      <div className="flex">
        <div className="h-full w-1/5 max1024:w-0">
          <Sidebar />
        </div>
        <div className="w-full  h-screen p-[25px_20px] bg-[#d8d8d8] max720:p-[25px_10px]">
          <div>
            <h1 className="text-2xl my-3">My Bookmarks</h1>
            <h3 className="text-gray-500">Home &gt; Dashboard</h3>
          </div>

          <div className="my-10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="bg-gray-800 text-white border-r border-gray-700">
                    Job Title
                  </TableHead>
                  <TableHead className="bg-gray-800 text-white border-r border-gray-700">
                    Notes
                  </TableHead>
                  <TableHead className="bg-gray-800 text-white border-r border-gray-700">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookmarks.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No jobs bookmarked yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  bookmarks.map((job) => (
                    <TableRow key={job._id}>
                      <TableCell className="cursor-pointer text-green-600"
                       
                       onClick={() => navigate(`/description/${job._id}`)}
                      >
                        {job.title}
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {editMode === job._id ? (
                          <textarea
                            value={editMessage}
                            onChange={(e) => setEditMessage(e.target.value)}
                            className="textarea w-full"
                          ></textarea>
                        ) : (
                          job.message
                        )}
                      </TableCell>
                      <TableCell className="space-x-2 max560:p-0" >
                        {editMode === job._id ? (
                          <>
                            <button
                              onClick={() => handleEditSubmit(job._id)}
                              className="btn-primary"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditMode(null)}
                              className="btn-secondary"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                setEditMode(job._id);
                                setEditMessage(job.message);
                              }}
                              className="btn-secondary p-0 max560:items-center"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(job._id)}
                              className="btn-danger"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );


}

export default BookMark;