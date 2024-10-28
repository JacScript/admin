import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
=======
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ProductList() {
  const [data, setData] = useState(productRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
>>>>>>> 47c2748e4b75f9b4bdb8cb3cc8c5bdc0eb9da1d0
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
<<<<<<< HEAD
            {params.row.title}
=======
            {params.row.name}
>>>>>>> 47c2748e4b75f9b4bdb8cb3cc8c5bdc0eb9da1d0
          </div>
        );
      },
    },
<<<<<<< HEAD
    { field: "inStock", headerName: "Stock", width: 200 },
=======
    { field: "stock", headerName: "Stock", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
>>>>>>> 47c2748e4b75f9b4bdb8cb3cc8c5bdc0eb9da1d0
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
<<<<<<< HEAD
            <Link to={"/product/" + params.row._id}>
=======
            <Link to={"/product/" + params.row.id}>
>>>>>>> 47c2748e4b75f9b4bdb8cb3cc8c5bdc0eb9da1d0
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
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
    <div className="productList">
      <DataGrid
<<<<<<< HEAD
        rows={products}
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 47c2748e4b75f9b4bdb8cb3cc8c5bdc0eb9da1d0
