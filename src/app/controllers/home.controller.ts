import { Request, Response } from 'express';

export class HomeController {
  index = (req: Request, res: Response) => {
    res.render('index', { title: 'NodeJS MVC with TypeScript, SQLite, and EJS' });
  }
}

export const homeController = new HomeController();
