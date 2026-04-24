import { prisma } from "../../config/prisma.client";
import { Prisma } from "../../generated/prisma/client";

const tokens = [
  { symbol: "BTC", name: "Bitcoin", price: 65000 },
  { symbol: "ETH", name: "Ethereum", price: 3200 },
  { symbol: "BNB", name: "BNB", price: 580 },
  { symbol: "SOL", name: "Solana", price: 145 },
  { symbol: "XRP", name: "XRP", price: 0.62 },
  { symbol: "ADA", name: "Cardano", price: 0.48 },
  { symbol: "DOGE", name: "Dogecoin", price: 0.18 },
  { symbol: "TRX", name: "TRON", price: 0.12 },
  { symbol: "DOT", name: "Polkadot", price: 7.25 },
  { symbol: "MATIC", name: "Polygon", price: 0.95 },
];

async function seedTokens() {
  try {
    console.log("Seeding 10 tokens...");

    for (const token of tokens) {
      const circulatingSupply = Math.floor(
        Math.random() * 1000000000 + 10000000,
      );

      const totalSupply =
        circulatingSupply + Math.floor(Math.random() * 50000000);

      const maxSupply = totalSupply + Math.floor(Math.random() * 50000000);

      const marketCap = token.price * circulatingSupply;

      await prisma.token.upsert({
        where: {
          symbol: token.symbol,
        },
        update: {
          current_price: new Prisma.Decimal(token.price),
          market_cap: new Prisma.Decimal(marketCap),
          updated_at: new Date(),
        },
        create: {
          symbol: token.symbol,
          name: token.name,
          current_price: new Prisma.Decimal(token.price),
          circulating_supply: new Prisma.Decimal(circulatingSupply),
          total_supply: new Prisma.Decimal(totalSupply),
          max_supply: new Prisma.Decimal(maxSupply),
          market_cap: new Prisma.Decimal(marketCap),
          status: "active",
        },
      });
    }

    console.log("10 tokens seeded successfully.");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedTokens();
