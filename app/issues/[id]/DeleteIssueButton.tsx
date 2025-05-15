'use client'
import { Spinner } from '@/app/components'
import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const [error, setError] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const router = useRouter()

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await axios.delete("/api/issues/" + issueId)
            router.push("/issues")
            router.refresh()
        } catch (error) {
            setIsDeleting(false)
            setError(true)
        }
    }

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red' disabled={isDeleting}>
                        <TrashIcon />
                        Delete Issue
                        {isDeleting && <Spinner />}
                    </Button>
                </AlertDialog.Trigger>

                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm deletion</AlertDialog.Title>
                    <AlertDialog.Description>
                        Are you sure you want to delete this issue?
                        <br />This action cannot be undone.
                    </AlertDialog.Description>
                    <div className='flex mt-6 gap-4'>
                        <AlertDialog.Cancel>
                            <Button variant='soft' color="gray">Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant='soft' color="red" onClick={handleDelete}>Delete Issue</Button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Root>

            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>The issue could not be deleted</AlertDialog.Description>
                    <Button color="gray" variant='soft' mt="4" onClick={() => setError(false)}>OK</Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton
