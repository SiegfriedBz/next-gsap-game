"use server";

import { list } from "@vercel/blob";

export const getVideoUrl = async (fileName: string) => {
  const { blobs } = await list({
    prefix: fileName,
    limit: 1,
  });
  const blob = blobs[0];

  if (!blob?.url) return null;

  const { url } = blob;

  return url;
};
