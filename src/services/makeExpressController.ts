import { Request, Response } from 'express';
import { Controller, createErrorResponse, HttpResponse } from '../controllers/controller';

export class ExpressControllerFactory {
  create(controllerFactory: () => Controller) {
    return async (req: Request, res: Response): Promise<void> => {
      try {
        const result = await this.processRequest(controllerFactory, req);
        res.status(result.statusCode).json(result.body);
      } catch (error) {
        await this.handleRequestError(res, error);
      }
    };
  }

  private async processRequest(
    controllerFactory: () => Controller,
    req: Request
  ): Promise<HttpResponse> {
    const controller = controllerFactory();
    return controller.handle({
      body: req.body,
      queryParams: req.query,
      params: req.params,
      headers: req.headers
    });
  }

  private async handleRequestError(res: Response, error: unknown): Promise<void> {
    const errorResponse = createErrorResponse(error);
    res.status(errorResponse.statusCode).send(errorResponse.body);
  }
}
