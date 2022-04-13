import React, { useEffect, useState } from "react";
import List from "../components/Team/List";
import AddList from "../components/Team/AddList";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    getTeam,
    updateList,
    updateLists,
    updateListsOrder,
} from "../features/team/teamSlice";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Members from "../components/Team/Members";

const Team = () => {
    const team = useSelector((state) => state.team);
    const auth = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    useEffect(() => {
        if (!auth.logged) navigate("/login");
    }, [auth]);
    useEffect(() => {
        dispatch(getTeam(params.idTeam));
    }, []);

    const onDragEnd = ({ source, destination, type }) => {
        console.log(team.lists);
        // dropped outside the list
        console.log(source, destination);

        if (!destination) {
            console.log(
                `primera validación, lo droppeo en un lugar que no existe droppable`
            );
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            console.log(
                `segunda validación, lo droppeo en el mismo lugar que estaba`
            );
            return;
        }

        if (type === "column") {
            console.log(`Tercera validación, esta moviendo entre listas`);

            //  columnOrder: ["column-1", "column-2"],
            //  hace una copia de mockup.columnOrder
            let newListsOrder = Array.from(team.listsOrder);
            console.log(newListsOrder);
            // elimina esa lista en el array de newColumnOrder y esa lista que quito la guarda en remove
            let [remove] = newListsOrder.splice(source.index, 1);
            // para luego añadirla en la posición de destination.index sin eliminar ningun elemento, simplemente agregarlo
            newListsOrder.splice(destination.index, 0, remove);
            console.log(`newListsOrder`, newListsOrder);
            /* Me puede servir saber esta lógica */
            /*  let toObject = { ...newListsOrder };
            console.log(toObject); */

            dispatch(
                updateListsOrder({
                    idTeam: params.idTeam,
                    newListsOrder,
                })
            );
            /*    const newState = {
                ...mockup,
                columnOrder: newColumnOrder,
            };

            setMockup(newState); */
            //si no ponemos este return, va a entrar a la siguiente validación y eso causará errores
            return;
        }

        /* los droppableId se llaman lista, lista1, lista2, lista3... */
        if (source.droppableId === destination.droppableId) {
            console.log(
                `Cuarta validación, esta moviendo una tarea entre lista que pertenece`
            );

            // la lista de origen sería el _id de una lista en específico para luego acceder a su arreglo de tasks
            /*  const listaOrigen = listas[source.droppableId]; */
            // openEnglish.COM
            const originList = team.lists.filter(
                (list) => String(list._id) === source.droppableId
            );
            /*  console.log(`lists:`, team.lists);
            console.log(`hasta acá el mockup esta como está`, team.lists);
            console.log(`Obtengo la lista que se mueve`, originList);
            console.log(
                `Obtengo la tareas de la lista que se mueve`,
                originList[0].tasks
            ); */

            /* console.log(
                `tareas de la lista actualizada`,
                reorder(originList[0].tasks, source.index, destination.index)
            ); */

            const tasksUpdated = reorder(
                originList[0].tasks,
                source.index,
                destination.index
            ).map((task) => task._id);
            /* console.log(`esto va como tasksUpdated al backend`);
            console.log({ idList: originList[0]._id, tasksUpdated }); */
            dispatch(updateList({ idList: originList[0]._id, tasksUpdated }));

            /* Ahora solamente tendría que actualizar esta lista reemplazanda tasks: reorder(listSource[0].tasks, source.index, destination.index) y ya estaría */
            /*  console.log(`lists:`, team.lists); */
        } else {
            console.log(`No entro acá verdad ctm`);

            const originList = team.lists.filter(
                (list) => String(list._id) === source.droppableId
            );
            const destinationList = team.lists.filter(
                (list) => String(list._id) === destination.droppableId
            );
            /* console.log(`source`, source.index); */
            console.log(
                `tarea que se movió`,
                originList[0].tasks[source.index]
            );
            /* console.log(originList, destinationList); */

            const [origin, dest] = move(
                originList[0].tasks,
                destinationList[0].tasks,
                source,
                destination
            );
            /* obtener la tarea que se movio */
            /* originList[0].tasks.filter((task) => task._id !== ) */

            console.log(`origin`, origin);
            console.log(`dest`, dest);
            const tasksUpdated = origin.map((task) => task._id);
            const tasksUpdated2 = dest.map((task) => task._id);
            console.log(`esto va como tasksUpdated al backend`, tasksUpdated);
            console.log({ idList: originList[0]._id, tasksUpdated });
            console.log(`esto va como tasksUpdated2 al backend`, tasksUpdated2);
            console.log({ idList: destinationList[0]._id, tasksUpdated2 });
            dispatch(
                updateLists({
                    idList1: originList[0]._id,
                    tasksUpdated,
                    idList2: destinationList[0]._id,
                    tasksUpdated2,
                    idTask: originList[0].tasks[source.index]._id,
                })
            );
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

    const goBack = () => {
        navigate(-1);
    };

    return (
        /* bg-[black] */
        /* Volver a equipos, Junior Frontend, Mostrar Miembros, Agregar Miembros, porque existían projectos xd */
        <div className="w-full h-screen text-white px-4 py-4 bg-[#172b4d]">
            <div className="flex ">
                <p
                    className="mr-2  bg-white/30 hover:bg-white/40 px-2 py-1 cursor-pointer"
                    onClick={goBack}
                >
                    Volver a Equipos
                </p>
                <p className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1">
                    {team && team.team.name}
                </p>
                <Members team={team} />
                <p className="mr-2 bg-white/30 hover:bg-white/40 px-2 py-1">
                    {/* lo ideal sería que no se pueda volver agregar al mismo usuario */}
                    Agregar Usuario
                </p>
            </div>
            {/* para el 90% en iphone va perfecto */}
            {/* 97% */}
            {/* h-[90%] lg:h-[95%]  */}
            {/* LISTS AND ADD LIST */}
            {/* flex w-full  justify-start overflow-x-auto mt-4 */}
            <div className="flex w-full  h-[90%] lg:h-[95%] justify-start overflow-x-auto mt-4">
                {team ? (
                    <DragDropContext onDragEnd={onDragEnd} className="">
                        <Droppable
                            droppableId="all-columns"
                            direction="horizontal"
                            type="column"
                        >
                            {(provided) => (
                                /* lists */
                                <div
                                    /* flex w-full  justify-start overflow-x-auto mt-4 */
                                    className="flex"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {team.lists.map((list, index) => {
                                        console.log(list);
                                        return (
                                            //ojito, hay darle la key al componente y no siempre al coso ese <TrelloList/>
                                            <List
                                                list={list}
                                                idTeam={team.team._id}
                                                index={index}
                                                key={list._id}
                                            />
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                ) : (
                    //esto de si no existe la api mostrar un trello list, tiraría error porque no encontraría el Trello lists
                    <h2>No estan llegando las listas de la APIREST</h2>
                )}
                {team && (
                    /* shrink-0 */
                    /* Add list */
                    <div className="w-[272px] shrink-0 ">
                        <AddList idTeam={team.team._id} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Team;
