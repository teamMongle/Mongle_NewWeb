import React from "react";
import { useNavigate } from "react-router-dom";
// import * as M from "./BackButtonStyle";

const BackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <header
                leftChild={<Button text={"<"} onClick={goBack} />}
            />
        </div>
    );
}

export default BackButton;