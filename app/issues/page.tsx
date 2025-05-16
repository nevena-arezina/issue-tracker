import { Link, StatusBadge } from '@/app/components'
import { prisma } from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import IssueActions from './IssueActions'
import { Issue, Status } from '@prisma/client'
import NextLink from "next/link"
import { ArrowUpIcon } from '@radix-ui/react-icons'

const columns: { label: string, value: keyof Issue, className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" }

]

interface Params {
    searchParams: {
        status: Status,
        orderBy: keyof Issue
    }
}

const IssuesPage = async ({ searchParams }: Params) => {
    const validStatuses = Object.values(Status)
    const status = validStatuses.includes(searchParams.status) ? searchParams.status : undefined

    const orderBy = columns.map(col => col.value).includes(searchParams.orderBy) ? { [searchParams.orderBy]: "asc" } : undefined
    const issues = await prisma.issue.findMany({ where: { status }, orderBy })

    return (
        <div className='cursor-default max-w-7xl'>
            <IssueActions />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        {columns.map(column => (
                            <Table.ColumnHeaderCell key={column.value}>
                                <NextLink href={{ query: { ...searchParams, orderBy: column.value } }}>
                                    {column.label}
                                </NextLink>
                                {column.value === searchParams.orderBy && <ArrowUpIcon className='inline' />}
                            </Table.ColumnHeaderCell>
                        ))}
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
