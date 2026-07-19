import { createHubPageHandlers } from "@/lib/hub-page-handlers";

const handlers = createHubPageHandlers("automation");
export const generateMetadata = handlers.generateMetadata;
export default handlers.default;
export const generateStaticParams = handlers.generateStaticParams;
