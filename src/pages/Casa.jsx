import React from "react";

const Casa = () => {
    return (
        /* overflow-y-hidden */
        <div className="h-screen bg-[red] flex justify-center items-center">
            <div className="relative trello list bg-green-800 w-[272px] h-[800px] p-4 ">
                <h2 className="">To do</h2>
                <div className="flex flex-col max-h-[729px] overflow-y-scroll">
                    <div className="">task1</div>
                    <div className="">task1</div>
                    <div className="">task1</div>
                    <div className="">task1</div>
                    <div className="">task1</div>
                    <div className="">task1</div>
                    <div className="">task1</div>
                    <div className="">task1</div>
                    <div className="">task1</div>
                    <div className="">task1</div>
                    <div className="">task1</div>
                    <div className="">task1</div>
                    <div className="">task1</div>
                    <div className="">task1</div>
                    <div className="">task1</div>
                    <div className="">task1</div>
                    <div className="">task1</div>
                </div>
                <h2 className="relative">Add Card</h2>
            </div>
        </div>
    );
};

export default Casa;
