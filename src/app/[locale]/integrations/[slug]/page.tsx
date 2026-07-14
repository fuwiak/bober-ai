import { createLandingPageHandlers } from "@/lib/landing-page-handlers";

const handlers = createLandingPageHandlers("integrations");

export const generateStaticParams = handlers.generateStaticParams;
export const generateMetadata = handlers.generateMetadata;
export default handlers.default;
