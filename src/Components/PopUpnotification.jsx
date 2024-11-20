import React from "react";

const ConfirmModel = ({message,onConfirm,onCancel})=>(
    <div>
        <div>
            <p>{message}</p>
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    </div>
);
export default ConfirmModel