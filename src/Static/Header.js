import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ComboboxLG from '../Components/ComboboxLG';
import { TData } from './TranslateData';
import { useContext } from 'react';
import { TranslateContext } from './TranslateContext';
import { Link } from 'react-router-dom';

export default function Header() {
  var { Lang } = useContext(TranslateContext)
  var Data = TData.filter((el)=>el.lang == Lang)[0]
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className='title'>
          {TData.filter((d) => d.lang == Lang)[0].siteTitle}
        </Navbar.Brand>
        <ComboboxLG />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">

          <Nav>
            <Link  className='nav-link' to={'/'}>{Data.menu[0].name}</Link>
            <Link className='nav-link' to={'/interactive_games'}>{Data.menu[1].name}</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
