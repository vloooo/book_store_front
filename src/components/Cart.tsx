import React from "react"
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import InfoAlert from './SAlerts'
import { capitalize } from "../utils/general_utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, ListGroup, Card, Col, Button } from 'react-bootstrap'
import Moment from 'react-moment'

interface IProps {
    data: any,
    handleCloseOrder: Function
}

export default class Cart extends React.Component<IProps>{

    handleCloseOrder = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();

        this.props.handleCloseOrder(ev.currentTarget.value);
    }


    collectBooksList = () => {
        let listItems: any = [];

        this.props.data.forEach((element: any) => {
            listItems.push(<ListGroup.Item key={element.book.id} className="bg-dark border-0">
                <FontAwesomeIcon icon={faLongArrowAltRight} className="align-middle" />
                {capitalize(element.book.title)}: {element.price}$ ({element.amount})
            </ListGroup.Item>);
        });
        return listItems
    }

    render() {

        if (!this.props.data[0])
            return (
                <InfoAlert text={"Sorry, You haven't active orders."} />
            );

        return (
            <Container className="col-sm-12 col-md-8 col-xl-6">
                <Row className="mb-3 text-white bg-dark p-2 rounded flex-column">

                    <Row>
                        <Col xs={8}>
                            <Moment format="D MMM YYYY">
                                {this.props.data[0].order.date}
                            </Moment>
                        </Col>
                        <Col xs={4} className="ml-auto sm-small">
                            {this.props.data[0].order.sum}
                        </Col>
                    </Row >

                    <Card.Text className="ml-3">
                        <ListGroup variant="flush" className="mt-3">
                            {this.collectBooksList()}
                        </ListGroup>
                    </Card.Text>

                    <Row className="justify-content-end">
                        <Button variant='outline-light' className="" onClick={this.handleCloseOrder} value='approve'>
                            Approve
                        </Button>
                        <Button variant='outline-light' className="mx-3" onClick={this.handleCloseOrder} value='cancel'>
                            Cancel
                        </Button>
                    </Row>

                </Row>
            </Container>
        );
    }
}