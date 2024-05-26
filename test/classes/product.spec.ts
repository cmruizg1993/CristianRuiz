import { Product } from '../../src/app/classes/product';

describe('Product Class', () => {
  it('should create an instance', () => {
    expect(new Product('','','','','','')).toBeTruthy();
  });
});