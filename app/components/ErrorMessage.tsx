import React from 'react'
import { Text } from '@radix-ui/themes'

interface Props {
    error?: string
}

const ErrorMessage = ({ error }: Props) => {
    if (!error) return null

    return (
        <Text as="p" color="red">{error}</Text>
    )
}

export default ErrorMessage
