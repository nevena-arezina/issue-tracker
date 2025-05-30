import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'
import { Table } from '@radix-ui/themes'
import NextLink from 'next/link'
import { Link, StatusBadge } from '../components'

export interface IssueQuery {
    status: Status,
    orderBy: keyof Issue,
    page: string
}

interface Props {
    searchParams: IssueQuery
    issues: Issue[]
}

const IssueTable = ({ searchParams, issues }: Props) => {
    return (
        <Table.Root variant='surface'>
            <Table.Header>
                <Table.Row>
                    {columns.map(column => (
                        <Table.ColumnHeaderCell key={column.value} className={column.className}>
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
    )
}

const columns: { label: string, value: keyof Issue, className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" }

]

export const columnNames = columns.map(col => col.value)

export default IssueTable
