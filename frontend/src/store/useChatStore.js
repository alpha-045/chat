import { create } from "zustand";
import { axiosInstanace } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import axios from "axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    try {
      set({ isUsersLoading: true });
      const res = await axiosInstanace("/message/users");
      set({ users: res.data });
      toast.success("Successfully loading Users!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async () => {
    try {
      const { selectedUser } = get();

      set({ isMessagesLoading: true });
      const res = await axiosInstanace.get(`/message/${selectedUser}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessages: async (data) => {
    try {
      const { selectedUser, messages } = get();
      const res = await axiosInstanace.post(
        `/message/send/${selectedUser}`,
        data,
      );
      set({ messages: [...messages, res.data] });
      toast.success("Successfully loading messages!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subs: () => {
    // const { selectedUser } = get();

    const socket = useAuthStore.getState().socket;
    socket.on("newmssg", (data) => {
      set({ messages: [...get().messages, data] });
    });
  },
  unsub: () => {
    const socket = useAuthStore.getState().socket;

    socket.off("newmssg");
  },

  setSelected: async (idUser) => {
    set({ selectedUser: idUser });
  },

  
}));
