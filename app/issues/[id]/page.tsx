import StatusBadge from '@/app/components/StatusBadge'
import { prisma } from '@/prisma/client'
import { Card, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'

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

            <div className='flex gap-5 my-2'>
                <StatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </div>

            <Card className='prose max-w-xl' mt="5">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </div>
    )
}

export default IssueDetailsPage
