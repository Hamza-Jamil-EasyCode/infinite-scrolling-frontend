import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getTotalUsers } from "../../utils/statApis";
import { printErrorMessage } from "../helper/helper";

type Props = {};

const Dashboard = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<number>(0);
  const [cars, setCars] = useState<number>(0);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const resp = await getTotalUsers();
      setUsers(resp.data.data);
    } catch (error) {
      toast.error(printErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const renderCard = (title: string, value: number) => (
    <div className="c-dashboardInfo">
      <div className="wrap">
        <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
          {title}
          <svg
            className="MuiSvgIcon-root-19"
            focusable="false"
            viewBox="0 0 24 24"
            aria-hidden="true"
            role="presentation"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
          </svg>
        </h4>
        <span className="hind-font caption-12 c-dashboardInfo__count">
          {value}
        </span>
      </div>
    </div>
  );

  const renderLoader = () => (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );

  return loading ? (
    renderLoader()
  ) : (
    <div className="dashboard">{renderCard("Total Users", users)}</div>
  );
};

export default Dashboard;
