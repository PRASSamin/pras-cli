import React, { useMemo, useRef, Fragment } from 'react'

const ResultItems = ({ action, active, rootActionId }) => {
    const ancestors = useMemo(() => {
        if (!rootActionId) return action.ancestors;
        const index = action.ancestors.findIndex((ancestor) => ancestor.id === rootActionId);
        return action.ancestors.slice(index + 1);
    }, [action.ancestors, rootActionId]);

    const ref = useRef();
    return (
        <div
            ref={ref}
            className={`px-2 text-sm py-3 flex items-center justify-between cursor-pointer rounded relative z-10 ${active ? "bg-accent text-white" : "text-gray-300"
                }`}
        >
            {active && (
                <div
                    className="absolute inset-0 bg-accent
                     border-l-[3px] border-purple-500"
                />
            )}

            <div className='flex gap-2 items-center relative z-10'>
                {action.icon && action.icon}
                <div className='flex flex-col'>
                    <div>
                        {ancestors.length > 0 && (
                            ancestors.map((ancestor) => (
                                <Fragment key={ancestor.id}>
                                    <span className='opacity-50 mr-2'>{ancestor.name}</span>
                                    <span className='mr-2'>&rsaquo;</span>
                                </Fragment>
                            ))
                        )}
                        <span>{action.name}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

ResultItems.displayName = 'ResultItems';

export default ResultItems