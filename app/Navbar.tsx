import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'

const links = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/issues', label: 'Issues' }
]

const Navbar = () => {
    return (
        <nav className='mb-5 flex space-x-6 items-center h-14 border px-3'>
            <Link href="/"><AiFillBug /></Link>
            <ul className='flex space-x-6'>
                {links.map(link =>
                    <li key={link.href}>
                        <Link href={link.href} className='text-zinc-500 hover:text-zinc-800 transition-colors'>{link.label}</Link>
                    </li>)}
            </ul>
        </nav>
    )
}

export default Navbar
