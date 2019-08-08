import React, { useState } from "react";
import { Modal, Button } from "antd";
import { Redirect } from "react-router";

interface ISuccessProps {
    visibility: boolean
}

export default ({visibility}: ISuccessProps) => {
    const [redirect, setRedirect] = useState("");
    const viewSetup = () => {
        setRedirect("build");
    }
    const backToStart = () => {
        setRedirect("home");
    }
    if (redirect === "build") {
        return <Redirect push to={`/details/Warden`} />
    } else if (redirect === "home") {
        return <Redirect push to={`/`} />
    } else {
        return (
            <Modal centered={true} title="Finished!" visible={visibility} footer={null}>
                <p>
                    Setup has been succesfully saved!<br />
                    You can now view it in your profile or start anew.
                </p>
                <Button type="primary" onClick={viewSetup}>View saved setup</Button>
                <Button type="default" onClick={backToStart}>Back to start</Button>
            </Modal>
        )
    }
}