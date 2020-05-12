'use strict';
import Enum from 'easy-enums';
import C from './base/CBase';
import Roles from './base/Roles';
// import LoginWidget from './base/components/LoginWidget';
export default C;

/**
 * app config
 */
C.app = {
	name: "Studio",
	service: "studio",
	logo: "/img/logo.png"
};

C.TYPES = new Enum("User");
C.ROLES = new Enum("user admin");
C.CAN = new Enum("admin");
// setup roles
Roles.defineRole(C.ROLES.user, []);
Roles.defineRole(C.ROLES.admin, C.CAN.values);
