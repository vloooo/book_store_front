import React, { Component } from 'react';
import SHeader from './components/SHeader'
import SSidebar from './components/SSidebar'
import UsersTable from './components/UsersTable'
import BooksTable from './components/BookTable'
import Home from './components/Home'
import Cart from './components/Cart'
import Archive from './components/Archive'
import BookEdit from './components/BookEdit'
import { TOKEN, GUEST as GUEST, DEFAULT_BOOK, DEFAULT_DATA } from './constants'
import UserProfileCard from './components/UserProfileCard'
import BookProfile from './components/BookProfile'
import './index.css'
import { Container, Row, Col } from 'react-bootstrap'
import { Switch, Route, withRouter } from "react-router-dom";
import {
  // getAdminBooks, 
  getAdminUsers, getCart, getArchive,
  getUser, getBook, toCart, closeOrder, getBooks, delUser, delBook, setLogout
} from './utils/DButil'
import SignUp from './components/SignUp';
import Login from './components/Login';
import EditUser from './components/EditUser';

interface IProps {
  history: any,
  location: any,
  match: any
}

interface IState {
  cur_user: Object,
  data: any,
  cur_book: any,
  active_order: Boolean,
  book_mod: any,
  page: number
}

class App extends React.Component<IProps, IState> {

  state = {
    cur_user: GUEST,
    cur_book: DEFAULT_BOOK,
    active_order: false,
    data: DEFAULT_DATA,
    book_mod: {
      filter: '',
      name: ''
    },
    page: 1
  }

  handlePageClick = (page: any) => {

    this.setState({ page: page });
    if (this.state.data.results[0].title)
      getBooks(
        this.state.book_mod.filter,
        this.state.book_mod.name,
        page
        ).then(data => { this.setState({ data: data }) });
    else
      getAdminUsers(page).then(data => { this.setState({ data: data }) });
  }

  handleShowBookProfile = (book: any) => {
    this.setState({ cur_book: book });
    this.props.history.push("/book/profile");
  }

  handleAddBook = () => {
    this.setState({ cur_book: false });
    this.props.history.push("/book/edit");
  }

  handleToCart = (id: any) => {
    this.setState({ active_order: true });
    toCart(id).then(data => alert(data.detail))
  }

  handleCloseOrder = (action: string) => {
    this.setState({ active_order: false });

    let body;
    if (action == 'approve')
      body = { 'approve': true };
    else
      body = { 'cancel': true };

    closeOrder(body).then(data => alert(data.detail))
    this.props.history.push("/home");
  }

  handleShowAdmBooks = () => {
    getBooks().then(data => { this.setState({ data: data }) });
    this.props.history.push('/admin/books');
  }

  handleShowAdmUsers = () => {
    getAdminUsers().then(data => { this.setState({ data: data }) });
    this.props.history.push('/admin/users');
  }

  handleDeleteUser = (id: any) => {
    delUser(id).then(data => alert(data.detail))
    getAdminUsers().then(data => { this.setState({ data: data }) });
  }

  handleUserEdit = (response: any) => {
    this.setState({ cur_user: response.user })
    alert('Sucesfully, edited');
    this.props.history.push('/profile');
  }

  handleEditBook = (response: any) => {
    this.setState({ cur_book: response });
    alert('Sucesfully, edited');
    this.props.history.push('/book/profile');
  }

  handleDeleteBook = (id: any) => {
    delBook(id).then(data => alert(data.detail)).catch(err => console.log(err))
    alert('Sucesfully, deleted.');
    getBooks({ ...{ page: this.state.page } }).then(data => { this.setState({ data: data }) });
  }

  handleShowEditBookForm = (book: any) => {
    this.setState({ cur_book: book });
    this.props.history.push('/book/edit');
  }

  handleLogin = (response: any) => {
    localStorage.setItem(TOKEN, 'Token ' + response.token);
    this.setState({ cur_user: response.user })
    this.props.history.push('/home');
  }

  handleLogout = () => {
    setLogout().then(data => alert(data.detail))
    localStorage.clear();
    this.setState({ cur_user: GUEST });
    this.props.history.push('/home');
  }

  handleShowCart = () => {
    getCart().then(data => { this.setState({ data: data }) });
    this.props.history.push('/cart');
  }

  handleShowArchive = () => {
    getArchive().then(data => { this.setState({ data: data }) });
    this.props.history.push('/archive');
  }

  handleShowHome = (fltr: any = false, a_name?: any) => {
    this.setState({
      book_mod: {
        filter: fltr,
        name: a_name
      }
    });

    getBooks(fltr,a_name).then(data => { this.setState({ data: data }) });
    this.props.history.push('/home');
  }

  componentDidMount = () => {
    getBooks().then(data => { this.setState({ data: data }) });
    getUser().then(data => { this.setState({ cur_user: data }) });
  }

  render() {
    return (
      <div className="App">
        <SHeader
          user={this.state.cur_user.user}
          handleLogout={this.handleLogout}
          handleShowHome={this.handleShowHome}
          handleShowCart={this.handleShowCart}
          handleShowArchive={this.handleShowArchive}
          active_order={this.state.active_order}
        />

        <Container fluid>
          <Row>
            <SSidebar user={this.state.cur_user.user}
              handleShowCart={this.handleShowCart}
              handleShowArchive={this.handleShowArchive}
              handleShowAdmUsers={this.handleShowAdmUsers}
              handleShowAdmBooks={this.handleShowAdmBooks}
            />

            <Container className="d-flex pt-3" id="content-wrapper" fluid>
              <Col xs={10} sm={11} md={{ span: 9, offset: 3 }} lg={{ span: 10, offset: 2 }} className="my-auto" id="content">
                <Switch>

                  <Route path='/book/profile' exact render={
                    () => <BookProfile book={this.state.cur_book}
                      user={this.state.cur_user.user}
                      handleShowEditBookForm={this.handleShowEditBookForm}
                      handleToCart={this.handleToCart}
                      handleDeleteBook={this.handleDeleteBook} />
                  } />

                  <Route path='/profile' exact render={
                    () => <UserProfileCard user={this.state.cur_user} />
                  } />

                  <Route path='/admin/users' exact render={
                    () => <UsersTable users={this.state.data}
                      handleDeleteUser={this.handleDeleteUser}
                      handlePageClick={this.handlePageClick} />
                  } />

                  <Route path='/admin/books' exact render={
                    () => <BooksTable books={this.state.data}
                      handleShowEditBookForm={this.handleShowEditBookForm}
                      handleDeleteBook={this.handleDeleteBook}
                      handleShowBookProfile={this.handleShowBookProfile}
                      handleAddBook={this.handleAddBook}
                      handlePageClick={this.handlePageClick} />
                  } />

                  <Route path='/home' exact render={
                    () => <Home
                      books={this.state.data}
                      user={this.state.cur_user.user}
                      handleToCart={this.handleToCart}
                      handleShowHome={this.handleShowHome}
                      handleShowBookProfile={this.handleShowBookProfile}
                      handlePageClick={this.handlePageClick} />

                  } />

                  <Route path='/cart' exact render={
                    () => <Cart data={this.state.data}
                      handleCloseOrder={this.handleCloseOrder} />
                  } />

                  <Route path='/archive' exact render={
                    () => <Archive data={this.state.data}
                      handleCloseOrder={this.handleCloseOrder} />
                  } />

                  <Route path='/book/edit' exact render={
                    () => <BookEdit book={this.state.cur_book}
                      handleEdit={this.handleEditBook} />
                  } />

                  <Route path='/book/add' exact render={
                    () => <BookEdit
                      handleEdit={this.handleAddBook} />
                  } />

                  <Route path='/signup' exact render={
                    () => <SignUp handleReg={this.handleLogin} />
                  } />

                  <Route path='/login' exact render={
                    () => <Login handleLogin={this.handleLogin} />
                  } />

                  <Route path='/user/edit' exact render={
                    () => <EditUser
                      handleEdit={this.handleUserEdit}
                      user={this.state.cur_user}
                    />
                  } />

                </Switch>
              </Col>
            </Container>

          </Row>
        </Container>
      </div>
    );
  }
}

export default withRouter(App);