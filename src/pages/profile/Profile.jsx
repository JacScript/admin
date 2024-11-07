import React from "react";
import "./profile.css";
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../redux/apiCalls";
import { persistor } from "../../redux/store"

const Profile = () => {
    const admin = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutHandler = async (e) => {
        e.preventDefault();
      
        try {
          // Trigger the logout API call
          await logout(dispatch);
      
          // Clear the persisted state from redux-persist
          await persistor.purge(); // Clears the persisted Redux state
          await persistor.flush(); // Ensures all changes are written to storage
      
          // Clear access token or any other user-specific data from local storage
           await localStorage.removeItem("accessToken");
      
          // Redirect to the home page after successful logout
          history.push("/");
        } catch (err) {
          console.error("Logout failed:", err);
        }
      };
     
  return (
    <div className="profile">
      <div className="wrapper">
        <div className="titleContainer">
          <h1 className="userTitle">Profile</h1>
          <button
            onClick={logoutHandler}
          >
            Log Out
          </button>
        </div>
        <div className="updateContainer">
          <span>Edit</span>
           <form className="form">
            <div className="updateLeft">


            <div className="updateItem">
           <label>Username</label>
                <input
                  type="text"
                  value={admin.username}
                  name="username"
                  readOnly
                />
                </div>

                <div className="updateItem">
                <label>Phone</label>
                <input
                  type="text"
                  value={admin.phoneNumber}
                  name="phoneNumber"
                  readOnly
                />
              </div>
              <div className="updateItem">
                <label>City</label>
                <input
                  type="text"
                  value={admin.address.city || ""}
                  name="city"
                  readOnly
                />
              </div>
              <div className="updateItem">
                <label>Country</label>
                <input
                  type="text"
                  value={admin.address.country}
                  name="country"
                  readOnly
                />
              </div>
            </div>
            <div className="updateRight">
            {/* <UpdateRight> */}
              <div className="upload">
                <img className="image" 
                src={admin.img} 
                alt="User" />
                <label htmlFor="file">
                  <Publish />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="updateButton" disabled>Update</button>
            {/* </UpdateRight> */}
            </div>


           </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
