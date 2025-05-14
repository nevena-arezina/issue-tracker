'use client'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Button, Callout, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

interface Inputs {
    title: string
    description: string
}

const NewIssuePage = () => {
    const router = useRouter()
    const { register, control, handleSubmit } = useForm<Inputs>()

    const [error, setError] = useState("")

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
                        await axios.post("/api/issues", data)
                        router.push("/issues")
                    } catch (error: any) {
                        setError(error.message)
                    }
                })}
            >
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register("title")} />
                </TextField.Root>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                />
                <Button>Submit New Issue</Button>
            </form>
        </div >
    )
}

export default NewIssuePage
