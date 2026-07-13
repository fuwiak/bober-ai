import { spawnSync } from "node:child_process";

export function setRailwayVariables(pairs, { service } = {}) {
  const args = ["variables"];
  if (service) args.push("--service", service);

  for (const [key, value] of Object.entries(pairs)) {
    if (value === undefined || value === null || value === "") continue;
    args.push("--set", `${key}=${value}`);
  }

  const result = spawnSync("railway", args, { encoding: "utf8" });
  if (result.status !== 0) {
    const message = result.stdout || result.stderr || "railway CLI failed";
    throw new Error(message.trim());
  }

  return true;
}
