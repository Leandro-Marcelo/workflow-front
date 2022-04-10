import React, { useEffect, useState } from "react";
import List from "../components/Team/List";
import AddList from "../components/Team/AddList";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeam, updateList } from "../features/team/teamSlice";
import { DragDropContext } from "react-beautiful-dnd";

const Team = () => {
    const team = useSelector((state) => state.team);
    const dispatch = useDispatch();
    const params = useParams();
    useEffect(() => {
        dispatch(getTeam(params.idTeam));
    }, []);

    const onDragEnd = ({ source, destination }) => {
        console.log(team.lists);
        // dropped outside the list
        console.log(source, destination);
        if (!destination) {
            return;
        }
        /* los droppableId se llaman lista, lista1, lista2, lista3... */
        if (source.droppableId === destination.droppableId) {
            // la lista de origen sería el _id de una lista en específico para luego acceder a su arreglo de tasks
            /*  const listaOrigen = listas[source.droppableId]; */
            // openEnglish.COM
            const originList = team.lists.filter(
                (list) => String(list._id) === source.droppableId
            );
            console.log(`lists:`, team.lists);
            console.log(`hasta acá el mockup esta como está`, team.lists);
            console.log(`Obtengo la lista que se mueve`, originList);
            console.log(
                `Obtengo la tareas de la lista que se mueve`,
                originList[0].tasks
            );

            console.log(
                `tareas de la lista actualizada`,
                reorder(originList[0].tasks, source.index, destination.index)
            );

            const tasksUpdated = reorder(
                originList[0].tasks,
                source.index,
                destination.index
            ).map((task) => task._id);
            console.log(`esto va como tasksUpdated al backend`, tasksUpdated);
            dispatch(updateList({ idList: originList[0]._id, tasksUpdated }));

            /* Ahora solamente tendría que actualizar esta lista reemplazanda tasks: reorder(listSource[0].tasks, source.index, destination.index) y ya estaría */
            console.log(`lists:`, team.lists);
        } else {
            console.log(`No entro acá verdad ctm`);
            const originList = team.lists.filter(
                (list) => String(list._id) === source.droppableId
            );
            const destinationList = team.lists.filter(
                (list) => String(list._id) === destination.droppableId
            );
            console.log(originList, destinationList);

            const [origin, dest] = move(
                originList[0].tasks,
                destinationList[0].tasks,
                source,
                destination
            );
            console.log(`origin`, origin);
            console.log(`dest`, dest);
            const tasksUpdated = origin.map((task) => task._id);
            const tasksUpdated2 = dest.map((task) => task._id);
            console.log(`esto va como tasksUpdated al backend`, tasksUpdated);
            console.log(`esto va como tasksUpdated2 al backend`, tasksUpdated2);
            console.log(`que tiene`, team.lists);
        }
    };

    /* requiere de la lista porque así como la lista uno puede mover su primer elemento del indice 0 al indice 1, tambien lo pueden hacer las demas listas, por eso es importante pasar la lista, es una forma de identificar quien se movio y sabiendo eso poder quitar el elemento (que es un objeto con dos propiedades id y content) y ponerlo en otro lugar dentro de su lista OBVIO */
    /* las tareas */
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        /* hace una copia del array de tareas xd que acá en el ejemplo de tzuzul lo llamo lista */
        /* console.log(result); */
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    /**
     * Moves an item from one list to another list.
     */
    const move = (
        source,
        destination,
        droppableSource,
        droppableDestination
    ) => {
        const sourceClone = Array.from(source);
        const destClone = Array.from(destination);
        /* se saca de su lista, es decir, se elimina de donde se encontraba en su lista */
        const [removed] = sourceClone.splice(droppableSource.index, 1);
        /* y ahora ese elemento que se sacó de su lista, se pone en la otra linea sin eliminar ningun elemento de la nuevo lista de destino */
        destClone.splice(droppableDestination.index, 0, removed);
        /* finalmente retorna las dos listas clone que ya estan listas para solo pegarle un set y era */
        return [sourceClone, destClone];
    };

    return (
        /* bg-[black] */
        <div className="w-full h-screen text-white px-4 py-4 ">
            <div className="flex ">
                <p className="mr-2  bg-white/30 hover:bg-white/40 px-2 py-1">
                    Volver a Equipos
                </p>
                <p className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1">
                    Challenge 1 - ONE
                </p>
                <p className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1">
                    Mostrar Miembros
                </p>
                <p className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1">
                    Agregar Miembros
                </p>
            </div>
            {/* para el 90% en iphone va perfecto */}
            {/* 97% */}
            <div className="flex w-full  h-[90%] lg:h-[95%] justify-start overflow-x-auto mt-4 ">
                {team ? (
                    <DragDropContext onDragEnd={onDragEnd} className="">
                        {team.lists.map((list) => {
                            return (
                                //ojito, hay darle la key al componente y no siempre al coso ese <TrelloList/>
                                <div
                                    className="w-[272px] bg-transparent shrink-0 mr-4"
                                    key={list._id}
                                >
                                    <List list={list} />
                                </div>
                            );
                        })}
                    </DragDropContext>
                ) : (
                    //esto de si no existe la api mostrar un trello list, tiraría error porque no encontraría el Trello lists
                    <h2>No estan llegando las listas de la APIREST</h2>
                )}
                {team && (
                    <div className="w-[272px] shrink-0">
                        <AddList idTeam={team.team._id} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Team;
