// Найпростіший тест, який завжди проходить
describe('Simple Test Suite', () => {
  test('basic arithmetic works', () => {
    expect(1 + 1).toBe(2);
    expect(2 * 2).toBe(4);
  });

  test('string operations work', () => {
    const text = 'Football Coach';
    expect(text).toContain('Coach');
    expect(text.length).toBe(14);
  });

  test('boolean logic works', () => {
    expect(true).toBe(true);
    expect(false).toBe(false);
  });
});