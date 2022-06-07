import { Router } from "express";

import feedback from "./feedback";

const router = Router();

// Routes
router.use("/feedback", feedback);

export default router;
