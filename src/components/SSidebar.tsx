import React from 'react'
import { Link } from "react-router-dom";
import { Col, ListGroup, Button } from 'react-bootstrap'

interface IProps {
    user: any,
    handleShowCart: Function,
    handleShowArchive: Function,
    handleShowAdmUsers: Function,
    handleShowAdmBooks: Function
}

export default class SSidebar extends React.Component<IProps> {

    handleShowCart = (ev: any) => {
        this.props.handleShowCart();
    }

    handleShowArchive = (ev: any) => {
        this.props.handleShowArchive();
    }

    handleShowAdmUsers = (ev: any) => {
        this.props.handleShowAdmUsers();
    }

    handleShowAdmBooks = (ev: any) => {
        this.props.handleShowAdmBooks();
    }

    collecLinkItem = (to: string, text: string) => {
        return (
            <Link to={to} className="list-link">
                <ListGroup.Item action className="bg-light border-top border-bottom">
                    {text}
                </ListGroup.Item>
            </Link>
        );
    }

    collectBtnItem = (handler: any, text: string) => {
        return (
            <ListGroup.Item action className="bg-light border-top border-bottom" onClick={handler}>
                {text}
            </ListGroup.Item>
        );
    }

    render() {
        
        let listItems: any = [];
        if (this.props.user.is_active && !this.props.user.is_staff) {
            listItems.push(this.collectBtnItem(this.handleShowCart, "Cart"));
            listItems.push(this.collectBtnItem(this.handleShowArchive, "Orders"));
        }
        if (this.props.user.is_active) {
            listItems.push(this.collecLinkItem("/profile", "Profile"));
        }
        if (this.props.user.is_staff) {
            listItems.push(this.collectBtnItem(this.handleShowAdmUsers, "Users"));
            listItems.push(this.collectBtnItem(this.handleShowAdmBooks, "Books"));
        }
        else {
            listItems.push(this.collecLinkItem("/home", "Books"));
        }

        return (
            <Col className="bg-light border-right" md={3} lg={2} id="sidebar-wrapper">
                <ListGroup variant="flush" className="mt-5">
                    {listItems}
                </ListGroup>
            </Col>
        );
    }
}
