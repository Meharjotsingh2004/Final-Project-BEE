import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";


const Users = () => {
  return (
<Layout title={"Dashboard - All Users"}>
  <div className="container-fluid m-3 p-3">
    <div className="row">
      <div className="col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-9">
        <h1>Data Analysis</h1>
        <img 
          src="/Chart1.png" 
          alt="Chart Analysis" 
          style={{ width: '50%', height: '50%' }} 
        />
        <img 
          src="/Chart2.png" 
          alt="Chart Analysis" 
          style={{ width: '50%', height: '50%' }} 
        />
        <img 
          src="/Chart3.png" 
          alt="Chart Analysis" 
          style={{ width: '50%', height: '40%' }} 
        />
      </div>
    </div>
  </div>
</Layout>

  );
};

export default Users;