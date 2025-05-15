'use client'

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'
import { useSession } from "next-auth/react"

const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues', label: 'Issues' }
]

const Navbar = () => {
    const currentPath = usePathname()
    const { status, data: session } = useSession()

    return (
        <nav className='mb-5 flex space-x-6 items-center h-14 border px-3'>
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

                <div>
                    {status === "authenticated" ? <Link href="/api/auth/signout">Log out</Link> : <Link href="/api/auth/signin">Log in</Link>}
                </div>
            </ul>
        </nav>
    )
}

export default Navbar
