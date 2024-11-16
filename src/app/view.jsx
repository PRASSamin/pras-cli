"use client";
import { useEffect, useState, useMemo } from "react";
import MainContainer from "./components/MainContainer";
import Container from "./components/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    const [boxCount, setBoxCount] = useState({ cols: 0, rows: 0, total: 0 });
    const [activeBox, setActiveBox] = useState(null);
    const [activeImage, setActiveImage] = useState("");
    const boxSize = 50;
    const extraColumns = 3;

    const imageUrls = useMemo(() => [
        "/acknowledgments/github.svg",
        "/acknowledgments/nextjs.svg",
        "/acknowledgments/python.svg",
        "/acknowledgments/shadcn.svg",
    ], []);


    useEffect(() => {
        // Function to calculate the number of boxes
        const calculateBoxes = () => {
            const parent = document.getElementById("grid-container");
            if (!parent) return;

            const parentWidth = parent.offsetWidth;
            const parentHeight = parent.offsetHeight;

            const cols = Math.ceil(parentWidth / boxSize) + extraColumns * 2; // Extra columns on both sides
            const rows = Math.ceil(parentHeight / boxSize);
            const totalBoxes = cols * rows;

            // Update only if box count changes to avoid unnecessary re-renders
            setBoxCount((prev) => {
                if (
                    prev.cols !== cols ||
                    prev.rows !== rows ||
                    prev.total !== totalBoxes
                ) {
                    return { cols, rows, total: totalBoxes };
                }
                return prev;
            });
        };

        // Initial calculation and event listener for window resizing
        calculateBoxes();
        window.addEventListener("resize", calculateBoxes);

        // Set interval to change active box every second
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * boxCount.total);
            const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
            setActiveBox(randomIndex);
            setActiveImage(randomImage);
        }, 2000);

        // Cleanup on unmount
        return () => {
            window.removeEventListener("resize", calculateBoxes);
            clearInterval(interval);
        };
    }, [boxCount.total, imageUrls]);

    return (
        <>
            <MainContainer FooterClassName={"!mt-0 relative bg-background"}>
                <Container className={"min-h-[calc(100vh-65px)] flex justify-center items-center"}>
                    <div className={`z-20 relative flex flex-col justify-center items-center`}>
                        <h1 className={`p-6 bg-gradient-to-b bg-clip-text pb-4 text-center text-4xl sm:text-5xl font-extrabold leading-tight text-transparent !w-full lg:text-6xl xl:leading-snug from-white to-[#AAAAAA]`}>
                            Streamline Your Workflow with PRAS CLI
                        </h1>
                        <p className={`mt-2 mb-12 max-h-[112px] w-full text-center md:max-h-[96px] md:w-[700px] text-md sm:text-lg lg:text-xl text-muted-foreground`}>
                            The ultimate command-line tool built for developers, by developers. Simplify your tasks, automate processes, and supercharge your productivity.
                        </p>

                        <div className={`flex items-center justify-center gap-3 w-full h-full`}>
                            <Button asChild className={`px-6`} size={`lg`} variant={`default`}>
                                <Link href={'/docs'}>Get Started</Link>
                            </Button>
                            <Button asChild className={`px-6`} size={`lg`} variant={`outline`}>
                                <Link href={`/download`}>Download</Link>
                            </Button>
                        </div>
                    </div>

                    <div
                        id="grid-container"
                        className="z-0 fixed top-0 left-0 w-full h-screen bg-black overflow-hidden"
                    >
                        {/* Dynamic Grid */}
                        <div
                            className="grid w-full h-full -translate-x-[15px]"
                            style={{
                                gridTemplateColumns: `repeat(${boxCount.cols}, ${boxSize}px)`,
                                gridTemplateRows: `repeat(${boxCount.rows}, ${boxSize}px)`,
                                gap: "0px", // No gaps between boxes
                            }}
                        >
                            {Array.from({ length: boxCount.total }).map((_, index) => (
                                <div
                                    key={index}
                                    className={`border-[.2px] border-[#111111] hover:bg-zinc-950 hover:border-zinc-800 rounded transition-all duration-1000  aspect-square bg-transparent ${activeBox === index ? "active-box" : ""
                                        }`}
                                    style={{ width: `${boxSize}px`, height: `${boxSize}px` }}
                                >
                                    {/* Apply fade-in and fade-out with opacity */}
                                    <div
                                        className={`w-full h-full transition-all duration-1000 ${activeBox === index ? "opacity-100" : "opacity-0"}`}
                                    >
                                        {activeBox === index && activeImage && (
                                            <Image
                                                width={100}
                                                height={100}
                                                src={activeImage}
                                                alt="Active"
                                                className="p-2.5 object-cover w-full h-full rounded"
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </MainContainer>
        </>
    );
}
