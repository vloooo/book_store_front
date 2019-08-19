import React from 'react'
import { Container, Row, Navbar, Nav, NavDropdown, Button, Form, FormControl } from 'react-bootstrap'
import { faSignInAlt, faPowerOff, faShoppingBasket, faInbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";

interface IProps {
    user: any,
    handleLogout: Function,
    handleShowCart: Function,
    handleShowArchive: Function,
    handleShowHome: Function,
    active_order: Boolean
}


export default class SHeader extends React.Component<IProps> {
    handleAuthorChoose = (ev: any) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.props.handleShowHome('author', ev.target.elements.author.value);
    }

    handleLogout = (ev: any) => {
        this.props.handleLogout();
    }

    handleShowCart = (ev: any) => {
        this.props.handleShowCart();
    }

    handleShowHome = (ev: any) => {
        this.props.handleShowHome();
    }

    handleShowArchive = (ev: any) => {
        this.props.handleShowArchive();
    }

    collectNavBtn = (icon: any, handler?: any) => {
        return (
            <Nav.Item>
                <Button variant='outline-light' className="border-0" onClick={handler ? handler : ""}>
                    <FontAwesomeIcon icon={icon} />
                </Button>
            </Nav.Item>
        );
    }

    render() {
        let iconNav, userGreeting;

        let icons: any = [];

        if (this.props.user.is_active && !this.props.user.is_staff) {
            icons.push(this.collectNavBtn(faInbox, this.handleShowArchive));
            icons.push(
                <Button
                    variant={this.props.active_order ? "outline-success" : "outline-light"}
                    className="border-0"
                    onClick={this.handleShowCart}>
                    <FontAwesomeIcon icon={faShoppingBasket} />
                </Button>
            );
        }

        if (this.props.user.is_active) {
            userGreeting = <Link to="/profile" className="nav-link">Hi, {this.props.user.username}</Link>
            icons.push(this.collectNavBtn(faPowerOff, this.handleLogout));
        }
        else {
            icons.push(<Link to="/login"> {this.collectNavBtn(faSignInAlt)} </Link>);
        }

        iconNav =
            <Navbar expand variant="dark" className="col-md-3">
                <Row className="ml-md-auto">
                    {icons}
                </Row>
            </Navbar>

        return (
            <Container as='header' fluid className="sticky-top bg-dark">
                <Row>
                    <Navbar expand='md' variant="dark" className="col-12">
                        <Navbar.Brand onClick={this.handleShowHome} href='#'>TestBookStore</Navbar.Brand>
                        <Navbar.Toggle aria-controls="first-nav" />
                        <Navbar.Collapse id="first-nav" >
                            <Nav className="mr-auto">
                                {userGreeting}
                                <Nav.Link href="#" onClick={this.handleShowHome}>Home</Nav.Link>

                                <Form inline onSubmit={this.handleAuthorChoose}>
                                    <FormControl
                                        type="text"
                                        name="author"
                                        placeholder="authors books"
                                        className="mr-sm-2"
                                    />
                                    <Button type="submit" variant="outline-light">Search</Button>
                                </Form>
                            </Nav>
                            {iconNav}
                        </Navbar.Collapse>
                    </Navbar>
                </Row>
            </Container>

        );
    }
}