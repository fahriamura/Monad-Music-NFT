export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/javascript');
  const env = {
    DID_TOKEN: process.env.NEXT_PUBLIC_DID_TOKEN || '',
    PINATA_JWT: process.env.NEXT_PUBLIC_PINATA_JWT || '',
    CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''
  };
  res.send(`window._env_ = ${JSON.stringify(env)};`);
} 