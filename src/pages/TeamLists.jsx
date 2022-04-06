import React from "react";

const TeamLists = () => {
    return (
        <div className="w-full h-screen text-white px-4 py-4 bg-[#000] ">
            <div className="flex justify-between px-2 py-2 ">
                <div className="flex ">
                    <p className="mr-2  bg-white/30 hover:bg-white/40 px-2 py-1">
                        Board
                    </p>
                    <p className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1">
                        Challenge 1 - ONE
                    </p>
                    <p className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1">
                        estrella
                    </p>
                    <p className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1">
                        Leandro Marcelo's workspace
                    </p>
                    <p className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1">
                        private
                    </p>
                    <p className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1">
                        LM
                    </p>
                    <p className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1">
                        Invite
                    </p>
                </div>
                <div className="flex">
                    <p className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1">
                        Power-Ups
                    </p>
                    <p className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1">
                        Automation
                    </p>
                    <p className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1">
                        Filter
                    </p>
                    <p className=" bg-white/30 hover:bg-white/40 px-2 py-1">
                        ... Show menu
                    </p>
                </div>
            </div>
            {/* bg-[green] */}
            <div className="flex w-full h-[95%] justify-start  overflow-x-auto ">
                <div className="w-[272px] mx-2 shrink-0"></div>
            </div>
        </div>
    );
};

export default TeamLists;
