// src/services/storageService.js
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);

const BUCKET = "cvs";

async function uploadCV(fileBuffer, mimeType, userId, applicationId) {
  const extension =
    mimeType === "application/pdf"
      ? "pdf"
      : mimeType === "application/msword"
        ? "doc"
        : "docx";

  const filePath = `${userId}/${applicationId}/cv.${extension}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, fileBuffer, {
      contentType: mimeType,
      upsert: true, // replaces existing file if user re-uploads
    });

  if (error) throw error;

  return filePath; // save this in your DB
}

async function getCVUrl(filePath, expirySeconds = 3600) {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(filePath, expirySeconds); // URL expires after 1 hour

  if (error) throw error;
  return data.signedUrl;
}

async function deleteCV(filePath) {
  const { error } = await supabase.storage.from(BUCKET).remove([filePath]);

  if (error) throw error;
}

module.exports = { uploadCV, getCVUrl, deleteCV };
