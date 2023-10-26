export default {
  '*.{md,prisma,yaml,html,yml,json}': ['prettier'],
  '*.{ts,tsx,js}': ['eslint --fix', 'prettier --write'],
}
