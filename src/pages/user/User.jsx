import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase.js";
import { updateClient } from "../../redux/apiCalls.js";
import { toast } from "react-toastify";

export default function User() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const clientId = location.pathname.split("/")[2];
  const client = useSelector((state) =>
    state.client.clients.find((client) => client._id === clientId)
  );

  const [username, setUsername] = useState(client.username || "");
  const [email, setEmail] = useState(client.email || "");
  const [phoneNumber, setPhoneNumber] = useState(client.phoneNumber || "");
  const [user, setUser] = useState({
    address: {
      city: client.address?.city || "",
      country: client.address?.country || ""
    },
  });
  const [file, setFile] = useState(null);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        [name]: value,
      },
    }));
  };

  const handleClick = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Create an object with updated client information from form inputs and user state
    const updatedClient = {
      username,        // new username input
      email,           // new email input
      phoneNumber,     // new phone number input
      city: user.address.city,    // current city from user state
      country: user.address.country,  // current country from user state
      img: client.img, // default image URL, will be replaced if a new file is uploaded
    };

    // Check if a new file is selected for upload
    if (file) {
      // Generate a unique file name based on the current time and file name
      const fileName = new Date().getTime() + file.name;

      // Initialize Firebase storage and create a reference for the file
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      // Start uploading the file using Firebase's upload function
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Monitor the upload process
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Calculate and log the upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          toast.info(`Upload is ${progress}% done`);
        },
        (err) => {
          toast.error(err?.data?.message || err.message || "An error occurred");
        },
        () => {
          // Once upload is complete, get the download URL of the uploaded file
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // Update the img property in updatedClient with the new image URL
            updatedClient.img = downloadURL;

            // Call updateClient to save updated client data in the database
            updateClient(clientId, updatedClient, dispatch)
              .then(() => {
                toast.success("Client updated successfully");
                history.push("/users"); // Redirect to the users page on success
              })
              .catch((updateError) => {
                // Handle any errors that occur during the update process
                toast.error( updateError?.data?.message ||updateError.message || "Client update failed:");
              });
          });
        }
      );
    } else {
      // If no new file is selected, update the client with the existing image
      updateClient(clientId, updatedClient, dispatch)
        .then(() => {
          toast.success("Client updated successfully with original image");
          history.push("/users"); // Redirect to the users page on success
        })
        .catch((updateError) => {
          // Handle any errors that occur during the update process
          toast.error( updateError?.data?.message ||updateError.message || "Client update failed:");
        });
    }
  };


  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={client.img} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{client.username}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{client.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                {new Date(client.dateOfBirth).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">
                {client.phoneNumber.startsWith("+")
                  ? client.phoneNumber
                  : `+${client.phoneNumber}`}
              </span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{client.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">
                {client?.address?.city || ""} | {client?.address?.country || ""}
              </span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  name="username"
                  className="userUpdateInput"
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value={email}
                  name="email"
                  className="userUpdateInput"
                  onChange={handleEmailChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  value={phoneNumber}
                  name="phoneNumber"
                  className="userUpdateInput"
                  onChange={handlePhoneNumberChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>City</label>
                <input
                  type="text"
                  value={user.address.city}
                  name="city"
                  className="userUpdateInput"
                  onChange={handleAddressChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Country</label>
                <input
                  type="text"
                  value={user.address.country}
                  name="country"
                  className="userUpdateInput"
                  onChange={handleAddressChange}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={file ? URL.createObjectURL(file) : client.img}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <button className="userUpdateButton" onClick={handleClick}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

































// import {
//   CalendarToday,
//   LocationSearching,
//   MailOutline,
//   PermIdentity,
//   PhoneAndroid,
//   Publish,
// } from "@material-ui/icons";
// import { Link } from "react-router-dom";
// import "./user.css";
// import { useSelector, useDispatch } from "react-redux";
// import { useHistory, useLocation } from "react-router-dom";
// import { useState } from "react";

// // import { userRequest } from "../../requestMethods";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import app from "../../firebase.js";
// import { updateClient } from "../../redux/apiCalls.js"; 

// export default function User() {
//   const location = useLocation();
//   const history = useHistory()
//   const dispatch = useDispatch();
//   const clientId = location.pathname.split("/")[2];
//   const [username, setUsername] = useState();
//   const [email, setEmail] = useState();
//   const [phoneNumber, setPhoneNumber] = useState();
//   const [address, setAddress] = useState({});
//   const [user, setUser] = useState({
//     address: {
//         city: "",
//         country: ""
//     }
//     // ...other properties
// });
// const [file, setFile] = useState(null);



//   const client = useSelector((state) =>
//     state.client.clients.find((client) => client._id === clientId)
//   );

//   const handleUsernameChange = (e) => {
//     setUsername((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleEmailChange = (e) => {
//     setEmail((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handlePhoneNumberChange = (e) => {
//     setPhoneNumber((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevClient) => ({
//         ...prevClient,
//         address: {
//             ...prevClient.address,
//             [name]: value
//         }
//     }));
// };


// const handleClick = (e) => {
//   e.preventDefault();

//   if (file) {
//     const fileName = new Date().getTime() + file.name;
//     const storage = getStorage(app);
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "% done");

//         switch (snapshot.state) {
//           case "paused":
//             console.log("Upload is paused");
//             break;
//           case "running":
//             console.log("Upload is running");
//             break;
//           default:
//             console.log("Unhandled snapshot state: ", snapshot.state);
//         }
//       },
//       (error) => {
//         console.error("Upload failed: ", error);
//         alert("File upload failed, please try again.");
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           const  updatedClient = {
//             username: username,
//             img: downloadURL, // New image URL from the upload
//           };

//           updateClient(clientId,  updatedClient, dispatch)
//             .then(() => {
//               // console.log("Product updated successfully");
//               // alert("Product updated successfully!");
//               // console.log(updatedProduct)
//               history.push("/users")
//             })
//             .catch((updateError) => {
//               // console.error("Product update failed: ", updateError);
//     console.error("Client update failed, please try again.");
//             });
//         });
//       }
//     );
//   } else {
//     const  updatedClient = {
//       username: username,
//       img: client.img, // Use the original image URL
//     };

//     updateClient(clientId, updatedClient, dispatch)
//       .then(() => {
//       //   console.log("Product updated successfully with original image");
//       //   console.log(updatedProduct)
//       //   alert("Product updated successfully with original image!");
//       console.log(updateClient)
//       // history.push("/users");
//       })
//       .catch((updateError) => {
//       //   console.error("Product update failed: ", updateError);
//         console.error("Client update failed, please try again.");
//       });
//   }
// };

// //  console.log(client)
//   return (
//     <div className="user">
//       <div className="userTitleContainer">
//         <h1 className="userTitle">Edit User</h1>
//         <Link to="/newUser">
//           <button className="userAddButton">Create</button>
//         </Link>
//       </div>
//       <div className="userContainer">
//         <div className="userShow">
//           <div className="userShowTop">
//             <img src={client.img} alt="" className="userShowImg" />
//             <div className="userShowTopTitle">
//               <span className="userShowUsername">{client.username}</span>
//               {/* <span className="userShowUserTitle">Software Engineer</span> */}
//             </div>
//           </div>
//           <div className="userShowBottom">
//             <span className="userShowTitle">Account Details</span>
//             <div className="userShowInfo">
//               <PermIdentity className="userShowIcon" />
//               <span className="userShowInfoTitle">{client.username}</span>
//             </div>
//             <div className="userShowInfo">
//               <CalendarToday className="userShowIcon" />
//               <span className="userShowInfoTitle">
//                 {new Date(client.dateOfBirth).toLocaleDateString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </span>
//             </div>
//             <span className="userShowTitle">Contact Details</span>
//             <div className="userShowInfo">
//               <PhoneAndroid className="userShowIcon" />
//               {/* <span className="userShowInfoTitle">+{client.phoneNumber}</span>
//             </div> */}
//             <span className="userShowInfoTitle">
//     {client.phoneNumber.startsWith('+') ? client.phoneNumber : `+${client.phoneNumber}`}
// </span>
// </div>
//             <div className="userShowInfo">
//               <MailOutline className="userShowIcon" />
//               <span className="userShowInfoTitle">{client.email}</span>
//             </div>
//             <div className="userShowInfo">
//               <LocationSearching className="userShowIcon" />
//               <span className="userShowInfoTitle"> {client.address.city} | {client.address.country}</span>
//             </div>
//           </div>
//         </div>
//         <div className="userUpdate">
//           <span className="userUpdateTitle">Edit</span>
//           <form className="userUpdateForm">
//             <div className="userUpdateLeft">
//               <div className="userUpdateItem">
//                 <label>Username</label>
//                 <input
//                   type="text"
//                   placeholder={client.username}
//                   className="userUpdateInput"
//                   onChange={handleUsernameChange}
//                 />
//               </div>
//               {/* <div className="userUpdateItem">
//                 <label>Full Name</label>
//                 <input
//                   type="text"
//                   placeholder="Anna Becker"
//                   className="userUpdateInput"
//                 />
//               </div> */}
//               <div className="userUpdateItem">
//                 <label>Email</label>
//                 <input
//                   type="text"
//                   placeholder={client.email}
//                   className="userUpdateInput"
//                   onChange={handleEmailChange}
//                 />
//               </div>
//               <div className="userUpdateItem">
//                 <label>Phone</label>
//                 <input
//                   type="text"
//                   placeholder={client.phoneNumber.startsWith('+') ? client.phoneNumber : `+${client.phoneNumber}`}
//                   className="userUpdateInput"
//                   onChange={handlePhoneNumberChange}
//                 />
//               </div>
//               <div className="userUpdateItem">
//                 <label>City</label>
//                 <input
//                   type="text"
//                   placeholder={client.address.city}
//                   className="userUpdateInput"
//                   onChange={handleAddressChange}
//                 />
//               </div>
//               <div className="userUpdateItem">
//                 <label>Country</label>
//                 <input
//                   type="text"
//                   placeholder={client.address.country}
//                   className="userUpdateInput"
//                   // onChange={handleAddressChange}
//                 />
//               </div>
//             </div>
//             <div className="userUpdateRight">
//               <div className="userUpdateUpload">
//                 <img
//                   className="userUpdateImg"
//                   src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
//                   alt=""
//                 />
//                 <label htmlFor="file">
//                   <Publish className="userUpdateIcon" />
//                 </label>
//                 <input type="file" id="file" style={{ display: "none" }} />
//               </div>
//               <button className="userUpdateButton" onClick={handleClick}>Update</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
