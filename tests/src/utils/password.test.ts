import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword } from '../../../src/utils/password.util.js';

describe('Password Utility Tests', () => {
  const password1 = 'ClaveUno123!';
  const password2 = 'ClaveDos456!';

  it('debe generar hashes no vacíos y distintos de su contraseña original', async () => {
    const hash1 = await hashPassword(password1);
    const hash2 = await hashPassword(password2);

    // Verificación de que son cadenas no vacías
    expect(typeof hash1).toBe('string');
    expect(hash1.length).toBeGreaterThan(0);
    expect(typeof hash2).toBe('string');
    expect(hash2.length).toBeGreaterThan(0);

    // Verificación de que no son iguales al texto plano
    expect(hash1).not.toBe(password1);
    expect(hash2).not.toBe(password2);

    // Verificación de que dos contraseñas distintas producen hashes distintos
    expect(hash1).not.toBe(hash2);
  });

  it('debe devolver true al comparar las contraseñas correctas con sus respectivos hashes', async () => {
    const hash1 = await hashPassword(password1);
    const hash2 = await hashPassword(password2);

    const match1 = await comparePassword(password1, hash1);
    const match2 = await comparePassword(password2, hash2);

    expect(match1).toBe(true);
    expect(match2).toBe(true);
  });

  it('debe devolver false al comparar contraseñas incorrectas cruzadas', async () => {
    const hash1 = await hashPassword(password1);
    const hash2 = await hashPassword(password2);

    // Comparación cruzada: contraseña 2 contra hash 1, y contraseña 1 contra hash 2
    const mismatch1 = await comparePassword(password2, hash1);
    const mismatch2 = await comparePassword(password1, hash2);

    expect(mismatch1).toBe(false);
    expect(mismatch2).toBe(false);
  });
});
