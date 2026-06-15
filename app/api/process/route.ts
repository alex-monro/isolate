import Replicate from "replicate";
import { audioUploadSchema } from "@/lib/validation";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// 6 requests per hour per IP, counted in Redis so the limit survives across
// Vercel's serverless invocations (an in-memory Map would reset and not work).
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(6, "1 h"),
  prefix: "ratelimit:process",
});

export async function POST(request: Request) {
  // x-forwarded-for can be a comma-separated list; the first entry is the client.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const { success, reset } = await ratelimit.limit(ip);
  if (!success) {
    const retryAfterSeconds = Math.max(
      0,
      Math.ceil((reset - Date.now()) / 1000),
    );
    return Response.json(
      { error: "Too many requests. You can process 6 files per hour." },
      { status: 429, headers: { "Retry-After": retryAfterSeconds.toString() } },
    );
  }

  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "REPLICATE_API_TOKEN is missing from environment variables",
    );
  }

  const replicate = new Replicate({ useFileOutput: false });

  try {
    // Grab the form data from the request
    const formData = await request.formData();

    // TypeScript checks your code while you're typing and building. Zod checks your actual data when real users are using the site
    const result = audioUploadSchema.safeParse({
      audio: formData.get("audio"),
    });

    // result.error.issues is an array of all the validation errors Zod found. If someone uploads a non-audio file, Zod puts that error in the array. [0] grabs the first error, and .message gets the text message
    if (!result.success) {
      return Response.json(
        { error: result.error.issues[0].message },
        { status: 400 },
      );
    }

    // Call Replicate with the validated audio file
    const output = await replicate.run(
      "cjwbw/demucs:25a173108cff36ef9f80f854c162d01df9e6528be175794b81158fa03836d953",
      // `result.data.audio` is the validated audio file that came back from Zod.
      { input: { audio: result.data.audio } },
    );

    return Response.json(output);
  } catch (error) {
    // Catch anything Replicate or other code throws
    console.error("Error processing audio:", error);
    return Response.json(
      { error: "Failed to process audio. Please try again." },
      { status: 500 },
    );
  }
}
