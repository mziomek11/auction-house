import { ICommandDispatcher } from '@shared-kernel/command';

export interface MockCommandDispatcher extends ICommandDispatcher {
  mockDispatch: jest.Mock;
}

export const mockCommandDispatcher = (): MockCommandDispatcher => {
  const mockDispatch = jest.fn();

  return {
    dispatch: mockDispatch,
    mockDispatch,
  };
};
