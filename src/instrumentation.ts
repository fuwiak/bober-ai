export async function register(): Promise<void> {
  // Astro Node / Next parity: start AI news digest scheduler in the server process.
  if (typeof process === "undefined") return;
  try {
    const { startNewsScheduler } = await import("./lib/news-scheduler");
    startNewsScheduler();
  } catch (error) {
    console.error("[instrumentation] failed to start news scheduler", error);
  }
}
