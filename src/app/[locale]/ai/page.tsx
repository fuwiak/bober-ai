import { createHubPageHandlers } from "@/lib/hub-page-handlers";

const handlers = createHubPageHandlers("ai");
export const generateMetadata = handlers.generateMetadata;
export default handlers.default;
