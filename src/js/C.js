import Enum from 'easy-enums';
import Roles, {defineRole} from './base/Roles';
import C from './base/CBase';

export default C;

/**
 * app config
 */
C.app = {
	name: "The Good-Loop Widget Studio",
	service: "good-loop",
	logo: "/img/logo.png",
	website: "https://good-loop.com",
	facebookAppId: "320927325010346", // https://developers.facebook.com/apps/320927325010346/dashboard/
	privacyPolicy: "https://doc.good-loop.com/privacy-policy.html",
	tsncs: "",
};

C.TYPES = new Enum("Publisher NGO Advert Advertiser User Person Money");
C.ROLES = new Enum("visitor admin");
C.CAN = new Enum("view edit admin sudo");
// setup roles
defineRole(C.ROLES.visitor, [C.CAN.view]);
defineRole(C.ROLES.admin, C.CAN.values);
