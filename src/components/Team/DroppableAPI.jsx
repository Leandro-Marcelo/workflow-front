import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import CustomDroppable from "../components/CustomDroppable";
import CustomDroppableAPI from "../components/CustomDroppableAPI";

export default function DroppableAPI() {
    /* crea un arreglo de 10 posiciones donde contienen undefined => Array.from({length:count}) */
    /* Array.from({ length: count }, (v,k) => k) (basicamente es como si estuviera haciendo un map, basicamente ese callback recibe el element y el indice y cambia los valores de undefined a 0,1,2.... ya que como no es un map, no genera un nuevo arreglo) */
    /* Array.from({ length: count }, (v, k) => k).map((k) => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`,
    })) esto retorna un nuevo arreglo ya que utilizo un map que contiene objetos los cuales contienen 2 propiedades, id y content EJEMPLO DEL RETURN [{id:item-0,content:item-0},{id:item-1,content:item-1}...........]  */

    const getItems = (count, offset = 0) =>
        Array.from({ length: count }, (v, k) => k).map((k) => ({
            /* _id */
            id: `item-${k + offset}`,
            /* name */
            content: `item ${k + offset}`,
        }));

    const mockup = [
        {
            /* el _id que le genera a esta lista se puede repetir como el _id que le genera a una tarea? Tzuzul preguntarle o el _id que le genera a una task se puede repetir para la task de una list diferente? */
            _id: 1,
            name: "list1",
            tasks: [
                { _id: 11, name: "task0" },
                { _id: 12, name: "task1" },
                { _id: 13, name: "task2" },
            ],
        },
        {
            _id: 2,
            name: "list2",
            tasks: [
                { _id: 21, name: "task0" },
                { _id: 22, name: "task1" },
                { _id: 23, name: "task2" },
            ],
        },
        {
            _id: 3,
            name: "list3",
            tasks: [
                { _id: 31, name: "task0" },
                { _id: 32, name: "task1" },
                { _id: 33, name: "task2" },
            ],
        },
    ];

    const [lists, setLists] = useState(mockup);
    /* team.lists[0].lenght */
    console.log(lists);
    const [lista, setLista] = useState(getItems(10));
    const [lista2, setLista2] = useState(getItems(10, 10));
    const [lista3, setLista3] = useState(getItems(10, 20));
    const [lista4, setLista4] = useState(getItems(10, 30));
    const [lista5, setLista5] = useState(getItems(10, 40));
    /* lists */
    const listas = {
        /* id de la lista */
        lista: {
            /* tasks deberia llamarse ó verlo como que es una lista la cual es un array que contiene tareas */
            lista,
            /* dispatch(setLista(idList)) */
            setLista,
        },
        lista2: {
            lista: lista2,
            setLista: setLista2,
        },
        lista3: {
            lista: lista3,
            setLista: setLista3,
        },
        lista4: {
            lista: lista4,
            setLista: setLista4,
        },
        lista5: {
            lista: lista5,
            setLista: setLista5,
        },
    };

    /*     const lists = {
        _idList1: {
           // tasks deberia llamarse ó verlo como que es una lista la cual es un array que contiene tareas
            lista,
          //  dispatch(setLista(idList))
            setLista,
        },
        _idList2: {
            lista: lista2,
            setLista: setLista2,
        },
        _idList3: {
            lista: lista3,
            setLista: setLista3,
        },
    }; */

    const onDragEnd = ({ source, destination }) => {
        console.log(lists);
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
            const originList = lists.filter(
                (list) => String(list._id) === source.droppableId
            );
            console.log(`lists:`, lists);
            console.log(`hasta acá el mockup esta como está`, lists);
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

            /* Ahora solamente tendría que actualizar esta lista reemplazanda tasks: reorder(listSource[0].tasks, source.index, destination.index) y ya estaría */
            console.log(`lists:`, lists);
        } else {
            console.log(`No entro acá verdad ctm`);
            const originList = lists.filter(
                (list) => String(list._id) === source.droppableId
            );
            const destinationList = lists.filter(
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
        <div className="flex bg-red-900">
            <DragDropContext onDragEnd={onDragEnd} className="">
                {/* mapea la cantidad de listas , en mi api seria team.lists y ya xd */}
                {mockup.map((list, index) => {
                    return (
                        <CustomDroppableAPI
                            /* donde la key sería lista, lista2, lista3 y lista4*/
                            key={list._id}
                            /* entra al arreglo de listas, de las 4 listas, entra a la que le corresponde porque esta iterando y de (lista y setlista) le pasa lista que tiene la información como el id y el content */
                            /* le pasa el arreglo de tasks para que los itere y haga draggables */
                            tasks={list.tasks}
                            /* este id contiene lo mismo que comente recién, es el nombre que llevara el droppable, lo cual es muy importante que se llame así, ya que sino tendríamos que modificar la lógica que hicimos recién para reorder ó move */
                            /* tendría que ser el _id */
                            idList={list._id}
                        />
                    );
                })}
            </DragDropContext>
        </div>
    );
}
