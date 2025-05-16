'use client'
import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

const statuses: { label: string, value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
]

const IssueStatusFilter = () => {
    const router = useRouter()

    const handleFilterSelect = (status: Status) => {
        console.log(status)
        const query = status ? `?status=${status}` : ""
        router.push(`/issues/${query}`)
    }

    return (
        <div>
            <Select.Root onValueChange={handleFilterSelect}>
                <Select.Trigger placeholder='Filter by...'></Select.Trigger>
                <Select.Content>
                    {statuses.map((status, ind) => <Select.Item key={ind} value={status.value || ""}>{status.label}</Select.Item>)}
                </Select.Content>
            </Select.Root>
        </div>
    )
}

export default IssueStatusFilter
