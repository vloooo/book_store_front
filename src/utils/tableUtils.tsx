import React from 'react'
import { Button } from "react-bootstrap"
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalize } from "./general_utils"

export function createHeader(fields: any) {

    return (<tr>
        {fields.map((item: string, index: number) => (
            <th key={index} className="text-center">{item ? capitalize(item) : ""}</th>
        ))}
    </tr>);
}

export function collectRow(
    data: any,
    fields: string[],
    del_handler: any,
    edit_handler: any,
    show_handler: any) {

    let rowData: any = [];

    fields.map((item, index) => {
        rowData.push(
            <td key={index} className={index > 0 ? "text-center div-link" : "div-link"} onClick={show_handler}>
                {data[item] ? data[item] : '----'}
            </td>)
    })

    rowData.push(
        <td key={data.length + 1} className="text-center">
            <Button variant='outline-dark' className="border-0" onClick={del_handler} value={data.id}>
                <FontAwesomeIcon icon={faTrash} />
            </Button>
        </td>
    );

    if (edit_handler) {
        rowData.push(
            <td key={data.length + 2} className="text-center">
                <Button variant='outline-dark' className="border-0" onClick={edit_handler} value={data.id}>
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
            </td>
        );
    }


    return <tr key={data.id}>{rowData}</tr>
}