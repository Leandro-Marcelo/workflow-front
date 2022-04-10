import React from "react";
import AddCard from "./AddCard";
import ListName from "./ListName";
import ListTask from "./ListTask";
import { Droppable } from "react-beautiful-dnd";

const List = ({ list }) => {
    return (
        <div className="bg-[#EBECF0] text-[#172b4d] w-[272px] rounded-[3px]">
            <ListName name={list.name} idList={list._id} />
            {/* overflow-y-auto */}
            <div className="max-h-[50vh] lg:max-h-[70vh] overflow-y-auto">
                {list.tasks.length > 0 && (
                    <Droppable droppableId={String(list._id)}>
                        {(provided, snapshot) => (
                            <div
                                // p-5 mt-5
                                /*  className="bg-green-600" */
                                ref={provided.innerRef}
                            >
                                {list.tasks.map((task, index) => {
                                    return (
                                        <ListTask
                                            task={task}
                                            key={task._id}
                                            index={index}
                                        />
                                    );
                                })}

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                )}
            </div>

            <AddCard idList={list._id} />
        </div>
    );
};

export default List;

/* 


<Droppable droppableId={String(idList)}>
            {(provided, snapshot) => (
                <div
                    // p-5 mt-5 
                    className="bg-green-600  p-5 mt-5 mr-10 space-y-5"
                    ref={provided.innerRef}
                >
                    {list.tasks.length > 0 &&
                    list.tasks.map((task) => {
                        return <ListTask task={task} key={task._id} />;
                    })}
                  
                    {provided.placeholder}
                </div>
            )}
  </Droppable>














*/

/* 



<ListName name={list.name} idList={list._id} />
            <div className="max-h-[50vh] lg:max-h-[70vh] overflow-y-auto">
                {list.tasks.length > 0 &&
                    list.tasks.map((task) => {
                        return <ListTask task={task} key={task._id} />;
                    })}









*/

/* 

asi esta actualmente





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








*/
