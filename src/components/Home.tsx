import React from "react"
import { faLongArrowAltRight, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ListGroup, Card, Button } from 'react-bootstrap'
import { Container, Row, Dropdown, Col } from "react-bootstrap"
import InfoAlert from './SAlerts'
import SPaginator from './SPaginator'
import { BOOK_CARD_FIELDS } from '../const/const_fields';
import { capitalize } from "../utils/general_utils"
import { EMPTY_PHOTO, BASE_PHOTO_URL } from "../const/constants";

interface IProps {
    books: any,
    user: any,
    handleToCart: Function,
    handleShowHome: Function,
    handleShowBookProfile: Function,
    handlePageClick: Function
}

export default class Home extends React.Component<IProps>{

    handlePageClick = (page: any) => {
        this.props.handlePageClick(page);
    }

    handleShowBookProfile = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();

        let book = this.props.books.results.find((item: any) => item.title == ev.currentTarget.innerHTML);
        this.props.handleShowBookProfile(book);
    }

    handleSort = (ek: any, ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();

        this.props.handleShowHome(ek);
    }

    handleToCart = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();

        this.props.handleToCart(ev.currentTarget.value);
    }

    collectCard = (
        data: any,
        fields: string[]) => {
        let listData: any = [];

        fields.map((item, index) => {
            listData.push(
                <ListGroup.Item key={index} className="bg-dark border-0 small">
                    <FontAwesomeIcon icon={faLongArrowAltRight} className="align-middle" />
                    {capitalize(item)}: {data[item] ? data[item] : '----'}
                </ListGroup.Item>
            );
        });

        let lastItemContent, extraClassName = "";

        if (!this.props.user.is_staff) {
            if (data.amount === 0) {
                extraClassName = "disabled"
                lastItemContent = <span className="mx-3">ABSENT</span>
            }
            else {
                lastItemContent = <FontAwesomeIcon icon={faShoppingCart} className="mx-5" />
            }

            listData.push(
                <ListGroup.Item key={data.length + 1} className="bg-dark border-0" >
                    <Button variant="light" className={"btn-lg mx-3 " + extraClassName} onClick={this.handleToCart} value={data.id}>
                        {lastItemContent}
                    </Button>
                </ListGroup.Item>
            );
        }

        return (
            <Col sm={6} md={5} lg={4} xl={3} xs={'auto'} className="my-3 mx-3 align-self-center" >
                <Card >
                    <Card.Img
                        variant="top"
                        src={data.image ? BASE_PHOTO_URL + data.image : EMPTY_PHOTO}
                        className="img-thumbnail img-home"
                    />
                    <Card.Body className="text-white bg-dark">
                        <Card.Title className="text-white py-0 div-link" onClick={this.handleShowBookProfile}>
                            {data.title}
                        </Card.Title>
                        <Card.Text className="ml-2">
                            <ListGroup>
                                {listData}
                            </ListGroup>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        );
    }

    render() {
        if (this.props.books.length === 0)
            return <div></div>

        if (!this.props.books.count)
            return (
                <InfoAlert text={"We haven't books yet."} />
            );

        let fields = BOOK_CARD_FIELDS;
        let cardData: any = [];
        this.props.books.results.forEach((element: any) => {
            cardData.push(this.collectCard(element, fields))
        });

        return (
            <Container fluid>
                <Row className="row justify-content-end">

                    <Dropdown className="mr-5">
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            sort by
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onSelect={this.handleSort} eventKey="year">Year desc</Dropdown.Item>
                            <Dropdown.Item onSelect={this.handleSort} eventKey="-year">Year asc</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onSelect={this.handleSort} eventKey="price">Price desc</Dropdown.Item>
                            <Dropdown.Item onSelect={this.handleSort} eventKey="-price">Price asc</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Row>

                <Row className="justify-content-around pb-0 ">
                    {cardData}
                </Row>

                <SPaginator
                    count={this.props.books.count}
                    prev={this.props.books.previous}
                    next={this.props.books.next}
                    handlePageClick={this.handlePageClick} />
            </Container>

        );
    }
}
