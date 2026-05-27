import { z } from "zod";

// Define what shape of data we're expecting
export const audioUploadSchema = z.object({
  // We're expecting a property called "audio"
  audio: z
    .instanceof(File, { message: "Audio file is required" })
    // Check that it's actually a File object, not just text
    .refine(
      (file) => file.type.startsWith("audio/"),
      // Extra check: make sure the file type starts with "audio/"
      "File must be an audio file",
      // If it fails, show this error message
    )
    .refine(
      (file) => file.size < 50 * 1024 * 1024,
      "File must be smaller than 50 MB",
    )
    .refine(
      (file) => ["audio/mpeg", "audio/wav", "audio/flac"].includes(file.type),
      "Only MP3, WAV, and FLAC files are allowed",
    ),
});
