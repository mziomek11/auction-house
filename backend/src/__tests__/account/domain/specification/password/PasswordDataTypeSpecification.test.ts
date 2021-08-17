import { Password } from '@account/domain';
import { PasswordDataTypeSpecification } from '@account/domain/specification/password';
import { mockValidationSuccess } from '@mocks/utils';
import {
  ValidationError,
  ValidationErrorDataType,
  ValidationErrorType,
} from '@shared-kernel/validation';

let passwordDataTypeSpecification: PasswordDataTypeSpecification;

beforeAll(() => {
  mockValidationSuccess();
});

beforeEach(() => {
  passwordDataTypeSpecification = new PasswordDataTypeSpecification();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('PasswordDataTypeSpecification', () => {
  describe('isSatisfiedBy', () => {
    it('returns true when password is string', () => {
      const login1 = Password.create('123');

      expect(passwordDataTypeSpecification.isSatisfiedBy(login1)).toBe(true);
    });

    it('returns false when password is not string', () => {
      const login1 = Password.create(123 as any);

      expect(passwordDataTypeSpecification.isSatisfiedBy(login1)).toBe(false);
    });
  });

  describe('validationError', () => {
    let validationError: ValidationError;

    beforeEach(() => {
      validationError = passwordDataTypeSpecification.validationError();
    });

    it('should have invalid type type', () => {
      expect(validationError.type).toBe(ValidationErrorType.INVALID_TYPE);
    });

    it('should have 1 detail', () => {
      expect(Object.keys(validationError.details.details).length).toBe(1);
    });

    it('should have type detail equal string', () => {
      expect(validationError.details.details.type).toBe(ValidationErrorDataType.STRING);
    });
  });
});
