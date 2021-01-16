import { NextFunction, Request, Response } from "express";
import { fromPairs } from "lodash";
import { getConnection } from "typeorm";
import botmaker from "../../botmaker/logic/main";
import { Bot } from "../../entity/Bot";

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const { botData } = req.body;
  const repository = await getConnection().getRepository(Bot);

  const bot = new Bot();
  bot.jsonData = JSON.stringify(botData);
  bot.user = req.body.user;
  await repository.save(bot);

  return res.status(200).json({ id: bot.id, botData: botData });
};

export const save = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  // const { identifier, password } = req.body;
  // const repository = await getConnection().getRepository(User);
};

export const build = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
  const { botData, botName, botToken } = req.body;
  // const repository = await getConnection().getRepository(User);

  const file = botmaker({ botData, botName, botToken });
  console.log(file);
  return res.sendStatus(200);
};