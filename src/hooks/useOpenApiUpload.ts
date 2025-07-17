import { useState } from "react";
import {
  UPLOADTHING_SECRET,
  UPLOADTHING_APP_ID,
  UPLOADTHING_SLUG,
} from "../utils/config";

export const useOpenApiUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File): Promise<string | null> => {
  setIsUploading(true);
  setError(null);
  try {
    const prepRes = await fetch("https://uploadthing.com/api/prepareUpload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Uploadthing-Api-Key": UPLOADTHING_SECRET,
      },
      body: JSON.stringify({
        slug: UPLOADTHING_SLUG,
        files: [{ name: file.name, size: file.size }],
      }),
    });

    const prepJson = await prepRes.json();
    console.log("UploadThing prepare response:", prepJson);

    if (!prepRes.ok || !Array.isArray(prepJson) || !prepJson[0]) {
      throw new Error(prepJson.message || "Failed to get presigned URL");
    }

    const { presignedUrl, fileKey } = prepJson[0];

    await fetch(presignedUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    await fetch("https://uploadthing.com/api/registerUpload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Uploadthing-Api-Key": UPLOADTHING_SECRET,
      },
      body: JSON.stringify({ slug: UPLOADTHING_SLUG, fileKeys: [fileKey] }),
    });

    return `https://${UPLOADTHING_APP_ID}.ufs.sh/f/${fileKey}`;
  } catch (e: any) {
    console.error("Upload failed:", e);
    setError(e.message || "Unknown error");
    return null;
  } finally {
    setIsUploading(false);
  }
};


  return { upload, isUploading, error };
};
