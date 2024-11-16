"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Home } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

const E404 = () => {
    const router = useRouter();

    return (
        <section className="bg-background">
            <div className="container min-h-[calc(100vh-5rem)] max-w-[calc(100%-20px)] py-12 mx-auto flex flex-col lg:flex-row lg:items-center justify-center lg:gap-12">
                <div className="w-full lg:w-1/2 lg:px-12">
                    <p className="text-sm font-medium text-blue-500 ">404 Error</p>
                    <h1 className="mt-3 text-2xl font-semibold text-white  md:text-3xl">
                        Page Not Found
                    </h1>
                    <p className="mt-4 text-gray-500 ">
                        The link you followed may be broken, or the page may have been removed.
                    </p>

                    <div className="flex items-center mt-6 gap-x-3">
                        <Button asChild variant="outline">
                            <span onClick={() => router.back()} className='cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                                </svg>
                                <span>Go Back</span>
                            </span>
                        </Button>
                        <Button asChild variant="default">
                            <a href='/' className="flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto  hover:bg-gray-100 cursor-pointer ">
                                <Home />
                                <span>Home</span>
                            </a>
                        </Button>


                    </div>
                </div>

                <div className="relative hidden lg:block w-full mt-12 lg:w-1/2 lg:mt-0">
                    <Image priority width={400} height={400} className="w-full max-w-lg lg:mx-auto" src={'/404.svg'} alt="404 Illustration" />
                </div>
            </div>
        </section>
    );
};

export default E404;