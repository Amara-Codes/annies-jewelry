const { default: axios } = require("axios");

import { encrypt, setCookies, logout, getSession } from "./lib";

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;
const baseURL = `http://localhost:1337/api`;
//const baseURL = `https://${process.env.NEXT_PUBLIC_STRAPI_URL}/api`;

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${"caa32a7552a96e2a1766f451786d6c64d70c0fbe3fdc09942bf0a0c0fbc66088d2918bcc0ba06c2d1e4fb99730f2578e7f5e8cafe249a8bcc02a6433a7623c990f785c3baaf3d9e4ce9082136ac7460795ba99deb523357dcbdd3ea4049edffd297afbe207235b6bdb5a4c2ba703cec3a1e405853d68b2a0ac0a246e7de5673d"}`,
  },
});

const login = async (data) => {
  try {
    const response = await axiosClient.post("/auth/local", data);
    // console.log(response);

    const { jwt } = response.data;

    const user = await getCurrentUser(jwt);

    console.log("USER AFTER LOGGIN IN : ", user);

    //   {
    //     "success": true,
    //     "data": {
    //         "id": 13,
    //         "username": "mehto",
    //         "email": "mehto@gmail.com",
    //         "provider": "local",
    //         "confirmed": true,
    //         "blocked": false,
    //         "createdAt": "2024-12-22T15:22:10.993Z",
    //         "updatedAt": "2024-12-22T15:22:10.993Z"
    //     }
    // }

    const { username, email } = user;

    const { identifier } = data;
    const expires = new Date(Date.now() + 10 * 60 * 1000); //10 minutes
    const session = await encrypt({ jwt, user, expires });

    // console.log("SESSION VALUE FROM GLOBAL-API : ", session);

    await setCookies(session, expires);

    return { success: true, data: response.data };
  } catch (errorRes) {
    console.log(
      "An error occurred during login:",
      errorRes.response.data.error.message
    );
    return {
      success: false,
      error:
        errorRes.response.data.error.message ||
        "Oops! Some error occured in logging in.",
    };
  }
};

const logoutAPI = async () => {
  try {
    // Clear session cookies or tokens
    await logout();
    return { success: true };
  } catch (error) {
    console.log("An error occurred during logout:", error);
    return { success: false, error: "Failed to logout. Please try again." };
  }
};

const signup = async (data) => {
  try {
    const res = await axiosClient.post("/auth/local/register", data);

    let newuser = { data: {} };
    const { jwt, user } = res.data;
    newuser.data = user;

    console.log("USER AFTER SIGNING IN : ", newuser);

  //   {
  //     "data": {
  //         "username": "you",
  //         "email": "you@gmail.com",
  //         "password": "111111111"
  //     }
  // }

    const expires = new Date(Date.now() + 10 * 60 * 1000); //10 minutes
    const session = await encrypt({ jwt, user, expires });

    await setCookies(session, expires);

    return { success: true, data: res.data };
  } catch (errorRes) {
    console.log(
      "An error occurred during login:",
      errorRes.response.data.error.message
    );
    return {
      success: false,
      error:
        errorRes.response.data.error.message || "Oops! Some error occured.",
    };
  }
};

const getCurrentUser = async (jwt) => {
  try {
    const res = await axios.get(`${baseURL}/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return { success: true, data: res.data };
  } catch (error) {
    console.error("Error fetching the current user", error);
    return {
      success: false,
      error: `Error fetching the current user ${error.error.message}`,
    };
  }
};

const getCategory = () => axiosClient.get("/categories?populate=*");

const getDoctorList = () => axiosClient.get("/doctors?populate=*");

const getDoctorByCategory = (category) =>
  axiosClient.get(
    "/doctors?filters[categories][name][$in]=" + category + "&populate=*"
  );

const getDoctorById = (id) => axiosClient.get("/doctors/" + id + "?populate=*");

const bookAppointment = (data) => axiosClient.post("appointments", data);

const getUserBookingList = (userEmail) =>
  axiosClient.get(
    "/appointments?[filters][Email][$eq]=" +
      userEmail +
      "&populate[doctor][populate][image][populate][0]=url&populate=*"
  );

const deleteBooking = (id) => axiosClient.delete("/appointments/" + id);

const api = {
  login,
  logoutAPI,
  signup,
  getCategory,
  getDoctorList,
  getDoctorByCategory,
  getDoctorById,
  bookAppointment,
  getUserBookingList,
  deleteBooking,
};

export default api;
