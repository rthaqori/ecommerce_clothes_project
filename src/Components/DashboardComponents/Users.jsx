import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Sidebar from "./Sidebar";
import { useAuth } from "../Contexts/AuthContext";

const Users = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = [];
        querySnapshot.forEach((doc) => {
          usersData.push({ id: doc.id, ...doc.data() });
        });
        setData(usersData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      const newUsersData = data.filter((user) => user.id !== id);
      setData(newUsersData);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="flex items-center gap-3">
            <img
              src={params.row.image}
              alt="user"
              className="h-8 w-8 rounded-full border border-gray-400 object-contain"
            />
            {params.row.email}
          </div>
        );
      },
    },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 190,
      renderCell: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "Action",
      renderCell: (params) => {
        return (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex h-full items-center justify-center focus:outline-none"
          >
            <button
              className="flex h-10 w-fit items-center justify-center rounded-md border bg-red-400 p-2 font-medium text-white"
              onClick={(e) => {
                deleteUser(params.row.id);
              }}
            >
              Delete User
            </button>
          </div>
        );
      },
    },
  ];

  const { logout, currentUser } = useAuth();
  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="flex">
      <Sidebar />
      <section className="w-10/12 p-10">
        <div className="mb-6 flex justify-between">
          <h1 className="text-4xl font-bold">Users</h1>
          <div className="flex items-center gap-3">
            <p>
              Logged in as <strong>{currentUser.email}</strong>
            </p>
            <button
              className="rounded-full border border-gray-400 px-4 py-1 text-gray-500 transition-colors duration-300 ease-in-out hover:border-black hover:text-black"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </div>
        </div>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </section>
    </div>
  );
};

export default Users;
