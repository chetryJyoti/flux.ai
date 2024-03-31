"use client";
import React, { useRef, useEffect } from "react";
import * as LR from "@uploadcare/blocks";
import { useRouter } from "next/navigation";
type Props = {
  onUpload?: any;
};

LR.registerBlocks(LR);

const UploadcareButton = ({ onUpload }: Props) => {
  const router = useRouter();
  const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null);

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload(e.detail.cdnUrl);
      if (file) {
        router.refresh();
      }
    };
    ctxProviderRef.current.addEventListener(
      "file-upload-success",
      handleUpload
    );
  }, []);
  return (
    <div>
      <lr-config ctx-name="my-uploader" pubkey="a4c603a4ea8c5a42da4c" />
      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src={`${process.env.NEXT_PUBLIC_UPLOAD_CARE_CSS_SRC}${LR.PACKAGE_VERSION}${process.env.NEXT_PUBLIC_UPLOAD_CARE_SRC_PACKAGE}`}
      />
      <lr-upload-ctx-provider ctx-name="my-uploader" ref={ctxProviderRef} />
    </div>
  );
};

export default UploadcareButton;
