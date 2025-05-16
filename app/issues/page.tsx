import { Link, StatusBadge } from '@/app/components'
import { prisma } from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import IssueActions from './IssueActions'
import { Status } from '@prisma/client'

interface Params {
    searchParams: {
        status: Status
    }
}

const IssuesPage = async ({ searchParams }: Params) => {
    const validStatuses = Object.values(Status)
    const status = validStatuses.includes(searchParams.status) ? searchParams.status : undefined
    const issues = await prisma.issue.findMany({ where: { status } })

    return (
        <div className='cursor-default max-w-7xl'>
            <IssueActions />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell><Link href={`/issues/${issue.id}`}>{issue.title}</Link></Table.Cell>
                            <Table.Cell><StatusBadge status={issue.status} /></Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default IssuesPage
