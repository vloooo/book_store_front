import React from 'react'
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap'
import { faShoppingCart, faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalize } from "../utils/general_utils"
import { BOOK_CARD_FIELDS } from '../const/const_fields';
import { BASE_PHOTO_URL, EMPTY_PHOTO } from '../constants';

interface IProps {
    book: any,
    user: any,
    handleToCart: Function,
    handleDeleteBook: Function,
    handleShowEditBookForm: Function
}

export default class BookProfile extends React.Component<IProps> {

    handleDeleteBook = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.props.handleDeleteBook(ev.currentTarget.value);
    }

    handleEditBook = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.props.handleShowEditBookForm(this.props.book)
    }

    handleToCart = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();

        this.props.handleToCart(ev.currentTarget.value);
    }

    collectProfileList = () => {
        let book = this.props.book;
        let listItems: any = [];
        let fields = BOOK_CARD_FIELDS;
        for (let key in fields) {
            listItems.push(<ListGroup.Item className="bg-dark border-0">
                <FontAwesomeIcon icon={faLongArrowAltRight} className="align-middle" />
                {capitalize(fields[key])}: {book[fields[key]] ? book[fields[key]] : '----'}
            </ListGroup.Item>);
        }

        return listItems
    }

    createBtn = (handler: any, context: any) => {
        return (
            <Button variant="light" className="mx-3" onClick={handler} value={this.props.book.id}>
                {context}
            </Button>
        )
    }

    collectNavLinks = () => {
        let links: any = [];
        if (this.props.user.is_staff) {
            links.push(this.createBtn(this.handleDeleteBook, "Delete"));
            links.push(this.createBtn(this.handleEditBook, "Edit"));
        }
        else {
            let content = <FontAwesomeIcon icon={faShoppingCart} className="mx-5" />
            links.push(this.createBtn(this.handleToCart, content));
        }
        return links
    }

    render() {
        let links = this.collectNavLinks();
        let listItems = this.collectProfileList();

        return (
            <Container className="col-12 col-lg-10 col-xl-8 my-auto">
                <Row className="mb-sm row text-white bg-dark p-2 rounded">

                    <Col className=" col-sm mb-4 my-md-auto my-sm-3">
                        <Card.Title>{this.props.book.title}</Card.Title>
                        <Card.Text className="ml-3">
                            <ListGroup variant="flush" className="mt-3">
                                {listItems}
                            </ListGroup>
                        </Card.Text>

                        <Row className="justify-content-end">
                            {links}
                        </Row>
                    </Col>

                    <Col className="bg-light rounded d-flex">
                        <img
                            className="col-sm my-auto mx-auto"
                            src={this.props.book.image ? BASE_PHOTO_URL + this.props.book.image : EMPTY_PHOTO}
                            alt="" />
                    </Col>

                </Row>
            </Container>
        );
    }
}

