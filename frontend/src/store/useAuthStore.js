import { create } from "zustand";
import { axiosInstanace } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5001' : '/'
export const useAuthStore = create((set, get) => ({
  authUser: null,
  ischeckAuth: false,
  isSigningUp: false,
  isloggingUp: false,
  isUpdatingprofile: false,
  socket: null,
  onlineUser: [],
  token:"",
  callId:"",
  apikey:"",

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
    const { authUser, socket } = get();

    
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    set({ socket: newSocket });

    newSocket.on("onlineUsers", (ids) => {
      set({ onlineUser: ids });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) return get().socket.disconnect();
  },
  callf: async() => {

    try{
    const token_room = await axiosInstanace.get("/auth/call");

    const {token,callId,apikey} =token_room.data
      
    set({token:token,callId:callId,apikey:apikey})
      
    }catch(err){
        console.log(err)
    }



  }
}));
