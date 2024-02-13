import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div>
        <Link to={"/data"}>
          <button>User Data</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
