import { Link } from "react-router-dom";

import PATH from "../../../enum/path.enum";
import LABEL from "../../../enum/label.enum";

export default function NavItem() {
	return <Link to={PATH.LOGIN}>{LABEL.CONNECTION}</Link>;
}