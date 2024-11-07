import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);



  useEffect(() => {
    const getUsers = async () => {
      try {
        // Send a GET request to fetch new users
        const res = await userRequest.get("/users?new=true");
        setUsers(res.data); // Update the state with the fetched users
      } catch (error) {
        console.error("Error fetching users:", error);
        if (error.response && error.response.status === 403) {
          // Additional handling if the request is forbidden
          // alert("Access denied. You are not authorized to view this content.");
          console.log("Access denied. You are not authorized to view this content.");
        }
      }
    };
  
    getUsers(); // Call the function to execute the request
  }, []);


  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListItem" key={user._id}>
            <img
              src={
                user.img ||
                "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}