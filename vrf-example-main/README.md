# VRF example

A starter kit demonstrating the integration of Randamu's randomness solutions for blockchain applications. This demo showcases two different approaches to generating verifiable random numbers on-chain:

1. **Random Number Generator**: Using the Randamu Solidity library
2. **Coin Flip**: Using the Randamu JavaScript library

## 📁 Project Structure

```
vrf-example/
├── app/                            # Next.js app directory
│   └── config.ts                   # Chain configuration, contract ABI and addresses
│   ├── coinflip/                   # Coin flip demo
│   │   ├── page.tsx                # Main coin flip page
│   │   └── header.tsx              # Header component
│   ├── randomnumber/               # Random number generator demo
│   │   ├── page.tsx                # Main random number page
│   │   └── header.tsx              # Header component
│   ├── layout.tsx                  # Root layout with font configuration
│   ├── providers.tsx               # Wallet and query providers
│   ├── ReactQueryProvider.tsx      # React Query provider setup
│   ├── globals.css                 # Global styles
│   └── page.tsx                    # Landing page
├── components/                     # Reusable components
│   └── walletConnect.tsx           # Wallet connection component
├── lib/                            # Utility and configuration
│   └── RandomNumberGenerator.sol   # Example smart contract to generate random number
|

```

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/randa-mu/vrf-example.git
cd vrf-example
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
```
You can get a wallet connect project ID by registering for free at https://cloud.reown.com and creating a project.

4. Start the development server:
```bash
npm run dev
```

## 🎯 Demo Components

### 1. Random Number Generator
Located in `app/randomnumber/page.tsx`, this demo uses the Randamu Solidity library to generate verifiable random numbers on-chain. Features:
- Integration with custom Smart Contract, example in `lib/RandomNumberGenerator.sol` 
- Transaction-based randomness generation
- Animated number display
- Mobile-responsive layout

### 2. Coin Flip
Located in `app/coinflip/page.tsx`, this demo uses the Randamu JavaScript library for randomness. Features:
- Client-side randomness generation
- Verifiable results
- Interactive UI
- Real-time updates

## Configuration

### Environment Variables
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`

Your WalletConnect project ID. You can get a wallet connect project ID by registering for free at https://cloud.reown.com and creating a project.

### Changing the supported chain
To run on a chain other than the default (Base Sepolia) you must first:
1. Deploy the [random number generator contract](contracts/RandomNumberGenerator.sol) to your chain of choice
2. Update the ABI and contract address in the [app config file](./app/config.ts)
3. Configure the chain parameters in the [app config file](./app/config.ts) to match your desired chain (viem has lots of pre-packaged ones to import!)

## 🔗 Links

- [Randamu Solidity Library](https://github.com/randa-mu/randomness-solidity)
- [Randamu JavaScript Library](https://github.com/randa-mu/randomness-js)
- [Documentation](https://docs.randa.mu/features/verifiable-randomness/quickstart/)
- [Demo Tweet](https://x.com/RandamuInc/status/1914562688753258595)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
