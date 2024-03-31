import React from "react";
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
  const onRemoveProfilePicture = async () => {
    const response = await onDelete();
    if (response) {
      router.refresh();
    }
  };
  return (
    <div className="flex flex-col">
      <p className="text-lg text-white">Profile Picture</p>
      <div className="h-[20vh] items-center justify-center">
        {userImage ? (
          <>
            <div className="relative h-full w-2/12">
              <Image src={userImage} alt="user profile" fill />
            </div>
            <Button onClick={onRemoveProfilePicture}>
              <X /> Remove
            </Button>
          </>
        ) : (
          <UploadcareButton />
        )}
      </div>
    </div>
  );
};

export default ProfilePicture;
