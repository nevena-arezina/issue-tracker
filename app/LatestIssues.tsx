import { prisma } from "@/prisma/client"
import { Avatar, Card, Heading, Table } from "@radix-ui/themes"
import { StatusBadge } from "./components"
import Link from "next/link"

const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: {
            assignedToUser: true
        }
    })

    return (
        <Card>
            <Heading size="4" mb="4">Latest issues</Heading>
            <Table.Root>
                <Table.Body>
                    {issues && issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col items-start gap-2">
                                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                        <StatusBadge status={issue.status} />
                                    </div>

                                    {issue.assignedToUser && (
                                        <Avatar src={issue.assignedToUser.image!} fallback="?" size="2" radius="full" />
                                    )}
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}

export default LatestIssues
