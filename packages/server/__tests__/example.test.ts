const magic = '🪄'

const cast = (spell: string, item: undefined | string) => {
  if (spell.startsWith(magic)) {
    return '🐷'
  }

  return item
}

test('spell casting', () => {
  const result = cast(magic, '🐸')
  expect(result).toBe('🐷')
})
