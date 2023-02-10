import { ParamsDictionary, Query } from "express-serve-static-core";
import { Request, Response } from "express";

type MessagingWebhookBody = {
  MessageId: string;
  Body: string;
  From: string;
  To: string;
};

export type MessagingRequest = Request & {
  params: ParamsDictionary;
  query: Query;
  body: MessagingWebhookBody;
};
