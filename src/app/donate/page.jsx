import React from 'react'
import MainContainer from '../components/MainContainer'
import Container from '../components/container'

const DonatePageView = () => {
    return (
        <MainContainer FooterClassName={'!mt-0'}>
            <Container>
                <div className='min-h-[calc(100vh-65px-44px)] flex flex-col justify-center items-center max-w-full mx-auto'>
                    <h1 className='p-6 bg-gradient-to-b bg-clip-text pb-4 text-center text-4xl sm:text-5xl font-extrabold leading-tight text-transparent !w-full lg:text-6xl xl:leading-snug from-white to-[#AAAAAA]'>
                        Donations Currently Unavailable
                    </h1>
                    <p className="mt-2 mb-12 max-h-[112px] w-full text-center md:max-h-[96px] md:w-[700px] text-base sm:text-md lg:text-lg text-muted-foreground">
                        We deeply value your generosity and support for this project. While we are not accepting donations at this time, we are actively working on enabling a secure and seamless way to contribute in the near future. Thank you for your patience and understanding.
                    </p>
                </div>
            </Container>
        </MainContainer>
    )
}

export default DonatePageView
