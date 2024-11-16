import React from 'react'

const Container = ({ children, className }) => {
    return (
        <div className={`w-[calc(100%-20px)] mx-auto 2xl:max-w-[calc(100%-100px)] ${className || ''}`}>
            {children}
        </div>
    )
}

export default Container
