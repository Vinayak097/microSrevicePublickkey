import crypto from 'crypto'

export function generateApiKey() {
  return crypto.randomBytes(30).toString('hex');
}
