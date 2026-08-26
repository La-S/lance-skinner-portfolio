"use client";

import { makePage } from "@keystatic/next/ui/app";
import config from "../../keystatic.config";

// The Keystatic admin app (client-rendered). Mounted by the layout below so it
// owns the whole /keystatic route.
export default makePage(config);
