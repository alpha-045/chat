import { create } from "zustand";
import { axiosInstanace } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const url =import.meta.env.MODE === 'development' ? 'http://localhost:5001/api' : '/'
export const useAuthStore = create((set, get) => ({
  authUser: null,
  ischeckAuth: false,
  isSigningUp: false,
  isloggingUp: false,
  isUpdatingprofile: false,
  socket: null,
  onlineUser: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstanace.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket();
    } catch (err) {
      console.log("the err : " + err);

      set({ authUser: null });
    } finally {
      set({ ischeckAuth: true });
    }
  },

  signUp: async (data) => {
    try {
      const res = await axiosInstanace.post("/auth/sign_up", data);
      set({ authUser: res.data });
      toast.success("Successfully signup!");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logOut: async () => {
    try {
      await axiosInstanace.post("/auth/logout");
      set({ authUser: null });
      toast.success("Successfully logOut!");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  login: async (data) => {
    try {
      const res = await axiosInstanace.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Successfully login!");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isloggingUp: false });
    }
  },

  profileImg: async (file) => {
    try {
      set({ isUpdatingprofile: true });
      const res = await axiosInstanace.put("/auth/update-profile", file);
      set({ authUser: res.data });
      toast.success("Successfully upload image!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingprofile: false });
    }
  },
  connectSocket: () => {
    const socket = io(url, {
      query: {
        userId: get().authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket });
    socket.on("onlineUsers",(ids)=>{
     set({onlineUser : ids}) 
    })
  },
  disconnectSocket: () => {
    if (get().socket?.connected) return get().socket.disconnect();
  },
}));
