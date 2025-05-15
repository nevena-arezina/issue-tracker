'use client'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { AlertDialog, Button } from '@radix-ui/themes'
import React from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    return (

        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red'>
                    <Pencil2Icon />
                    Delete Issue
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
                        <Button variant='soft' color="red">Delete Issue</Button>
                    </AlertDialog.Action>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteIssueButton
