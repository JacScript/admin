import { Link, useLocation, useHistory } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase.js";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const location = useLocation();
  const history = useHistory()
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleSize = (e) => {
    setInputs((prev) => ({
      ...prev,
      size: e.target.value.split(","),
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              console.log("Unhandled snapshot state: ", snapshot.state);
          }
        },
        (error) => {
          console.error("Upload failed: ", error);
          alert("File upload failed, please try again.");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const  updatedProduct = {
              ...inputs,
              img: downloadURL, // New image URL from the upload
              categories: cat.length > 0 ? cat : product.categories, // Use categories if updated
            };

            updateProduct(productId,  updatedProduct, dispatch)
              .then(() => {
                // console.log("Product updated successfully");
                // alert("Product updated successfully!");
                // console.log(updatedProduct)
                history.push("/products")
              })
              .catch((updateError) => {
                // console.error("Product update failed: ", updateError);
      console.error("Product update failed, please try again.");
              });
          });
        }
      );
    } else {
      const  updatedProduct = {
        ...inputs,
        img: product.img, // Use the original image URL
        categories: cat.length > 0 ? cat : product.categories, // Use updated or existing categories
      };

      updateProduct(productId, updatedProduct, dispatch)
        .then(() => {
        //   console.log("Product updated successfully with original image");
        //   console.log(updatedProduct)
        //   alert("Product updated successfully with original image!");
        history.push("/products")
        })
        .catch((updateError) => {
        //   console.error("Product update failed: ", updateError);
          console.error("Product update failed, please try again.");
        });
    }
  };

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => a._id - b._id);
        list.forEach((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

//    console.log(product)
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              name="title"
              placeholder={product.title}
              onChange={handleChange}
            />
            <label>Product Description</label>
            <input
              type="text"
              name="desc"
              placeholder={product.desc}
              onChange={handleChange}
            />
            <label>Price</label>
            <input
              type="number"
              name="price"
              placeholder={product.price}
              onChange={handleChange}
            />
            <label>Category</label>
            <input
              type="text"
              placeholder={product.categories}
              onChange={handleCat}
            />
            <label>Size</label>
            <input
              type="text"
              placeholder={product.size}
              onChange={handleSize}
            />
            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label htmlFor="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button onClick={handleClick} className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}












































// import { Link, useLocation } from "react-router-dom";
// import "./product.css";
// import Chart from "../../components/chart/Chart";
// import { Publish } from "@material-ui/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useMemo, useState } from "react";
// import { userRequest } from "../../requestMethods";
// import {
//     getStorage,
//     ref,
//     uploadBytesResumable,
//     getDownloadURL,
//   } from "firebase/storage";
// import app from "../../firebase.js";
// import { updateProduct } from "../../redux/apiCalls";





// export default function Product() {
//   const location = useLocation();
//   const productId = location.pathname.split("/")[2];
//   const [pStats, setPStats] = useState([]);
//   const [inputs, setInputs] = useState({});
//   const [file, setFile] = useState(null);
//   const [cat, setCat] = useState([]);
//   const dispatch = useDispatch();
  
//   const product = useSelector((state) =>
//     state.product.products.find((product) => product._id === productId)
//   );


//   const handleChange = (e) => {
//     setInputs((prev) => {
//         return { ...prev, [e.target.name]: e.target.value};
//     });
//   }

//   const handleCat = (e) => {
//     setCat(e.target.value.split(","));
//   };

//   const handleSize = (e) => {
//     setInputs((prev) => ({
//       ...prev,
//       size: e.target.value.split(","),
//     }));
//   }; 


//   const handleClick = (e) => {
//     e.preventDefault();
  
//     if (file) {
//       // If a new file is selected, proceed with the upload process
//       const fileName = new Date().getTime() + file.name;
//       const storage = getStorage(app);
//       const storageRef = ref(storage, fileName);
//       const uploadTask = uploadBytesResumable(storageRef, file);
  
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           // Get task progress
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log("Upload is " + progress + "% done");
  
//           switch (snapshot.state) {
//             case "paused":
//               console.log("Upload is paused");
//               break;
//             case "running":
//               console.log("Upload is running");
//               break;
//             default:
//               console.log("Unhandled snapshot state: ", snapshot.state);
//           }
//         },
//         (error) => {
//           // Handle unsuccessful uploads
//           console.error("Upload failed: ", error);
//           alert("File upload failed, please try again.");
//         },
//         () => {
//           // Handle successful uploads on complete
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             const updateProduct = {
//               ...inputs,
//               img: downloadURL ,// New image URL from the upload
//               categories: cat.length > 0 ? cat : product.categories, // Use categories if updated
//             };
  
//             // Call updateProduct function to update the product with the new image
//             updateProduct(productId, product, dispatch)
//               .then(() => {
//                 console.log("Product updated successfully");
//                 alert("Product updated successfully!");
//               })
//               .catch((updateError) => {
//                 console.error("Product update failed: ", updateError);
//                 alert("Product update failed, please try again.");
//               });
//           });
//         }
//       );
//     } else {
//       // If no file is selected, update the product with the existing image
//       const updatedProduct = {
//         ...inputs,
//         img: product.img, // Use the original image URL
//         categories: cat.length > 0 ? cat : product.categories, // Use categories if updated
//       };
  
//       // Call updateProduct function to update the product without uploading a new image
//       updateProduct(productId, updatedProduct, dispatch)
//         .then(() => {
//           console.log("Product updated successfully with original image");
//           alert("Product updated successfully with original image!");
//         })
//         .catch((updateError) => {
//           console.error("Product update failed: ", updateError);
//           alert("Product update failed, please try again.");
//         });
//     }
//   };
  


//   const MONTHS = useMemo(
//     () => [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Agu",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//     []
//   );

//   useEffect(() => {
//     const getStats = async () => {
//       try {
//         const res = await userRequest.get("orders/income?pid=" + productId);
//         const list = res.data.sort((a,b)=>{
//             return a._id - b._id
//         })
//         list.map((item) =>
//           setPStats((prev) => [
//             ...prev,
//             { name: MONTHS[item._id - 1], Sales: item.total },
//           ])
//         );
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getStats();
//   }, [productId, MONTHS]);



//   return (
//     <div className="product">
//       <div className="productTitleContainer">
//         <h1 className="productTitle">Product</h1>
//         <Link to="/newproduct">
//           <button className="productAddButton">Create</button>
//         </Link>
//       </div>
//       <div className="productTop">
//         <div className="productTopLeft">
//           <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
//         </div>
//         <div className="productTopRight">
//           <div className="productInfoTop">
//             <img src={product.img} alt="" className="productInfoImg" />
//             <span className="productName">{product.title}</span>
//           </div>
//           <div className="productInfoBottom">
//             <div className="productInfoItem">
//               <span className="productInfoKey">id:</span>
//               <span className="productInfoValue">{product._id}</span>
//             </div>
//             <div className="productInfoItem">
//               <span className="productInfoKey">sales:</span>
//               <span className="productInfoValue">5123</span>
//             </div>
//             <div className="productInfoItem">
//               <span className="productInfoKey">in stock:</span>
//               <span className="productInfoValue">{product.inStock}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="productBottom">
//         <form className="productForm">
//           <div className="productFormLeft">
//             <label>Product Name</label>
//             <input type="text" placeholder={product.title} onChange={handleChange} />
//             <label>Product Description</label>
//             <input type="text" placeholder={product.desc}  onChange={handleChange}/>
//             <label>Price</label>
//             <input type="text" placeholder={product.price} onChange={handleChange}/>
//             <label>Catagory</label>
//             <input type="text" placeholder={product.categories} onChange={handleCat}/>
//             <label>Size</label>
//             <input type="text" placeholder={product.size}  onChange={handleSize}/>
//             <label>In Stock</label>
//             <select name="inStock" id="idStock">
//               <option value="true">Yes</option>
//               <option value="false">No</option>
//             </select>
//           </div>
//           <div className="productFormRight">
//             <div className="productUpload">
//               <img src={product.img} alt="" className="productUploadImg" />
//               <label for="file">
//                 <Publish />
//               </label>
//               <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
//             </div>
//             <button onClick={handleClick}  className="productButton">Update</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
