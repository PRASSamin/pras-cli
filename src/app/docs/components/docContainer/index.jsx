import React, { useEffect, useState } from 'react'
import Sidebar from '../sidebar'
import Container from '@/app/components/container';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation';
import { PrevNextPathname } from '@/lib/utils'
import sideBarData from '../sidebar/data';
import { Button } from '@/components/ui/button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { NavigateBefore } from '@mui/icons-material';
import { getAllIds } from '@/lib/utils';

const DocContainer = ({ children }) => {
    const pathname = usePathname()
    const bcItems = pathname.split('/').filter((item) => item !== '');
    const [ids, setIds] = useState([]);

    useEffect(() => {
        const contentElement = document.getElementById('content');
        if (contentElement) {
            setIds(getAllIds(contentElement));
        }
    }, []);

    const pnpath = PrevNextPathname(pathname, sideBarData())

    return (
        <Container>
            <div className='flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 '>
                <Sidebar />
                <div className='relative lg:gap-10 xl:grid md:grid-cols-[1fr_300px]'>
                    <div className='overflow-auto max-h-[calc(100vh-64px)] py-6 lg:py-8 scrollbar'>
                        <Breadcrumb className="mb-5">
                            <BreadcrumbList>
                                {bcItems.map((item, index) => (
                                    <div key={index} className='flex justify-center items-center'>
                                        <BreadcrumbItem>
                                            {item.charAt(0).toUpperCase() + item.slice(1)}
                                        </BreadcrumbItem>
                                        {
                                            index !== bcItems.length - 1 && <BreadcrumbSeparator />
                                        }
                                    </div>
                                ))}
                            </BreadcrumbList>
                        </Breadcrumb>

                        <div id='content' className={`min-h-[calc(100vh-44px-65px)]`}>{children}</div>


                        <div className="flex justify-between w-full items-center mt-10">
                            <div>
                                {pnpath.prev && <Button className="flex gap-1 items-center"
                                    onClick={() => pnpath.prev.perform(pnpath.prev.pathname)}
                                    variant="ghost">
                                    <NavigateBefore fontSize='large' />
                                    {pnpath.prev.title}
                                </Button>}
                            </div>
                            <div>
                                {pnpath.next && <Button className="flex gap-1 items-center"
                                    onClick={() => pnpath.next.perform(pnpath.next.pathname)}
                                    variant="ghost">
                                    {pnpath.next.title}
                                    <NavigateNextIcon fontSize='large' />
                                </Button>}
                            </div>
                        </div>
                    </div>

                    <div className='hidden text-sm xl:block'>
                        {ids.length > 0 &&
                            <div className='max-h-[calc(100vh-64px)] py-6 lg:gap-10 lg:py-8'>
                                <div className='no-scrollbar h-full overflow-y-auto overflow-x-hidden pb-10'>
                                    <div className='space-y-2'>
                                        <h3 className='font-medium'>On This Page</h3>
                                        <ul>
                                            {ids.map((item, index) => (
                                                <li className='mt-0 pt-1.5' key={index}>
                                                    <a className='text-[13.5px] inline-block no-underline transition-colors hover:text-foreground text-muted-foreground truncate w-full' href={`#${item.id}`}>{item.title}</a>
                                                    {item.children?.length > 0 && <ul className='pl-4'>
                                                        {item.children.map((child, idx) => (
                                                            <li key={idx} className='mt-0 pt-1.5'>
                                                                <a href={`#${child.id}`} className='text-[13.5px] inline-block no-underline transition-colors hover:text-foreground text-muted-foreground w-full  truncate'>{child.title}</a>
                                                            </li>
                                                        ))}
                                                    </ul>}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default DocContainer
