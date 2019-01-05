import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  it('Create Filter', () => {
    const pipe = new FilterPipe();
    expect(pipe).toBeTruthy();
  });
});
