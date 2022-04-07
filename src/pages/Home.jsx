import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppBarResponsive from "../components/Home/AppBarResponsive";
import Progress from "../components/utilities/Progress";

import Modal from "../components/Home/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
    createAction,
    deleteAction,
    noAction,
    readAllAction,
    updateAction,
} from "../actions/teamActions";
import { aDelete, aGet, aPost } from "../axios";
import TableTeam from "../components/Home/TableTeam";
import ModalDelete from "../components/utilities/ModalDelete";

import Providers from "../components/SignUp/Providers";
import { useParams } from "react-router-dom";

const Home = () => {
    const params = useParams();
    console.log(params);
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { teams } = state.team;

    const [dataToEdit, setDataToEdit] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    /*     let api = helpHttp();
    let url = "http://localhost:5000/santos"; */

    useEffect(() => {
        setLoading(true);
        aGet("/teams")
            .then((res) => {
                //setDb(res);
                dispatch(readAllAction(res.data));
                setError(null);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                dispatch(noAction());
                /* gestionmar el error y mostrar algo, mirar el video de jm para saber que mostraba el */
                /* setError(error); */
                setLoading(false);
            });
    }, []);

    const createData = (team) => {
        console.log(team);
        aPost("/teams", team).then((res) => {
            dispatch(createAction(res.data));
        });
    };

    /*   const updateData = (data) => {
        let endpoint = `${url}/${data.id}`;
        //console.log(endpoint);

        let options = {
            body: data,
            headers: { "content-type": "application/json" },
        };

        api.put(endpoint, options).then((res) => {
            //console.log(res);
            if (!res.err) {
                //let newData = db.map((el) => (el.id === data.id ? data : el));
                //setDb(newData)
                dispatch(updateAction(res));
            } else {
                setError(res);
            }
        });
    }; */

    const deleteTeam = (idTeam) => {
        aDelete("/teams/" + idTeam).then((res) => {
            dispatch(deleteAction(idTeam));
        });
    };
    return (
        <Container sx={{ marginY: 5 }}>
            <div className="flex justify-between mb-4">
                <p className="text-2xl font-semibold md:text-4xl">
                    My Workspace
                </p>
                <Modal
                    createData={createData}
                    /*  updateData={updateData}
                        dataToEdit={dataToEdit}
                        setDataToEdit={setDataToEdit} */
                />
            </div>

            {loading && (
                <div className="center">
                    <Progress />
                </div>
            )}
            {teams && (
                <TableTeam
                    teams={teams}
                    /* setDataToEdit={setDataToEdit} */
                    deleteTeam={deleteTeam}
                />
            )}
        </Container>
    );
};

export default Home;
