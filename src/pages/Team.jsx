import React, { useEffect, useState } from "react";
import List from "../components/Team/List";
import AddList from "../components/Team/AddList";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeam } from "../features/team/teamSlice";

const Team = () => {
    const team = useSelector((state) => state.team);
    const dispatch = useDispatch();
    const params = useParams();
    /*     const [teamInfo, setTeamInfo] = useState(null); */
    useEffect(() => {
        dispatch(getTeam(params.idTeam));
        /*  let isCancelled = true;
        aGet("/teams/" + params?.equipo).then((res) => {
            if (isCancelled) {
                console.log(res.data);
                setTeamInfo(res.data);
            }
        });

        return () => {
            isCancelled = false;
        }; */
    }, []);
    console.log(`ya se pusieron?`, team);

    /* type true + Add a card     Enter a title for this card...              type false  + Add another list    Enter a title for this list...   */
    return (
        /* bg-[black] */
        <div className="w-full h-screen text-white px-4 py-4 ">
            {/* <button onClick={fetchPopular} className="text-red-800">
        consumir api
      </button> */}
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
            <div className="flex w-full  h-[90%] lg:h-[95%] justify-start overflow-x-auto mt-4">
                {team ? (
                    team.lists.map((list) => {
                        return (
                            //ojito, hay darle la key al componente y no siempre al coso ese <TrelloList/>
                            <div
                                className="w-[272px] bg-transparent shrink-0 mr-4"
                                key={list._id}
                            >
                                <List list={list} />
                            </div>
                        );
                    })
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
