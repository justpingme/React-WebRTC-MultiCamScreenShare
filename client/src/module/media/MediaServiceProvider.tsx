import React, { ReactNode, useMemo } from "react";
import { MediaServiceContext } from "./MediaServiceContext";
import { useMediaService } from "./hooks/useMediaService";

const MediaServiceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const mediaService = useMediaService();

  const memoizedMediaService = useMemo(() => mediaService, [mediaService]);

  return (
    <MediaServiceContext.Provider value={memoizedMediaService}>
      {children}
    </MediaServiceContext.Provider>
  );
};

export default MediaServiceProvider;
