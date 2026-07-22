import { spawn } from "node:child_process";
import { platform } from "node:os";

export function openUrl(url) {
  const p = platform();
  let cmd;
  let args;
  if (p === "darwin") {
    cmd = "open";
    args = [url];
  } else if (p === "win32") {
    cmd = "cmd";
    args = ["/c", "start", "", url];
  } else {
    cmd = "xdg-open";
    args = [url];
  }
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "ignore", detached: true });
    child.on("error", reject);
    child.unref();
    resolve();
  });
}

export async function copyToClipboard(text) {
  const p = platform();
  if (p === "darwin") {
    await pipeTo("pbcopy", [], text);
    return true;
  }
  if (p === "linux") {
    try {
      await pipeTo("xclip", ["-selection", "clipboard"], text);
      return true;
    } catch {
      try {
        await pipeTo("wl-copy", [], text);
        return true;
      } catch {
        return false;
      }
    }
  }
  return false;
}

function pipeTo(cmd, args, text) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ["pipe", "ignore", "ignore"] });
    child.on("error", reject);
    child.on("close", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exit ${code}`))));
    child.stdin.write(text);
    child.stdin.end();
  });
}
