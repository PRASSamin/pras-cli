"use client";
import { KBarProvider, KBarPortal, KBarPositioner, KBarSearch, KBarAnimator } from "kbar";
import RenderResult from "./result";
import { Search } from "@mui/icons-material";
import KBarData from "./data";

export default function KBar({ children }) {
    const actions = KBarData()

    return (
        <KBarProvider actions={actions}>
            <Component>
                {children}
            </Component>
        </KBarProvider>
    )
}

const Component = ({ children }) => {
    return <>
        <KBarPortal>
            <KBarPositioner className="fixed inset-0 bg-black/80 !p-0 z-[1000]">
                <KBarAnimator className="max-w-lg  mx-10 !mt-64 w-full bg-popover text-foreground shadow-lg border-[1px] rounded-lg overflow-hidden relative !-translate-y-12">
                    <div className="bg-popover">
                        <div className="border-x-0 border-t-0 border-b border flex items-center px-3">
                            <Search className="text-gray-400" />
                            <KBarSearch
                                className="w-full py-4 px-3 text-sm bg-popover outline-none border-none focus:outline-none focus:ring-0 focus:ring-offset-0" />
                        </div>
                    </div>
                    <div className="px-2 py-1 max-h-[300px] overflow-auto">
                        <RenderResult />

                    </div>
                </KBarAnimator>
            </KBarPositioner>
        </KBarPortal>
        {children}
    </>
}
