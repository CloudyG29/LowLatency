const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://qhlfrgwaxzrqxsadicgi.supabase.co",
  "sb_secretnx07Y7euLrDJMT-L2-COJw_riUxrpS7",
);

const BUCKET = "cvs";

async function uploadCV(buffer, mimetype, userId, applicationId) {
  const filePath = `user_${userId}/application_${applicationId}.pdf`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, buffer, {
      contentType: mimetype,
      upsert: true, // replaces if they re-upload
    });

  if (error) throw new Error("Supabase upload failed: " + error.message);

  return filePath;
}

async function getCVUrl(filePath) {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(filePath, 60 * 60); // URL valid for 1 hour

  if (error) throw new Error("Could not generate CV URL: " + error.message);

  return data.signedUrl;
}

async function deleteCV(filePath) {
  const { error } = await supabase.storage.from(BUCKET).remove([filePath]);

  if (error) throw new Error("Could not delete CV: " + error.message);
}

module.exports = { uploadCV, getCVUrl, deleteCV };
