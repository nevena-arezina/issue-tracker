import { Container } from '@radix-ui/themes'
import React, { PropsWithChildren } from 'react'

const IssuesLayout = ({ children }: PropsWithChildren) => {
    return (
        <Container size={'4'}>
            {children}
        </Container>
    )
}

export default IssuesLayout
