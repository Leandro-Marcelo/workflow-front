import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import Google from "../../assets/svg/google.svg";
import { aPost } from "../../axios";
import { Link } from "react-router-dom";

const Providers = () => {
    return (
        <div className="providersContainer">
            <a
                href="http://localhost:4000/auth/google"
                className="buttonProviders"
            >
                <div className="div">
                    <img src={Google} alt="" />

                    <span className="span">with Google</span>
                </div>
            </a>

            {/*  <a
                href="http://localhost:4000/auth/github"
                className="buttonProviders buttonProviderGithub"
            >
                <div className="div divGithub">
                    <GitHubIcon />
                    <span className="span spanGithub">with Github</span>
                </div>
            </a> */}
        </div>
    );
};

export default Providers;
