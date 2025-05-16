import { prisma } from "@/prisma/client"
import IssueSummary from "./IssueSummary"
import IssueChart from "./IssueChart"
import LatestIssues from "./LatestIssues"
import { Metadata } from "next"

export default async function Home() {
    const open = await prisma.issue.count({ where: { status: "OPEN" } })
    const inProgress = await prisma.issue.count({ where: { status: "IN_PROGRESS" } })
    const closed = await prisma.issue.count({ where: { status: "CLOSED" } })

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-5">
                <IssueSummary open={open} inProgress={inProgress} closed={closed} />
                <IssueChart open={open} inProgress={inProgress} closed={closed} />
            </div>

            <div>
                <LatestIssues />
            </div>
        </div>
    )
}

export const metadata: Metadata = {
    title: "Issue Tracker - Dashboard",
    description: "View a summary of project issues"
}