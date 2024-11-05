import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase.js";
import { addClient } from "../../redux/apiCalls.js";

import "./newUser.css";

export default function NewUser() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userDetails, setUserDetails] = useState({
    address: {
      city: "",
      country: "",
    },
  });
  const [file, setFile] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState("");

const handleDateChange = (e) => setDateOfBirth(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevUser) => ({
      ...prevUser,
      address: {
        ...prevUser.address,
        [name]: value,
      },
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!file) return;

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
        }
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const client = {
            username,
            email,
            password,
            phoneNumber,
            dateOfBirth,
            city: userDetails.address.city,
            country: userDetails.address.country,
            img: downloadURL,
          };
          addClient(client, dispatch);
          // console.log(client);
          history.push("/users");
        });
      }
    );
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm" onSubmit={handleClick}>
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" value={username} onChange={handleUsernameChange} placeholder="john" />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input type="email" value={email} onChange={handleEmailChange} placeholder="john@gmail.com" />
        </div>
        <div className="newUserItem">
           <label>Password</label>
           <input type="password" placeholder="password"
           onChange={handlePasswordChange}
           />
        </div>
        <div className="newUserItem">
  <label>Date Of Birth</label>
  <input
    type="date"
    value={dateOfBirth}
    onChange={handleDateChange}
  />
</div>

        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="+1 123 456 78" />
        </div>
        <div className="newUserItem">
          <label>City</label>
          <input type="text" name="city" value={userDetails.address.city} onChange={handleAddressChange} placeholder="New York" />
        </div>
        <div className="newUserItem">
          <label>Country</label>
          <input type="text" name="country" value={userDetails.address.country} onChange={handleAddressChange} placeholder="USA" />
        </div>
        <div className="newUserItem">
          <label>Profile Picture</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <button type="submit" className="newUserButton">Create</button>
      </form>
    </div>
  );
}






















































// import { useSelector, useDispatch } from "react-redux";
// import { useHistory, useLocation } from "react-router-dom";
// import { useState } from "react";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import app from "../../firebase.js";
// import { addClient } from "../../redux/apiCalls.js";


// import "./newUser.css";

// export default function NewUser() {
//   // const location = useLocation();
//   const history = useHistory();
//   const dispatch = useDispatch();
//   // const clientId = location.pathname.split("/")[2];
//   // const client = useSelector((state) =>
//   //   state.client.clients.find((client) => client._id === clientId)
//   // );

//   const [username, setUsername] = useState(client.username || "");
//   const [email, setEmail] = useState(client.email || "");
//   const [phoneNumber, setPhoneNumber] = useState(client.phoneNumber || "");
//   const [userDetails, setUserDetails] = useState({
//     address: {
//       city: client.address?.city || "",
//       country: client.address?.country || ""
//     },
//   });
//   const [file, setFile] = useState(null);

//   const handleUsernameChange = (e) => setUsername(e.target.value);
//   const handleEmailChange = (e) => setEmail(e.target.value);
//   const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prevUser) => ({
//       ...prevUser,
//       address: {
//         ...prevUser.address,
//         [name]: value,
//       },
//     }));
//   };

//   const handleClick = (e) => {
//     e.preventDefault();
//     const fileName = new Date().getTime() + file.name;
//     const storage = getStorage(app);
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     // Register three observers:
//     // 1. 'state_changed' observer, called any time the state changes
//     // 2. Error observer, called on failure
//     // 3. Completion observer, called on successful completion
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         // Observe state change events such as progress, pause, and resume
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
//         }
//       },
//       (error) => {
//         // Handle unsuccessful uploads
//       },
//       () => {
//         // Handle successful uploads on complete
//         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           const client = { ...inputs, img: downloadURL, categories: cat };
//           addClient(product, dispatch);
//         });
//       }
//     );
//   };


 
//   return (
//     <div className="newUser">
//       <h1 className="newUserTitle">New User</h1>
//       <form className="newUserForm">
//         <div className="newUserItem">
//           <label>Username</label>
//           <input type="text" placeholder="john" />
//         </div>
//         <div className="newUserItem">
//           <label>Full Name</label>
//           <input type="text" placeholder="John Smith" />
//         </div>
//         <div className="newUserItem">
//           <label>Email</label>
//           <input type="email" placeholder="john@gmail.com" />
//         </div>
//         <div className="newUserItem">
//           <label>Password</label>
//           <input type="password" placeholder="password" />
//         </div>
//         <div className="newUserItem">
//           <label>Phone</label>
//           <input type="text" placeholder="+1 123 456 78" />
//         </div>
//         <div className="newUserItem">
//           <label>Address</label>
//           <input type="text" placeholder="New York | USA" />
//         </div>
//         <div className="newUserItem">
//           <label>Gender</label>
//           <div className="newUserGender">
//             <input type="radio" name="gender" id="male" value="male" />
//             <label for="male">Male</label>
//             <input type="radio" name="gender" id="female" value="female" />
//             <label for="female">Female</label>
//             <input type="radio" name="gender" id="other" value="other" />
//             <label for="other">Other</label>
//           </div>
//         </div>
//         <div className="newUserItem">
//           <label>Active</label>
//           <select className="newUserSelect" name="active" id="active">
//             <option value="yes">Yes</option>
//             <option value="no">No</option>
//           </select>
//         </div>
//         <button className="newUserButton">Create</button>
//       </form>
//     </div>
//   );
// }
