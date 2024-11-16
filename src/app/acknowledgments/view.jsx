"use client";
import React, { useEffect, useState } from 'react'
import Container from '../components/container'
import MainContainer from '../components/MainContainer'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import { Loader } from 'lucide-react';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { useRouter } from 'next/navigation';
import Masonry from '@mui/lab/Masonry';


const AcknowledgmentsPageView = ({ contributors }) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])
    return (
        <>
            <MainContainer>
                <Container className={"lg:pt-3 pt-5 pb-10 container mx-auto min-h-[calc(100vh-64px-44px-5rem)]"}>

                    <Masonry
                        columns={{ xs: 1, sm: 2, lg: 3, xl: 4 }}
                        spacing={2}
                    >
                        {contributors.filter(contributor => contributor.login.toLowerCase() === "prassamin").length > 0 && (
                            <AcknowledgmentsCard
                                image={contributors?.find(contributor => contributor.login.toLowerCase() === "prassamin")?.avatar_url}
                                name={"PRAS Samin"}
                                link={contributors?.find(contributor => contributor.login.toLowerCase() === "prassamin")?.html_url}
                            >
                                <ul className="flex flex-col gap-2">
                                    <li>
                                        <strong>PRAS Samin</strong> is the heart and soul of this project, bringing a visionary approach to every detail. Their unwavering dedication ensures developers have an unparalleled experience.
                                    </li>
                                    <li>
                                        As the creator and lead developer, PRAS Samin has meticulously crafted each feature to enhance usability and empower developers with a seamless, high-quality tool.
                                    </li>
                                    <li className="flex items-end justify-end">
                                        <span className="text-xs bg-pink-900/50 border-pink-900 border px-2 py-1 rounded-full text-white uppercase">
                                            Commits: {contributors?.find(contributor => contributor.login.toLowerCase() === "prassamin")?.contributions}
                                        </span>
                                    </li>
                                </ul>
                            </AcknowledgmentsCard>
                        )}

                        <AcknowledgmentsCard
                            image={"/acknowledgments/shadcn.svg"}
                            name={"ShadCN"}
                            link={"https://ui.shadcn.com/"}
                            AvatarClassName={"p-3"}
                        >
                            <ul>
                                <li>
                                    Inspired by the elegant design principles of <strong>ShadCN</strong>, this site embodies a perfect blend of simplicity and sophistication. ShadCN's influence shaped the intuitive user interface you see today.
                                </li>
                            </ul>
                        </AcknowledgmentsCard>

                        <AcknowledgmentsCard
                            image={"/acknowledgments/python.svg"}
                            name={"Python"}
                            link={"https://python.org/"}
                            AvatarClassName={"p-3"}
                        >
                            <ul>
                                <li>
                                    <strong>Python</strong> has been the driving force behind this project's robust backend. Its flexibility and power have laid the foundation for the CLI tool's core functionality, ensuring a seamless experience for developers.
                                </li>
                            </ul>
                        </AcknowledgmentsCard>

                        <AcknowledgmentsCard
                            image={"/acknowledgments/nextjs.svg"}
                            name={"Next.js"}
                            link={"https://nextjs.org/"}
                            AvatarClassName={"p-3"}
                        >
                            <ul>
                                <li>
                                    Built with the cutting-edge features of <strong>Next.js</strong>, this site delivers lightning-fast performance and an exceptional developer experience. Next.js empowers every pixel and every interaction to feel smooth and modern.
                                </li>
                            </ul>
                        </AcknowledgmentsCard>


                    </Masonry>
                </Container>
            </MainContainer>
            {isLoading && <MainContainer FooterClassName={"!m-0"} className={"fixed top-0 left-0 w-full h-full bg-background"}>
                <Container>
                    <div className='min-h-[calc(100vh-108px)] flex items-center justify-center'>
                        <Loader className='animate-spin' />
                    </div>
                </Container>
            </MainContainer>}
        </>
    )
}

export default AcknowledgmentsPageView


const AcknowledgmentsCard = ({ link, name, children, image, AvatarClassName }) => {
    const router = useRouter()

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div className='hover:scale-105 hover:-rotate-3 transition-all duration-300 bg-zinc-800 rounded-xl'>
                    <Link target='_blank' href={link}>
                        <Card className="flex py-4 px-4 hover:scale-105 hover:rotate-[5deg] transition-all duration-300">
                            <CardHeader className="p-0">
                                <Avatar className={`border w-16 h-16`}>
                                    <AvatarImage src={image} className={AvatarClassName} />
                                    <AvatarFallback>
                                        <Loader className='animate-spin' />
                                    </AvatarFallback>
                                </Avatar>
                            </CardHeader>
                            <CardContent className="space-y-2 p-0 pl-4">
                                <CardTitle>{name}</CardTitle>
                                <CardDescription>
                                    {children}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                <ContextMenuItem onClick={() => router.back()}>
                    Back
                </ContextMenuItem>
                <ContextMenuItem onClick={() => window.location.reload()}>
                    Reload
                    <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                </ContextMenuItem>

                <ContextMenuSeparator />
                <ContextMenuItem onClick={() => window.open(link, '_blank')}>
                    Open in New Tab
                </ContextMenuItem>
                <ContextMenuItem onClick={() => {
                    navigator.clipboard.writeText(link);
                }}>Copy Link</ContextMenuItem>

            </ContextMenuContent>
        </ContextMenu>
    )
}