import React, { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Camera,
  Mail,
  User,
  Calendar,
  CheckCircle,
  UserIcon,
} from "lucide-react";
import { Toaster } from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, profileImg,isUpdatingprofile } = useAuthStore();
  const [photoURL, setPhotoURL] = useState(null);
  const fileInputRef = useRef(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imagefile = new FileReader();

    imagefile.readAsDataURL(file);
    imagefile.onload = async () => {
      const baseImg = imagefile.result;
      await profileImg({ profilepic: baseImg });
      setPhotoURL(baseImg);
    };
    console.log("Profile picture updated (frontend preview)");
  };

  const fullName = authUser?.fullname || "Yns el";
  const email = authUser?.email || "ynsel@gmail.com";

  const memberSince = authUser?.createdAt
    ? new Date(authUser.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "January 1, 2023";

  const accountStatus = authUser?.isActive ? "Active" : "Active"; // Default to Active as per design

  return (
    <div className="bg-sky-900 min-h-screen flex justify-center items-center p-4">
      <div>
        <Toaster />
      </div>
      <div className="relative drop-shadow-xl w-full max-w-md overflow-hidden rounded-xl bg-[#3d3c3d] text-white">
        {/* Card inner content */}
        <div className="p-6">
          {/* Profile Header */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Profile</h1>
            <p className="text-gray-300 text-sm">Your profile information</p>
          </div>

          {/* Profile Picture with Camera Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gray-600 flex items-center justify-center overflow-hidden border-2 border-white shadow-md">
               (
                  <img
                    src={authUser.profilepic || photoURL }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon size={48} className="text-gray-300" />
                )
              </div>
              <button
                onClick={handleCameraClick}
                className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5 border-2 border-white hover:bg-blue-600 transition-colors shadow-md"
                aria-label="Update photo"
              >
                <Camera size={16} className="text-white" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                aria-label="Upload new profile photo"
              />
            </div>
           
          </div>
          <p className="text-center">{isUpdatingprofile && 'uploading ...'}</p>

          {/* User Information Sections */}
          <div className="space-y-5">
            {/* Full Name */}
            <div className="flex items-center gap-3 border-b border-gray-500 pb-3">
              <User size={20} className="text-blue-400" />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Full Name
                </p>
                <p className="font-medium text-white">{fullName}</p>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-center gap-3 border-b border-gray-500 pb-3">
              <Mail size={20} className="text-blue-400" />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Email Address
                </p>
                <p className="font-medium text-white">{email}</p>
              </div>
            </div>

            {/* Account Information */}
            <div className="pt-2">
              <p className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wide">
                Account Information
              </p>
              <div className="space-y-3">
                {/* Member Since */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-blue-400" />
                    <span className="text-gray-300 text-sm">Member Since</span>
                  </div>
                  <span className="text-white text-sm font-medium">
                    {memberSince}
                  </span>
                </div>

                {/* Account Status */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-green-400" />
                    <span className="text-gray-300 text-sm">
                      Account Status
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {accountStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Optional subtle footer hint */}
          <p className="text-center text-gray-500 text-xs mt-6">
            Click the camera icon to update your photo
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
