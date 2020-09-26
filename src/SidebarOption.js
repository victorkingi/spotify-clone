import React from "react";
import "./SidebarOption.css";
import {useDataLayerValue} from "./DataLayer";

function SidebarOption({ title, Icon, id, url }) {
    const [, dispatch] = useDataLayerValue();

    const show = (e) => {
        e.preventDefault();
        if (id === "top") {
            dispatch({
                type: 'SHOW_TOP',
                showTop: true
            })
        } else {
            dispatch({
                type: 'SHOW_TOP',
                showTop: false
            });

            if (url) {
                window.location.href = url
            }
        }
    }

    return (
        <div id={id} onClick={show} className="sidebarOption">
            {Icon && <Icon className="sidebarOption_icon" />}
            {Icon ? <h4>{title}</h4> : <p>{title}</p>}
        </div>
    )
}

export default SidebarOption;