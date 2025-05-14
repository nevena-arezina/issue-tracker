import StatusBadge from '@/app/components/StatusBadge'
import { prisma } from '@/prisma/client'
import { Card, Heading } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) return notFound()

    return (
        <div>
            <Heading>{issue.title}</Heading>

            <div className='flex gap-5 mt-2 mb-5'>
                <StatusBadge status={issue.status} />
                <p>{issue.createdAt.toDateString()}</p>
            </div>

            <Card className='max-w-xl'>{issue.description}</Card>
        </div>
    )
}

export default IssueDetailsPage
