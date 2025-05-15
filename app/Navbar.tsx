'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'
import { useSession } from "next-auth/react"
import { Avatar, DropdownMenu, Text } from '@radix-ui/themes'

const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues', label: 'Issues' }
]

const Navbar = () => {
    const currentPath = usePathname()
    const { status, data: session } = useSession()

    return (
        <nav className='mb-5 flex space-x-6 border p-5 justify-between items-center'>
            <div className='flex items-center gap-5'>
                <Link href="/"><AiFillBug /></Link>
                <ul className='flex space-x-6'>
                    {links.map(link =>
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={classnames({
                                    'text-zinc-900': link.href === currentPath,
                                    'text-zinc-500': link.href !== currentPath,
                                    'hover:text-zinc-800 transition-colors': true
                                })}
                            >
                                {link.label}
                            </Link>
                        </li>)}
                </ul>
            </div>

            <div>
                {status === "authenticated" && session?.user && (
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <button type="button" className="cursor-pointer bg-transparent border-none p-0">
                                {session.user.image ? (
                                    <Avatar src={session.user.image} fallback={session.user.name?.[0] || '?'} size="2" radius='full' />
                                ) : (
                                    <Avatar fallback={session.user.name?.[0] || '?'} size="2" radius='full' />
                                )}
                            </button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Label><Text size="2">{session.user.email}</Text></DropdownMenu.Label>
                            <DropdownMenu.Item>
                                <Link href="/api/auth/signout">Log out</Link>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                )}

                {status === "unauthenticated" && <Link href="/api/auth/signin">Log in</Link>}
            </div>
        </nav>
    )
}

export default Navbar
