import { describe, it, expect } from 'vitest';
import { generateSixDigitCode } from '../../../src/utils/generateCode.util.js';

describe('Generate Code Utility Tests', () => {
  it('debe generar un código de exactamente 6 dígitos numéricos', () => {
    const code = generateSixDigitCode();

    expect(typeof code).toBe('string');
    expect(code).toHaveLength(6);
    expect(code).toMatch(/^\d{6}$/);
  });

  it('debe generar un valor numérico dentro del rango 100000 y 999999', () => {
    const code = generateSixDigitCode();
    const numericValue = Number(code);

    expect(numericValue).toBeGreaterThanOrEqual(100000);
    expect(numericValue).toBeLessThanOrEqual(999999);
  });

  it('debe generar códigos con variación aleatoria', () => {
    const code1 = generateSixDigitCode();
    const code2 = generateSixDigitCode();

    expect(typeof code1).toBe('string');
    expect(typeof code2).toBe('string');
    // En una prueba probabilística estándar entre 900,000 posibilidades dos ejecuciones consecutivas son distintas
    expect(code1).not.toBe(code2);
  });
});
