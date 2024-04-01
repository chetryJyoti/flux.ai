"use client";
import React, { useState } from "react";
import UploadcareButton from "./uploadcare-button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

type Props = {
  userImage: string | null;
  onDelete?: any;
  onUpload?: any;
};

const ProfilePicture = ({ userImage, onDelete, onUpload }: Props) => {
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const onRemoveProfilePicture = async () => {
    setLoader(true);
    const response = await onDelete();
    if (response) {
      setLoader(false);
      router.refresh();
    }
  };
  return (
    <div className="flex flex-col">
      <p className="text-lg text-white">Profile Picture</p>
      <div className="flex h-[36vh] mt-2 flex-col items-center justify-center border bottom-1 rounded">
        {userImage ? (
          <>
            <div className="relative h-60 w-60 mb-2 ">
              <Image src={userImage} alt="user profile" fill />
            </div>
            <Button onClick={onRemoveProfilePicture}>
              {loader ? (
                "Removing..."
              ) : (
                <>
                  <X /> Remove
                </>
              )}
            </Button>
          </>
        ) : (
          <UploadcareButton onUpload={onUpload} />
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
