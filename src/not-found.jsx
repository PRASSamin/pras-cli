import Link from 'next/link';
import Image from 'next/image';

const Custom404 = () => {
  return (
    <section className="bg-white">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="w-full lg:w-1/2">
          <p className="text-sm font-medium text-blue-500 ">404 Error</p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">
            Page Not Found
          </h1>
          <p className="mt-4 text-gray-500 ">
            The link you followed may be broken, or the page may have been removed.
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <Link href="/" passHref>
              <button className="flex items-center justify-center px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto  hover:bg-gray-100 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:rotate-180">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>
                <span>Go Back</span>
              </button>
            </Link>


          </div>
        </div>

        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <Image priority width={400} height={400} className="w-full max-w-lg lg:mx-auto" src={'/404.svg'} alt="404 Illustration" />
        </div>
      </div>
    </section>
  );
};

export default Custom404;

export async function generateMetadata() {
  const pageTitle = `Page Not Found | 404`;

  return {
    title: pageTitle,
    robots: 'noindex, nofollow',
  };
}
