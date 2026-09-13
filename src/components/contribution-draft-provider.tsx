"use client";
import { createContext, useContext, useState, type Dispatch, type SetStateAction, type ReactNode } from "react";
export interface ContributionDraft { type:string; title:string; description:string; period:string; location:string; source:string; name:string; email:string; phone:string; notes:string; faith:boolean; permission:boolean; }
const initial: ContributionDraft={type:"",title:"",description:"",period:"",location:"",source:"",name:"",email:"",phone:"",notes:"",faith:false,permission:false};
const DraftContext=createContext<{draft:ContributionDraft;setDraft:Dispatch<SetStateAction<ContributionDraft>>}|null>(null);
// Memory only: never persist personal information or send a network request.
export function ContributionDraftProvider({children}:{children:ReactNode}){
 const [draft,setDraft]=useState(initial);
 return <DraftContext.Provider value={{draft,setDraft}}>{children}</DraftContext.Provider>;
}
export function useContributionDraft(){const value=useContext(DraftContext);if(!value)throw new Error("ContributionDraftProvider is required");return value;}
