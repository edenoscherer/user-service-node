import { ExpressControllerFactory } from '../../../src/services/expressControllerFactory';
import { Request, Response } from 'express';
import { HttpRequest } from '../../../src/controllers/controller';

describe('ExpressControllerFactory', () => {
  let factory: ExpressControllerFactory;

  beforeEach(() => {
    factory = new ExpressControllerFactory();
  });

  it('should create express middleware that adapts controller', async () => {
    const mockController = {
      handle: jest.fn().mockResolvedValue({
        statusCode: 200,
        body: { data: 'test' }
      })
    };

    const middleware = factory.create(() => mockController);

    const req = {
      body: { test: 'data' },
      query: { page: '1' },
      params: { id: '123' },
      headers: { 'content-type': 'application/json' }
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    await middleware(req, res);

    const expectedHttpRequest: HttpRequest<unknown> = {
      body: { test: 'data' },
      queryParams: { page: '1' },
      params: { id: '123' },
      headers: { 'content-type': 'application/json' }
    };

    expect(mockController.handle).toHaveBeenCalledWith(expectedHttpRequest);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ data: 'test' });
  });

  it('should handle controller errors and return 500 status', async () => {
    const mockController = {
      handle: jest.fn().mockRejectedValue(new Error('Test error'))
    };

    const middleware = factory.create(() => mockController);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    await middleware(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Error',
      message: 'Test error'
    });
  });

  it('should handle requests without optional properties', async () => {
    const mockController = {
      handle: jest.fn().mockResolvedValue({
        statusCode: 204,
        body: null
      })
    };

    const middleware = factory.create(() => mockController);

    const req = {
      body: {},
      headers: {}
    } as unknown as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    await middleware(req, res);

    const expectedHttpRequest: HttpRequest<unknown> = {
      body: {},
      queryParams: undefined,
      params: undefined,
      headers: {},
      user: undefined
    };

    expect(mockController.handle).toHaveBeenCalledWith(expectedHttpRequest);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith(null);
  });
});
