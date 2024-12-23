"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "./_components/BookingList";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useSession } from "@/app/sessionValidator";

function MyBooking() {
  let { user } = useSession();
  user = user?.data;

  const [bookingList, setBookingList] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);

  useEffect(() => {
    const getUserBookingList = () => {
      GlobalApi.getUserBookingList(user?.email).then((resp) => {
        setBookingList(resp.data.data);
        setFilteredBookings(filterUserBooking(resp.data.data, "upcoming"));
      });
    };
    user && getUserBookingList();
  }, [user]);

  /**
   * Filters bookings based on type (upcoming or expired)
   * @param {Array} list - List of bookings
   * @param {String} type - Type of booking (upcoming or expired)
   */
  const filterUserBooking = (list, type) => {

    // console.log("list = " , list);

    const result =  list.filter((item) =>
      type === "upcoming"
        ? new Date(item.attributes.Date) >= new Date()
        : new Date(item.attributes.Date) <= new Date()
    );
    // console.log("filtered : " , result); 
    return result;
  };

  const handleTabChange = (type) => {
    setFilteredBookings(filterUserBooking(bookingList, type));
  };

  const updateRecord = () => {
    GlobalApi.getUserBookingList(user?.email).then((resp) => {
      setBookingList(resp.data.data);
      setFilteredBookings(filterUserBooking(resp.data.data, "upcoming"));
    });
  };

  return (
    <div className="px-4 sm:px-10 mt-10">
      <h2 className="font-bold text-2xl">My Booking</h2>
      <Tabs defaultValue="upcoming" className="w-full mt-5">
        <TabsList className="w-full justify-start">
          <TabsTrigger
            value="upcoming"
            onClick={() => handleTabChange("upcoming")}
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="expired"
            onClick={() => handleTabChange("expired")}
          >
            Expired
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <BookingList
            bookingList={filteredBookings}
            updateRecord={updateRecord}
            expired={false}
          />
        </TabsContent>

        <TabsContent value="expired">
          <BookingList
            bookingList={filteredBookings}
            bgGrey={true}
            updateRecord={updateRecord}
            expired={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyBooking;