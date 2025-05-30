import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import "./Style.scss";
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/logo2.png'
import imgavatar from "../../assets/user.png";


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};


class DefaultHeader extends Component {


  logout=()=>{
    localStorage.removeItem("username");
    window.location.reload()
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;


    return (
      <React.Fragment>
        <AppNavbarBrand style={{paddingbottom:200}}
          full={{ src: logo, width: 100, height: 45, alt: 'CoreUI Logo' }}
        />
        <Nav className="d-md-down-none" >
          <UncontrolledDropdown nav direction="down">
            
            <DropdownToggle nav>
              <img src={imgavatar}  className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>

            <DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem ><i className="fa fa-shield"></i>{localStorage.getItem("username")}</DropdownItem>
              <DropdownItem onClick={this.logout}><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>

          </UncontrolledDropdown>
        </Nav>

      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
