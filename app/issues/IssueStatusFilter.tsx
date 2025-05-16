'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

const statuses: { label: string, value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
]

const IssueStatusFilter = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleFilterSelect = (status: Status) => {
        const params = new URLSearchParams()
        if (status) params.append("status", status)

        const orderBy = searchParams.get("orderBy")
        if (orderBy) params.append("orderBy", orderBy)

        const query = params.size ? `?${params.toString()}` : ""
        router.push(`/issues/${query}`)
    }

    return (
        <div>
            <Select.Root defaultValue={searchParams.get("status") || ""} onValueChange={handleFilterSelect}>
                <Select.Trigger placeholder='Filter by...'></Select.Trigger>
                <Select.Content>
                    {statuses.map((status, ind) => <Select.Item key={ind} value={status.value || ""}>{status.label}</Select.Item>)}
                </Select.Content>
            </Select.Root>
        </div>
    )
}

export default IssueStatusFilter
