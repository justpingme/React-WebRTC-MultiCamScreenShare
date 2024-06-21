import { useContext } from "react";
import { MediaServiceContext } from "./MediaServiceContext";
import { MediaServiceState } from "./types";

export const useMediaService = (): MediaServiceState => {
    const context = useContext(MediaServiceContext);
    if (context === undefined) {
        throw new Error('useMediaService must be used within a MediaServiceProvider');
    }
    return context;
};