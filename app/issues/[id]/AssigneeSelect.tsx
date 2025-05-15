'use client'
import { Skeleton } from '@/app/components'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast"

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axios.get("/api/users")
            return res.data
        },
        retry: 3,
        staleTime: 60 * 1000
    })

    if (error) return null

    if (isLoading) return <Skeleton />

    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserId || ""}
                onValueChange={async (userId) => {
                    try {
                        await axios.patch("/api/issues/" + issue.id, { assignedToUserId: userId || null })
                    } catch (error) {
                        toast.error("Changes could not be saved.")
                    }
                }}>
                <Select.Trigger placeholder='Assign...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="">Unassigned</Select.Item>
                        {users && users.length > 0 && users.map(user => (
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        ))}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    )
}

export default AssigneeSelect
