import { StatusBadge } from '@/app/components'
import { prisma } from '@/prisma/client'
import { Button, Card, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) return notFound()

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <div>
                <Heading>{issue.title}</Heading>

                <div className='flex gap-5 my-2'>
                    <StatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </div>

                <Card className='prose' mt="5">
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </div>

            <div >
                <Button>
                    <Pencil2Icon />
                    <Link href={`/issues/${issue.id}/edit`}>
                        Edit Issue
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default IssueDetailsPage
