import ReactMarkdown from 'react-markdown';

const LicenseContent = ({ license }) => {
    return (
        <div className="z-20 relative flex flex-col justify-center items-center max-w-[600px] py-2 sm:py-0">
            <h2 className="text-xl font-extrabold pb-2 text-zinc-300 border-b">License</h2>
            <ReactMarkdown className="allow-default">
                {license}
            </ReactMarkdown>
        </div>
    );
};

export default LicenseContent;
