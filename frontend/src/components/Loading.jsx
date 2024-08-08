import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <ClipLoader size={150} color={"#123abc"} loading={true} placeholder="Loading"/>
            <div classname="absolute inset-0 flex justify-center items-center text-xl font-semibold text-[#123abc]">Loading...</div>
        </div>
    );
};

export default Loading;