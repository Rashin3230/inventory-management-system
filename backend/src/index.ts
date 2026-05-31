import app from "@/app";
import { env } from "@/lib/env";

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Backend API running at http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
