'use client'
import ErrorMessage from "@/app/components/ErrorMessage"
import Spinner from "@/app/components/Spinner"
import { createIssueSchema } from "@/app/validationSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Callout, TextField } from '@radix-ui/themes'
import axios from "axios"
import "easymde/dist/easymde.min.css"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import SimpleMDE from "react-simplemde-editor"
import { z } from "zod"

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema),
        defaultValues: {
            title: "",
            description: "",
        },
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
            <form
                className='space-y-4'
                onSubmit={handleSubmit(async (data) => {
                    try {
                        setIsSubmitting(true)
                        await axios.post("/api/issues", data)
                        router.push("/issues")
                    } catch (error: any) {
                        setIsSubmitting(false)
                        setError(error.message)
                    }
                })}
            >
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register("title")} />
                </TextField.Root>

                <ErrorMessage error={errors.title?.message} />

                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />

                <ErrorMessage error={errors.description?.message} />

                <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
            </form>
        </div >
    )
}

export default NewIssuePage
