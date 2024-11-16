"use client"
import { useState, useEffect } from 'react';
import MainContainer from '@/app/components/MainContainer';
import Container from '@/app/components/container';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download } from '@mui/icons-material';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { LinkIcon } from 'lucide-react';
import DownloadCard from './downloadCard';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useRouter } from 'next/navigation';
import { handleIDClick } from '@/lib/utils';

const VersionDownloadView = ({ data, fullData, notFound }) => {
  const pathname = usePathname()

  const bcItems = pathname.split('/').filter((item) => item !== '');
  const router = useRouter();


  const formatDateTme = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };


  useEffect(() => {
    // Handle scrolling with offset
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      }
    };

    handleHashChange(); // Trigger on initial load if there's a hash
    window.addEventListener("hashchange", handleHashChange); // Listen for hash changes

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <>
      {
        notFound ? (
          <MainContainer>
            <Container className={"py-10"}>
              <div className="container min-h-[calc(100vh-5rem)] py-12 mx-auto flex flex-col lg:flex-row lg:items-center justify-center lg:gap-12">
                <div className="w-full lg:w-1/2">
                  <p className="text-sm font-medium text-blue-500 ">404 Error</p>
                  <h1 className="mt-3 text-2xl font-semibold text-white  md:text-3xl">
                    Version Not Found
                  </h1>
                  <p className="mt-4 text-gray-500 ">
                    The version you are looking for is not available. Please check the version number and try again.
                  </p>

                  <div className="flex items-center mt-6 gap-x-3">
                    <Button variant="outline" onClick={() => router.back()}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                      </svg>
                      <span>Go Back</span>
                    </Button>
                    <Button asChild>
                      <a href="/download">Version List</a>
                    </Button>

                  </div>
                </div>

                <div className="relative hidden lg:block w-full mt-12 lg:w-1/2 lg:mt-0">
                  <Image priority width={400} height={400} className="w-full max-w-lg lg:mx-auto" src={'/404.svg'} alt="404 Illustration" />
                </div>
              </div>
            </Container>
          </MainContainer>
        ) : (
          <MainContainer>
            <Container className={"lg:pt-3 pt-5 pb-10"}>
              <Breadcrumb>
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

              <div className='flex flex-col lg:flex-row gap-5 justify-between'>
                <div className='lg:w-1/2 flex flex-col items-start justify-between gap-40 lg:gap-10 pt-5 pb-16 lg:py-10'>
                  <div>
                    <h1 className='flex gap-2 text-4xl lg:text-5xl font-bold'>PRAS CLI
                      <span className='select-none text-primary text-xs lg:text-sm self-start bg-purple-500 rounded-full px-2'>
                        {data.tag_name.replace('v', '')}
                      </span>
                      {data.is_latest && <span className='select-none text-primary text-xs lg:text-sm self-start bg-green-500 rounded-full px-2'>
                        Latest
                      </span>}
                      {data.prerelease && <span className='select-none text-primary text-xs lg:text-sm self-start bg-red-500 rounded-full px-2'>
                        Pre-Release
                      </span>}
                    </h1>
                    <h3 className='text-justify text-[13px] lg:text-sm'>{formatDateTme(data.created_at)}</h3>

                  </div>
                  <Button asChild variant="secondary">
                    <button onClick={() => {
                      handleIDClick('download');
                    }} >
                      <Download /> Download
                    </button>
                  </Button>

                </div>

                <div className='-mr-64 lg:m-0 lg:opacity-100 ml-64 -mt-64 opacity-50 w-[80%] lg:w-1/2 flex justify-end items-center'>
                  <Image onContextMenu={(e) => e.preventDefault()} src={`/cli.svg`} alt='cli-image' width={400} height={400} className='w-full lg:w-[70%] h-auto shadow-xl shadow-black' />
                </div>
              </div>

              <div className='mt-16'>
                <h2 id='whats-new' className='text-2xl font-bold flex items-start group'>What&apos;s New<a onClick={() => handleIDClick('whats-new')} className='hidden group-hover:inline ml-2'>
                  <LinkIcon size={16} />
                </a></h2>
                <ReactMarkdown className='allow-default'>
                  {data.body}
                </ReactMarkdown>

              </div>

              <div id='download' className="mt-16">
                <h2 className='text-2xl font-bold flex items-start group'>Download<a onClick={() => handleIDClick('download')} className='hidden group-hover:inline ml-2'>
                  <LinkIcon size={16} />
                </a></h2>
                <div className='grid 2xl:grid-cols-5  lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 my-5'>
                  <DownloadCard
                    osName="Windows"
                    logoSrc="/windows.svg"
                    supportedOs={["Windows 11", "Windows 10"]}
                    fileExtension=".exe"
                    buttonClassName={"bg-[#1E3A8A] hover:bg-[#1E40AF]"}
                    cardClassName={"bg-blue-500/20 border-blue-500"}
                    downloadUrl={data?.assets?.find((asset) => asset.name.endsWith('.exe'))?.browser_download_url || null}
                  />
                  <DownloadCard
                    osName="Debian"
                    logoSrc="/debian.svg"
                    supportedOs={["Ubuntu", "Debian", "May work on other distributions, but untested"]}
                    fileExtension=".deb"
                    buttonClassName={"bg-[#FF0059] hover:bg-[#D70A53]"}
                    cardClassName={"bg-[#D70A53]/40 border-[#FF0059]"}
                    downloadUrl={data?.assets?.find((asset) => asset.name.endsWith('.deb'))?.browser_download_url || null}
                  />
                  <DownloadCard
                    osName="Red Hat"
                    logoSrc="/redhat.svg"
                    supportedOs={["Red Hat", "Fedora", "May work on additional distributions, but untested"]}
                    fileExtension=".rpm"
                    buttonClassName={"bg-[#B22222] hover:bg-[#8B0000]"}
                    cardClassName={"bg-[red]/20 border-[red]"}
                    downloadUrl={data?.assets?.find((asset) => asset.name.endsWith('.rpm'))?.browser_download_url || null}
                  />
                </div>
              </div>

              <div id='other-versions' className="mt-16">
                <h2 className='text-2xl font-bold flex items-start group'>Other Versions<a onClick={() => handleIDClick('other-versions')} className='hidden group-hover:inline ml-2'>
                  <LinkIcon size={16} />
                </a></h2>
                <Table className="my-5">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Version</TableHead>
                      <TableHead>Release</TableHead>
                      <TableHead>Tags</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {
                      fullData.map((version) => (
                        <TableRow
                          onClick={() => router.push(`/download/version/${version.tag_name}`)}
                          className='cursor-pointer'
                          key={version.id}>
                          <TableCell className="font-medium">PRAS CLI {version.tag_name.replace(/^v/, '')}</TableCell>
                          <TableCell>{formatDateTme(version.created_at)}</TableCell>
                          <TableCell>
                            {version.is_latest && <span className='select-none text-primary text-sm self-start bg-green-500 rounded-full px-2'>
                              Latest
                            </span>}
                            {version.prerelease && <span className='select-none text-primary text-sm self-start bg-red-500 rounded-full px-2'>
                              Pre-Release
                            </span>}
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>

              </div>
            </Container>
          </MainContainer>
        )
      }

    </>

  );
};


export default VersionDownloadView
