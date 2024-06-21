import { createContext } from "react";
import { MediaServiceState } from "./types";

export const MediaServiceContext = createContext<MediaServiceState | undefined>(
  undefined
);

