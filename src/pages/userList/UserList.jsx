import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
<<<<<<< HEAD
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteClient, getClients } from "../../redux/apiCalls";

export default function UserList() {
  const [data, setData] = useState(userRows);
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.client.clients);

  useEffect(() => {
    getClients(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteClient(id, dispatch);
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
=======

export default function UserList() {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
>>>>>>> 47c2748e4b75f9b4bdb8cb3cc8c5bdc0eb9da1d0
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
<<<<<<< HEAD
            <img className="userListImg" src={params.row.img} alt="" />
=======
            <img className="userListImg" src={params.row.avatar} alt="" />
>>>>>>> 47c2748e4b75f9b4bdb8cb3cc8c5bdc0eb9da1d0
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
<<<<<<< HEAD
    // {
    //   field: "transaction",
    //   headerName: "Transaction Volume",
    //   width: 160,
    // },
=======
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
>>>>>>> 47c2748e4b75f9b4bdb8cb3cc8c5bdc0eb9da1d0
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
<<<<<<< HEAD
            <Link to={"/user/" + params.row._id}>
=======
            <Link to={"/user/" + params.row.id}>
>>>>>>> 47c2748e4b75f9b4bdb8cb3cc8c5bdc0eb9da1d0
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
<<<<<<< HEAD
              onClick={() => handleDelete(params.row._id)}
=======
              onClick={() => handleDelete(params.row.id)}
>>>>>>> 47c2748e4b75f9b4bdb8cb3cc8c5bdc0eb9da1d0
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
<<<<<<< HEAD
        rows={clients}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
=======
        rows={data}
        disableSelectionOnClick
        columns={columns}
>>>>>>> 47c2748e4b75f9b4bdb8cb3cc8c5bdc0eb9da1d0
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
