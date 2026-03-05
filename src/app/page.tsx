import fs from "fs";
import path from "path";
import MainContent from "./MainContent";

export default function Home() {
  const framesDir = path.join(process.cwd(), "public", "frames");
  let totalFrames = 0;
  let extension = "png";

  try {
    const files = fs.readdirSync(framesDir);
    const frameFiles = files.filter(f => f.startsWith("frame_") && (f.endsWith(".png") || f.endsWith(".jpg") || f.endsWith(".webp")));

    totalFrames = frameFiles.length;

    if (totalFrames > 0) {
      const firstFile = frameFiles.sort()[0];
      extension = firstFile.split(".").pop() || "png";
    }

    console.log(`[Server] Detected ${totalFrames} frames with extension .${extension}`);
  } catch (error) {
    console.error("[Server] Error detecting frames:", error);
  }

  return <MainContent totalFrames={totalFrames} extension={extension} />;
}
