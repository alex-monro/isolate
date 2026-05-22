import Replicate from "replicate";

// Replicate() grabs my token from .env.local automatically
const replicate = new Replicate({ useFileOutput: false });

export async function POST(request: Request) {
  const formData = await request.formData();

  const audioFile = formData.get("audio");

  if (!(audioFile instanceof File)) {
    return new Response("No file uploaded", { status: 400 });
  }

  const output = await replicate.run(
    "cjwbw/demucs:25a173108cff36ef9f80f854c162d01df9e6528be175794b81158fa03836d953",
    { input: { audio: audioFile } },
  );

  // peek at the raw thing Replicate gives me, forced into plain text
  console.log("RAW OUTPUT:", JSON.stringify(output));

  return Response.json(output);
}
