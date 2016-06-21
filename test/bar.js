import test from 'ava'

const a = 10

test('bar', async t => {
  t.pass()
})

test('a is 11', t => {
  t.is(a, 11)
})

