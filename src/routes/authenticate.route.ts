import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateUserRoutes = Router();

const authenticateUserController = new AuthenticateUserController();

authenticateUserRoutes.post("/sessions", authenticateUserController.handle);

export { authenticateUserRoutes };
