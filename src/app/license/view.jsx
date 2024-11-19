"use client";

import MainContainer from "../components/MainContainer";
import Container from "../components/container";
import dynamic from 'next/dynamic';
import { Loader } from "lucide-react";
const Content = dynamic(() => import('./content'), {
    ssr: false,
    loading: () => <div className='min-h-[calc(100vh-108px)] flex items-center justify-center'>
        <Loader className='animate-spin' />
    </div>,
});

export default function LicensePageView({ license }) {
    return (
        <>
            <MainContainer FooterClassName="!mt-0 relative bg-background">
                <Container className="min-h-[calc(100vh-65px)] flex justify-center items-center">
                    <Content license={license} />
                </Container>
            </MainContainer>
        </>
    );
}
