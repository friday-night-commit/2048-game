import type { Migration } from '../../db';

export const up: Migration = ({ context: queryInterface }) => queryInterface.bulkInsert('theme',
    [{ name: 'dark' },
    { name: 'light' }]
  );

// @ts-ignore
export const down: Migration = ({ context: queryInterface }) => queryInterface.bulkDelete('theme', null, {});