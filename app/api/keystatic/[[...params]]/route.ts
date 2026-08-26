import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../keystatic.config";

// Backend for the Keystatic admin: reads/writes content files on the local
// filesystem (local storage mode).
export const { POST, GET } = makeRouteHandler({ config });
