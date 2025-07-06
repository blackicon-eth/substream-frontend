# Substream 🤫

Substream is a protocol that generates ENS subdomains for the user and that allows him to receive tokens directly into his Intmax account just by sharing his subdomain with other Ethereum users.

## How is it made?

SubStream is a protocol designed to streamline user interactions for those who want to receive payments into IntMax while maintaining a familiar Ethereum-like experience. Built with Next.js and containerized using Docker, the system leverages Oasis Trusted Execution Environment (TEE) for secure transaction processing.

Users can register personalized ENS subdomains under the project's primary domain, with resolution addresses managed by an Oasis TEE instance. When Bob registers bob.stealthmax.eth, he receives an identifier that Alice can use to send Ether. Behind the scenes, Oasis TEE initializes an Intmax client session and processes transactions to Bob's Intmax address, stored in the ENS Text Record, while implementing privacy through new resolution address derivation for each payment.

The receiving address is a stealth address derived using the Oasis primary key, enabling secure deposit management and liquidity pool maintenance. The system eliminates traditional Intmax deposit friction - Alice simply sends Ether to Bob's subdomain address, and the containerized backend automatically handles cross-layer operations, allowing Bob to receive payments directly in Intmax without the typical 30+ minute processing delay.

## Bounties

- **Oasis**: The project relies on a server running into the Oasis TEE that orchestrates the Intmax payments, the generation of stealth addresses and ENS subdomains
- **ENS**: Substream heavily uses ENS to link the user's Intmax address with the newly generated stealth addresses and subdomains. Thanks to it the UX is greatly improved, since other users can send money toward the subdomain instead of having to set up an Intmax deposit
- **Intmax**: The whole app revolves around the possibility for a user to receive their payment directly into his Intmax account and leverage its privacy solutions. Thanks to the TEE, the user will immediately receive the tokens and the deposit's usual time is delayed and faced by the protocol, instead of the user

## Installation Steps

Choose your preferred package manager:

```bash
# Using npm
npm install && npm run dev

# Using yarn
yarn install && yarn dev

# Using pnpm
pnpm install && pnpm dev
```

## Useful links

- [ETHGlobal](https://ethglobal.com/showcase/substream-msjk1)
- [Vercel Deployed dApp](https://substream-frontend.vercel.app/)
- [Node.js TEE Repository](https://github.com/SolidityDrone/substream)

## Team

This project was build by:

- [blackicon.eth](https://x.com/TBlackicon)
- [Drone](https://x.com/SolidityDrone)
