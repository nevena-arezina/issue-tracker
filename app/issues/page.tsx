import { prisma } from '@/prisma/client'
import { Status } from '@prisma/client'
import Pagination from '../components/Pagination'
import IssueActions from './IssueActions'
import IssueTable, { columnNames, IssueQuery } from './IssueTable'

interface Params {
    searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Params) => {
    const validStatuses = Object.values(Status)
    const status = validStatuses.includes(searchParams.status) ? searchParams.status : undefined
    const orderBy = columnNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: "asc" } : undefined

    const currentPage = parseInt(searchParams.page) || 1
    const pageSize = 10

    const issues = await prisma.issue.findMany({
        where: { status },
        orderBy,
        skip: (currentPage - 1) * pageSize,
        take: pageSize
    })

    const issueCount = await prisma.issue.count({ where: { status } })

    return (
        <div className='cursor-default max-w-7xl flex flex-col gap-3'>
            <IssueActions />

            <IssueTable searchParams={searchParams} issues={issues} />

            <Pagination itemsCount={issueCount} pageSize={pageSize} currentPage={currentPage} />
        </div>
    )
}

export default IssuesPage
