export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  try {
    const { startNewsScheduler } = await import("./lib/news-scheduler");
    startNewsScheduler();
  } catch (error) {
    console.error("[instrumentation] failed to start news scheduler", error);
  }
}
