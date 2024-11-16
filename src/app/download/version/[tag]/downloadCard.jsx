// DownloadCard.js

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Download } from '@mui/icons-material';
import Image from 'next/image';

const DownloadCard = ({ osName, logoSrc, supportedOs, fileExtension, buttonClassName, cardClassName, downloadUrl }) => {

    return (
        <Card className={`col-span-1 flex flex-col justify-between hover:scale-110 hover:rotate-3 transition-all duration-300 ${cardClassName}`}>
            <CardHeader className="flex flex-col justify-between w-full gap-10">
                <CardTitle className="flex h-full justify-center items-center">
                    <Image src={logoSrc} width={100} height={100} alt={`${osName} logo`} />
                </CardTitle>
                <CardDescription className="flex flex-col text-white">
                    <span className="text-lg font-semibold">Supported OS:</span>
                    <ul className="flex flex-col list-disc ml-5 mt-2">
                        {supportedOs.map((os, index) => (
                            <li key={index}>{os}</li>
                        ))}
                    </ul>
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex gap-2 w-full mt-5">
                {downloadUrl ? (
                    <Button asChild variant="default" className={`w-full text-white font-semibold ${buttonClassName}`}>
                        <a
                            href={downloadUrl}
                            download={true}
                            className="select-none flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <Download /> {fileExtension}
                        </a>
                    </Button>
                ) : (
                    <Button disabled asChild variant="default" className={`opacity-90 w-full text-white font-semibold ${buttonClassName}`}>
                        <span className="select-none flex items-center justify-center gap-2 cursor-pointer">
                            <Download /> Not Available
                        </span>
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default DownloadCard;
