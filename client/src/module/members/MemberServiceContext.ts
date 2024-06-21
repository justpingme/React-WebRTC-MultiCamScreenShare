import { createContext, useContext } from "react";
import { MemberServiceState } from "./types";

export const MemberServiceContext = createContext<MemberServiceState | undefined>(
    undefined
);

export const useMember = (): MemberServiceState => {
    const context = useContext(MemberServiceContext);
    if (context === undefined) {
        throw new Error('useMemberService must be used within a MemberServiceProvider');
    }
    return context;
};