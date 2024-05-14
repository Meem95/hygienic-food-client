
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet";
import axios from "axios";
import MyRequestlist from "./MyRequestlist";

const Request = () => {
    const { user } =  useContext(AuthContext) || {};
  const [item, setItem] = useState([]);
  console.log("requested user",user);
  const url = `http://localhost:5000/myReqFood/${user?.email}`;
  useEffect(() => {
    axios.get(url, {withCredentials: true})
    .then(res => {
      setItem(res.data);
    })
   
  }, [url]);
    
  return (
    
    <div className="min-h-screen max-w-7xl mx-auto text-black my-10 shadow-2xl p-5">
<Helmet>
    <title>  H-food  | My Request list</title>
  </Helmet>
      <div className="overflow-x-auto">
      {
        !user? <p>no data found</p>
        :
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Donar Name</th>
              <th>Pickup Location</th>
              <th>Expired Date</th>
              <th> Request Date </th>
            </tr>
          </thead>
          <tbody>
            {
                item.map((list , index)=> <MyRequestlist
            key={list._id}
            list={list}
            listData={setItem}
            item={item}
            
            index={index + 1}
            ></MyRequestlist>)
        }
           
           
          </tbody>
        </table>
      }
        
      </div>
    </div>
  );
};
export default Request;