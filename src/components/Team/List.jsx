import React from "react";
import AddCard from "./AddCard";
import ListName from "./ListName";
import ListTask from "./ListTask";

const List = ({ list }) => {
    return (
        <div className="bg-[#EBECF0] text-[#172b4d] w-[272px] rounded-[3px]">
            <ListName name={list.name} idList={list._id} />
            <div className="max-h-[50vh] lg:max-h-[70vh] overflow-y-auto">
                {list.tasks.length > 0 &&
                    list.tasks.map((task) => {
                        return <ListTask task={task} key={task._id} />;
                    })}
            </div>

            <AddCard idList={list._id} />
        </div>
    );
};

export default List;
