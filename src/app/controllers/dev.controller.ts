import { sequelize } from "@configs/database";
import { User } from "@models/user.model";
import { Request, Response } from "express";

export class DevController {
  index(req: Request, res: Response) {
    res.send("Dev Index");
  }
  show(req: Request, res: Response) {
    res.send(`Show Dev ${req.params.id}`);
  }
  new(req: Request, res: Response) {
    res.send("New Dev Form");
  }
  edit(req: Request, res: Response) {
    res.send(`Edit Dev ${req.params.id}`);
  }

  async create(req: Request, res: Response) {
    try {
      const user = await User(sequelize).create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      return res.json(user);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  update(req: Request, res: Response) {
    res.send(`Update Dev ${req.params.id}`);
  }
  destroy(req: Request, res: Response) {
    res.send(`Delete Dev ${req.params.id}`);
  }
}

export const devController = new DevController();
