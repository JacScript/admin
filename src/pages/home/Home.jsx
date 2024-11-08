import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { toast } from "react-toastify";

export default function Home() {
  const [userStats, setUserStats] = useState([]); // Initialize state to store user statistics

  // Use useMemo to avoid re-creating the MONTHS array on each render
  const MONTHS = useMemo(
    () => [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        // Fetch user statistics from the API
        const res = await userRequest.get("/users/stats");

        // Map over the fetched data and update the state with relevant values
        const stats = res.data.map((item) => ({
          name: MONTHS[item._id - 1], // Assign the month name based on the _id
          "Active User": item.total,  // Assign the total active users
        }));

        setUserStats(stats); // Update state with the processed statistics array
      } catch (err) {
        toast.error(err?.data?.message || err.message || "An error occurred");
      }
    };

    getStats(); // Call the function to fetch statistics

  }, [MONTHS]); // Dependency on MONTHS ensures the effect runs once since MONTHS is memoized

 
  // const [userStats, setUserStats] = useState([]);

  // const MONTHS = useMemo(
  //   () => [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "Jun",
  //     "Jul",
  //     "Agu",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ],
  //   []
  // );

  // useEffect(() => {
  //   const getStats = async () => {
  //     try {
  //       const res = await userRequest.get("/users/stats");
  //       res.data.map((item) =>
  //         setUserStats((prev) => [
  //           ...prev,
  //           { name: MONTHS[item._id - 1], "Active User": item.total },
  //         ])
  //       );
  //     } catch {}
  //   };
  //   getStats();
  // }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}