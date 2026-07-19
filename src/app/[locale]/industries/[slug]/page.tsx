import { createLandingPageHandlers } from "@/lib/landing-page-handlers";

const handlers = createLandingPageHandlers("industries");

export const generateStaticParams = handlers.generateStaticParams;
export const generateMetadata = handlers.generateMetadata;
export default handlers.default;
