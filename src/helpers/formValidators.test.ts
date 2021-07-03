import { isNotEmpty, isValidEmail, isValidPassword } from './formValidators';

describe('Form validators', () => {
  describe('isNotEmpty', () => {
    it('passes valid case', () => {
      const value = 'foo';
      const result = isNotEmpty(value);
      expect(result).toBeNull();
    });

    it('fails invalid cases', () => {
      const defaultError = 'Please fill out this required field';
      expect(isNotEmpty('')).toBe(defaultError);
      expect(isNotEmpty(null)).toBe(defaultError);
      expect(isNotEmpty(undefined)).toBe(defaultError);
    });
  });

  describe('isValidEmail', () => {
    it('passes null values', () => {
      expect(isValidEmail('')).toBeNull();
    });

    it('passes valid cases', () => {
      expect(isValidEmail('billy@hotmail.com')).toBeNull();
      expect(isValidEmail('billy.nomates@hotmail.com')).toBeNull();
      expect(isValidEmail('billy@hotmail.co.uk')).toBeNull();
      expect(isValidEmail('billy+1@hotmail.co.uk')).toBeNull();
      expect(isValidEmail('billy@tray.io')).toBeNull();
      expect(isValidEmail('billy@tray-spruance.io')).toBeNull();
      expect(isValidEmail('billy123@tray.io')).toBeNull();
      expect(
        isValidEmail('billy.nomates.how.many.dots.do.you.want@tray.io'),
      ).toBeNull();
    });

    it('fails invalid cases', () => {
      const defaultError = 'Please enter a valid email address';
      expect(isValidEmail('billy@co')).toBe(defaultError);
      expect(isValidEmail('billy@hotmail.c')).toBe(defaultError);
      expect(isValidEmail('billy@hotmail1.c')).toBe(defaultError);
      expect(isValidEmail('🤮@hotmail.com')).toBe(defaultError);
    });
  });

  describe('isValidPassword', () => {
    it('passes valid cases', () => {
      expect(isValidPassword('forBARbaz1')).toBeNull();
    });

    it('fails cases on length', () => {
      expect(isValidPassword('fB1')).toBe(
        'Please enter a password containing at least 9 characters',
      );
    });

    it('fails cases on missing number', () => {
      expect(isValidPassword('abcdABCDE')).toBe(
        'Please enter a password containing at least one number',
      );
    });

    it('fails cases on lack of mixed case characters', () => {
      expect(isValidPassword('abcd12345')).toBe(
        'Please enter a password containing both upper and lower case letters',
      );
      expect(isValidPassword('1234567a!')).toBe(
        'Please enter a password containing both upper and lower case letters',
      );
    });

    it('produces reasonable messages for multiple errors', () => {
      expect(isValidPassword('a')).toBe(
        'Please enter a password containing at least 9 characters, at least one number and both upper and lower case letters',
      );
      expect(isValidPassword('a1')).toBe(
        'Please enter a password containing at least 9 characters and both upper and lower case letters',
      );
      expect(isValidPassword('aB')).toBe(
        'Please enter a password containing at least 9 characters and at least one number',
      );
      expect(isValidPassword('aaaaaaaaa')).toBe(
        'Please enter a password containing at least one number and both upper and lower case letters',
      );
    });
  });
});
