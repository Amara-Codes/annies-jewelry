"use client";
import DoctorList from "@/app/_components/DoctorList";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";

function Search({ params }) {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    // console.log(params.cname);
    const getDoctors = () => {
      GlobalApi.getDoctorByCategory(decodeURIComponent(params.cname)).then((resp) => {
        // console.log("All ", decodeURIComponent(params.cname), " = ", resp.data.data);
        setDoctorList(resp.data.data);
      });
    };
    getDoctors();
  }, [params.cname]);
  
  return (
    <div className="mt-5">
      <DoctorList heading={decodeURIComponent(params.cname)} doctorList={doctorList} />
    </div>
  );
}

export default Search;
