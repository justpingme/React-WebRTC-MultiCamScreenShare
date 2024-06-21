import React, { ReactNode, useMemo } from "react";
import { useMemberHooks } from "./hooks/useMemberHooks";
import { MemberServiceContext } from "./MemberServiceContext";

export const MemberServiceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const memberService = useMemberHooks();
  const memoizedContextValue = useMemo(() => memberService, [memberService]);

  return (
    <MemberServiceContext.Provider value={memoizedContextValue}>
      {children}
    </MemberServiceContext.Provider>
  );
};
