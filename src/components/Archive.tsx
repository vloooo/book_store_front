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

export default class Archive extends React.Component<IProps>{
    handleCloseOrder = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();

        this.props.handleCloseOrder(ev.currentTarget.value);
    }

    collectFooter = () => {
        return (
            <Row className="justify-content-end">
                <Button variant='outline-light' className="" onClick={this.handleCloseOrder} value='approve'>
                    Approve
                </Button>
                <Button variant='outline-light' className="mx-3" onClick={this.handleCloseOrder} value='cancel'>
                    Cancel
                </Button>
            </Row>
        );
    }

    collectBody = (item: any) => {
        return (
            <Card.Text className="ml-3 mb-3">
                <ListGroup variant="flush" className="mt-3">
                    {this.collectBooksList(item)}
                </ListGroup>

            </Card.Text>
        );
    }

    collectHeader = (item: any) => {

        return (
            <Row>
                <Col xs={8}>
                    <Moment format="D MMM YYYY">
                        {item.order.date}
                    </Moment>
                </Col>
                <Col xs={4} className="ml-auto sm-small">{item.order.sum} $</Col>
            </Row >
        );
    }

    collectCards = () => {
        let orders: any = {};

        this.props.data.forEach((element: any) => {
            if (element.order.id in orders) 
                orders[element.order.id].push(element)
            else 
                orders[element.order.id] = [element]
        });

        let cards: any = [];

        for (let i in orders) {
            let cardContent: any = [];
            cardContent.push(this.collectHeader(orders[i][0]));
            cardContent.push(this.collectBody(orders[i]));

            if (orders[i][0].order.is_active) 
                cardContent.push(this.collectFooter());

            cards.push(
                <Row className="m-3 text-white bg-dark p-2 rounded flex-column col-12">
                    {cardContent}
                </Row>
            );
        }
        return cards.reverse();
    }

    collectBooksList = (items: any) => {
        let listItems: any = [];

        items.forEach((element: any) => {
            listItems.push(<ListGroup.Item key={element.book.id} className="bg-dark border-0">
                <FontAwesomeIcon icon={faLongArrowAltRight} className="align-middle" />
                {capitalize(element.book.title)}: {element.price}$ ({element.amount})
            </ListGroup.Item>);
        });
        return listItems
    }

    render() {

        if (!this.props.data[0]) {
            return (
                <InfoAlert text={"Sorry, You haven't orders yet."} />
            );
        }

        return (
            <Container className="col-sm-12 col-md-8 col-xl-6 d-flex flex-column">
                {this.collectCards()}
            </Container>
        );
    }
}