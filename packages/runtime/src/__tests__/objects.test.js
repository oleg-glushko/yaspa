import { expect, test } from 'vitest';
import { objectsDiff } from '../utils/objects';

test('identical objects are equal', () => {
    const oldObj = { name: 'name' }
    const newObj = { name: 'name' }

    const result = objectsDiff(oldObj, newObj);

    expect(result.added).toEqual([]);
    expect(result.removed).toEqual([]);
    expect(result.updated).toEqual([]);
});

test('property removal is detected', () => {
    const oldObj = { name: 'name' }
    const newObj = {}

    const result = objectsDiff(oldObj, newObj);

    expect(result.added).toEqual([]);
    expect(result.removed).toEqual(['name']);
    expect(result.updated).toEqual([]);
});

test('property addition is detected', () => {
    const oldObj = {}
    const newObj = { name: 'name' }

    const result = objectsDiff(oldObj, newObj);

    expect(result.added).toEqual(['name']);
    expect(result.removed).toEqual([]);
    expect(result.updated).toEqual([]);
});

test('property value update is detected', () => {
    const oldObj = { name: 'name' }
    const newObj = { name: 'noname' }

    const result = objectsDiff(oldObj, newObj);

    expect(result.added).toEqual([]);
    expect(result.removed).toEqual([]);
    expect(result.updated).toEqual(['name']);
});

test('multiple property changes are detected', () => {
    const oldObj = { name: 'name', count: 1, price: 3 }
    const newObj = { name: 'name', count: 2, weight: 3 }

    const result = objectsDiff(oldObj, newObj);

    expect(result.added).toEqual(['weight']);
    expect(result.removed).toEqual(['price']);
    expect(result.updated).toEqual(['count']);
});
