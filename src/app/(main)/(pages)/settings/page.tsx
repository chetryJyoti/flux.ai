import React from "react";
import ProfileForm from "@/components/forms/profile-form";
import ProfilePicture from "./_components/profile-picture";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
type Props = {};

const Settings = async (props: Props) => {
  const authUser = await currentUser();
  if (!authUser) return null;
  const user = await db.user.findUnique({
    where: {
      clerkId: authUser.id,
    },
  });
  const removeProfilePicture = async () => {
    "use server";
    // now we need to set up clerk auth
    const response = await db.user.update({
      where: {
        clerkId: authUser.id,
      },
      data: {
        profilePicture: "",
      },
    });
    return response;
  };

  const uploadProfilePicture = async (profile: string) => {
    "use server";
    const response = await db.user.update({
      where: {
        clerkId: authUser.id,
      },
      data: {
        profilePicture: profile,
      },
    });
    return response;
  };

  const updateUserInfo = async (name: any) => {
    "use server";
    const response = await db.user.update({
      where: {
        clerkId: authUser.id,
      },
      data: {
        name,
      },
    });
    return response;
  };

  return (
    <div className="flex flex-col gap-4 relative">
      <h1 className="text-4xl sticky top-0 z-[10] p-6 bg-background/50 backdrop-blur-lg flex items-center border-b">
        Settings
      </h1>
      <div className="flex flex-col gap-10 p-6">
        <div>
          <h2 className="text-2xl font-bold">User Profile</h2>
          <p className="text-base text-white/50">
            Add or update your information
          </p>
        </div>
        <ProfilePicture
          onDelete={removeProfilePicture}
          userImage={user?.profilePicture || ""}
          onUpload={uploadProfilePicture}
        />
        <ProfileForm user={user} onUpdate={updateUserInfo} />
      </div>
    </div>
  );
};

export default Settings;
