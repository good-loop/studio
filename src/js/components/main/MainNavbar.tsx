import React, { FC } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const MainNavbar: FC = () => {
	return (
		<Navbar color="dark" dark>
			<NavbarBrand href="/">Studio</NavbarBrand>
			<Nav className="mr-auto" navbar>
				<NavItem>
					<NavLink href="/">Widgets</NavLink>
				</NavItem>
			</Nav>
		</Navbar>
	);
};

export default MainNavbar;
