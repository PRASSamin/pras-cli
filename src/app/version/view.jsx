"use client";
import MainContainer from "../components/MainContainer";
import Container from "../components/container";

export default function VersionPageView({ version }) {
    return (
        <>
            <MainContainer FooterClassName={"!mt-0 relative bg-background"}>
                <Container className={"min-h-[calc(100vh-65px)] flex justify-center items-center"}>
                    <div className={`z-20 relative flex flex-col justify-center items-center`}>
                        <h2 className="text-xl font-extrabold pb-2 text-zinc-300 border-b ">Latest</h2>
                        <h1 className={`p-6 bg-gradient-to-b bg-clip-text pb-4 text-center text-4xl sm:text-5xl font-extrabold leading-tight text-transparent !w-full lg:text-6xl xl:leading-snug from-white to-[#AAAAAA]`}>
                            {version.version}
                        </h1>
                    </div>
                </Container>
            </MainContainer>
        </>
    );
}
