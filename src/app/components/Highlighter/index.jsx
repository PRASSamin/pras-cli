import { Prism } from 'react-syntax-highlighter';
import { materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Clipboard } from "lucide-react";
import { useState } from "react";
import { Check } from "@mui/icons-material";
import { Button } from "@/components/ui/button";

const Highlighter = ({ children, language, codeClassName, className }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = (text) => {
        try {
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 1000);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="relative flex">
            <style>
                {
                    `
                            .code-block span {
                                font-family: 'JetBrains Mono', monospace !important;
                            }
                            `
                }
            </style>
            <Prism
                codeTagProps={{
                    className: `whitespace-pre text-left tracking-normal break-keep text-[#c3cee3] bg-black !font-mono text-base leading-[1.5em] tab-size-[4] hyphens-none code-block ${codeClassName ? codeClassName : ""}`,
                }}
                className={`w-full rounded-lg border border-white/20 !bg-black ${className ? className : ""}`}
                language={language ? language : "bash"}
                style={materialOceanic}>
                {children}
            </Prism>
            <Button onClick={() => copyToClipboard(children)} variant="ghost" className="absolute top-3.5 right-1.5 p-2.5 rounded hover:bg-white/10">
                {copied ? <Check /> : <Clipboard />}
            </Button>
        </div>

    )
}

export default Highlighter
