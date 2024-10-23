import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function WidgetSm() {
  const [users, setUsers] = useState([]);



  useEffect(() => {
    // Define the function inside useEffect to get users
    const getUsers = async () => {
      try {
        // Send a GET request to fetch new users
        const res = await userRequest.get("users/?new=true");
        // Update the state with the fetched users
        setUsers(res.data);
      } catch (error) {
        // Handle any errors here (e.g., log them for debugging)
        console.error("Error fetching users:", error);
      }
    };

    // Call the function to execute the request
    getUsers();

    // The empty dependency array means this effect runs only once, when the component mounts
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