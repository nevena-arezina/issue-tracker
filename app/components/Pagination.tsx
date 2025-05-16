'use client'
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons'
import { Button, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
    itemsCount: number
    pageSize: number
    currentPage: number
}

const Pagination = ({ itemsCount, pageSize, currentPage }: Props) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const pageCount = Math.ceil(itemsCount / pageSize)

    if (pageCount <= 1) return null

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())

        params.set("page", page.toString())

        router.push("?" + params.toString())
    }

    return (
        <div className='flex gap-2 items-center'>
            <Text size="2">Page {currentPage} of {pageCount}</Text>
            <Button size="1" color='gray' variant='soft' disabled={currentPage === 1} onClick={() => handlePageChange(1)}>
                <DoubleArrowLeftIcon />
            </Button>
            <Button size="1" color='gray' variant='soft' disabled={currentPage === 1} onClick={() => handlePageChange(--currentPage)}>
                <ChevronLeftIcon />
            </Button>
            <Button size="1" color='gray' variant='soft' disabled={currentPage === pageCount} onClick={() => handlePageChange(++currentPage)}>
                <ChevronRightIcon />
            </Button>
            <Button size="1" color='gray' variant='soft' disabled={currentPage === pageCount} onClick={() => handlePageChange(pageCount)}>
                <DoubleArrowRightIcon />
            </Button>
        </div>
    )
}

export default Pagination
