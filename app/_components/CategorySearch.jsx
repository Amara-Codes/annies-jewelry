"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";

const CategorySearch = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getCategoryList = () => {
      GlobalApi.getCategory().then((resp) => {
        // console.log(resp.data.data);
        setCategoryList(resp.data.data);
      });
    };
    getCategoryList();
  }, []);

  

  return (
    <div className="mb-10 items-center flex flex-col gap-4">
      <h2 className="font-bold text-4xl tracking-wide text-center">
        Search
        <span className="text-primary"> Doctors</span>
      </h2>
      <h2 className="text-gray-500 text-xl  sm:px-6">
        Search your Doctors and Book Appointment in one Click
      </h2>

      <div className="sm:px-6 flex w-full max-w-sm items-center">
        <Input type="text" className="mr-2" placeholder="Search ..."
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
        ></Input>
        <Link href={`/explore/${searchTerm}`}>
          <Button type="submit" >
            <Search />
            Search
          </Button>
        </Link>
      </div>

      {/* Display List of Categories  */}
      <div className='grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6'>

              {categoryList.length>0?
              categoryList.map((item,index)=>index<6&&(

                <Link  key={index} href={'/search/'+item.name} className='flex 
                flex-col text-center items-center
                p-5 bg-blue-50 m-2 rounded-lg cursor-pointer
                gap-2 hover:scale-110 transition-all ease-in-out'>
                  <Image src={item.icon[0]?.formats?.thumbnail?.url}
                  alt='icon'
                  width={40}
                  height={40}/>
                   <label className="text-xs sm:text-sm font-bold capitalize ">
                  {item.name} {JSON.stringify(item)}

                    </label>
                </Link>
              ))
            :
            [1,2,3,4,5,6].map((item,index)=>(
              <div key={index} className=' bg-slate-200 m-2
            w-[130px] h-[120px] rounded-lg animate-pulse'>
              </div>
          ))
          
            }
      </div>
    </div>
  );
};
               

export default CategorySearch;
