"use client";
import type {Contribution} from "@/types/community";
import {useLanguage} from "./language-provider";
import {CommunityPage} from "./community-shared";
import {ContributionEditor} from "./contribution-editor";
export function AccountEditorPage({initial}:{initial?:Contribution}){const{copy}=useLanguage();return <CommunityPage title={initial?.title||copy.community.newContribution} intro={copy.community.liveNotice}><ContributionEditor initial={initial}/></CommunityPage>;}
