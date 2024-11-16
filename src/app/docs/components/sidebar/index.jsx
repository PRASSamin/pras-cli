import React from 'react'
import sideBarData from './data';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Sidebar = () => {
    const data = sideBarData()
    const pathname = usePathname()
    const router = useRouter()

    return (
        <div className='h-[calc(100vh-64px)] top-16 z-30 hidden w-full border-r border-border/40 md:sticky md:block'>
            <div className='h-full overflow-auto py-6 pr-6 lg:py-8 flex flex-col gap-4'>
                {
                    data.map((item, idx) => (
                        <div key={idx}>
                            <span className="font-bold text-base">{item.title}</span>
                            <div className="">
                                {item.items.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => router.push(item.pathname)}
                                        className={`text-[#c0c0c0] hover:text-white flex gap-3 items-center mt-2 text-[14px]`}
                                    >
                                        <span className={`hover:underline 
                                        ${pathname === item.pathname ? 'text-white underline' : ''}`}>{item.title}</span> {item?.tag && (
                                            <span className="text-xs px-1.5 py-[1px] rounded-full bg-purple-500 text-white ">{item.tag}</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Sidebar
