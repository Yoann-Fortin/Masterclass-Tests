import { vi } from "vitest";
import { redirect } from "react-router-dom";

import { PATH } from "../../enum";

const givenALoginAction = () => vi.fn(() => redirect(PATH.HOME));

export default givenALoginAction;
