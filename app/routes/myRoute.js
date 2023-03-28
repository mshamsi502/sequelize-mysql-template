import { Router } from "express"
import { method1, method2 } from "../controllers/myController.controller.js"
import { create, findAll } from "../controllers/vehicle.controller.js"

export const route = Router()

route.get("/", method1)
route.post("/create", create)
route.post("/findAll", findAll)
route.post("/", method2)
