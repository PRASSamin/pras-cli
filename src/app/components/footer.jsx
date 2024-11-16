import React from 'react'
import Container from './container'
import { GitHub, LinkedIn, Instagram, Facebook, Twitter, Email } from '@mui/icons-material'
import Link from 'next/link'

const Footer = ({ className }) => {

    return (
        <footer className={`z-[1000] mt-20 border-t border-[#333] ${className}`}>
            <Container className={"py-[10px]"}>
                <div className=" flex items-center justify-between">
                    <div className="social flex items-center justify-center gap-4 text-gray-500">
                        <Link href={'https://github.com/PRASSamin/pras-cli'} target='_blank' className='hover:text-gray-400'>
                            <GitHub fontSize='small' />
                        </Link>
                        <Link href={'https://www.linkedin.com/in/pras-samin-826421270/'} target='_blank' className='hover:text-gray-400'>
                            <LinkedIn fontSize='small' />
                        </Link>
                        <Link href={'https://www.instagram.com/imprassamin/'} target='_blank' className='hover:text-gray-400'>
                            <Instagram fontSize='small' />
                        </Link>
                        <Link href={'https://www.facebook.com/prassamin7/'} target='_blank' className='hover:text-gray-400'>
                            <Facebook fontSize='small' />
                        </Link>
                        <Link href={'https://x.com/prassamin78/'} target='_blank' className='hover:text-gray-400'>
                            <Twitter fontSize='small' />
                        </Link>
                        <Link href={'mailto:prassamin@gmail.com'} target='_blank' className='hover:text-gray-400'>
                            <Email fontSize='small' />
                        </Link>
                    </div>

                    <div>
                        <p className='text-gray-500 text-sm'>© {new Date().getFullYear()} <Link href={"https://pras.me/"} className='font-black hover:underline'>PRAS</Link></p>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

export default Footer
