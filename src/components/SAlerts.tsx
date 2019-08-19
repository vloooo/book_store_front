import React from "react"
import { Alert } from "react-bootstrap"

interface IProps {
    text: string,
}

export default class InfoAlert extends React.Component<IProps>{

    render() {
        return (
            <Alert variant="info" className="col-10 col-sm-6 mx-auto text-center">
                {this.props.text}
            </Alert>
        );
    }
}