'use client'
import ErrorMessage from "@/app/components/ErrorMessage"
import Spinner from "@/app/components/Spinner"
import { issueSchema } from "@/app/validationSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Issue } from "@prisma/client"
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from "axios"
import "easymde/dist/easymde.min.css"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import SimpleMDE from "react-simplemde-editor"
import { z } from "zod"

type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true)

            if (issue)
                await axios.patch(`/api/issues/${issue.id}`, data)
            else
                await axios.post("/api/issues", data)

            router.push("/issues")
            router.refresh()
        } catch (error: any) {
            setIsSubmitting(false)
            setError(error.message)
        }
    })

    return (
        <div className="max-w-xl mb-10">
            {error && (
                <Callout.Root color="red" className="mb-4">
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>

            )}
            <form className='space-y-4' onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register("title")} />
                </TextField.Root>

                <ErrorMessage error={errors.title?.message} />

                <Controller
                    defaultValue={issue?.description}
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />

                <ErrorMessage error={errors.description?.message} />

                <Button disabled={isSubmitting}>{issue ? "Update Issue" : "Submit New Issue"} {isSubmitting && <Spinner />}</Button>
            </form>
        </div >
    )
}

export const dynamic = 'force-dynamic'
export default IssueForm
