import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Keep feed + /tel outside i18n middleware so Yandex crawlers get a clean 200.
  matcher: [
    "/((?!api|_next|_vercel|tel|performers-feed\\.yml|privacy-policy|consent|terms|info|blog|career|events|academy|news|outages|.*\\..*).*)",
  ],
};
