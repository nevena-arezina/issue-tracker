'use client'

import { Avatar, DropdownMenu, Text } from '@radix-ui/themes'
import classnames from 'classnames'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiFillBug } from 'react-icons/ai'
import { Skeleton } from './components'

const links = [
    { href: '/', label: 'Dashboard' },
    { href: '/issues', label: 'Issues' }
]

const Navbar = () => {

    return (
        <nav className='mb-5 flex space-x-6 border p-5 justify-between items-center'>
            <div className='flex items-center gap-5'>
                <Link href="/"><AiFillBug /></Link>
                <NavLinks />
            </div>
            <AuthStatus />
        </nav>
    )
}

const NavLinks = () => {
    const currentPath = usePathname()

    return <ul className='flex space-x-6'>
        {links.map(link =>
            <li key={link.href}>
                <Link
                    href={link.href}
                    className={classnames({
                        'nav-link': true,
                        '!text-zinc-900': link.href === currentPath,
                    })}
                >
                    {link.label}
                </Link>
            </li>)}
    </ul>
}

const AuthStatus = () => {
    const { status, data: session } = useSession()

    if (status === "loading") return <Skeleton width={"3rem"} />

    if (status === 'unauthenticated') return <Link className='nav-link' href="/api/auth/signin">Log in</Link>

    return <div>
        {session?.user && (
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <button type="button" className="cursor-pointer bg-transparent border-none p-0">
                        <Avatar src={session.user!.image!} fallback={session.user.name?.[0] || '?'} size="2" radius='full' />
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
    </div>
}

export default Navbar
