import React from "react"
import { Container, Table, Button } from "react-bootstrap"
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createHeader } from "../utils/tableUtils"
import { USER_PROFILE_FIELDS } from '../const/const_fields';
import InfoAlert from './SAlerts'
import SPaginator from './SPaginator'

interface IProps {
    users: any,
    handleDeleteUser: Function,
    handlePageClick: Function
}

export default class UsersTable extends React.Component<IProps>{

    handlePageClick = (page: any) => {
        this.props.handlePageClick(page);
    }

    handleDeleteUser = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.props.handleDeleteUser(ev.currentTarget.value)
    }

    collectRow = (data: any,
        fields: string[],
        del_handler: any) => {

        let rowData: any = [];
        fields.map((item, index) => {
            rowData.push(
                <td  className={index > 1 ? "text-center" : ""}>
                    {index < 2 ? data.user[item] : (data[item] ? data[item] : "----")}
                </td>)
        })

        if (!data.user.is_staff) {
            rowData.push(
                <td className="text-center">
                    <Button variant='outline-dark' className="border-0" onClick={del_handler} value={data.user.id}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </td>)
        }
        else{
            rowData.push(<td key={data.length + 1}></td>)
        }

        return <tr>{rowData}</tr>;
    }

    render() {
        if (this.props.users.length === 0 || !('user' in this.props.users.results[0]))
            return <div></div>

        if (!this.props.users.count)
            return (
                <InfoAlert text={"We haven't users yet."} />
            );

        let fields = USER_PROFILE_FIELDS;
        let tableData: any = [];
        this.props.users.results.forEach((element: any) => {
            tableData.push(this.collectRow(element, fields, this.handleDeleteUser))
        });

        fields = fields.concat([''])
        let tableHeader = createHeader(fields);

        return (
            <Container fluid>

                <Table hover className="mb-5">
                    <thead className="thead-light">
                        {tableHeader}
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </Table>
                
                <SPaginator
                    count={this.props.users.count}
                    prev={this.props.users.previous}
                    next={this.props.users.next}
                    handlePageClick={this.handlePageClick} />
            </Container>
        );
    }
}