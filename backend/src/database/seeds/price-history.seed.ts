import { prisma } from "../../config/prisma.client";
import { Prisma } from "../../generated/prisma/client";

/**
 * Generates a realistic price fluctuation using a random walk model.
 * Each step applies a small percentage change (±0.5%) with slight
 * momentum to simulate natural market movements.
 */
function generatePriceHistory(
  basePrice: number,
  totalMinutes: number,
): number[] {
  const prices: number[] = [];
  let currentPrice = basePrice;
  let momentum = 0;

  for (let i = 0; i < totalMinutes; i++) {
    // Random percentage change between -0.5% and +0.5%
    const randomChange = (Math.random() - 0.5) * 0.01;

    // Add slight momentum (30% carry from previous direction)
    momentum = momentum * 0.3 + randomChange * 0.7;

    // Apply the change
    currentPrice = currentPrice * (1 + momentum);

    // Clamp to avoid negative prices
    currentPrice = Math.max(currentPrice * 0.01, currentPrice);

    prices.push(parseFloat(currentPrice.toFixed(8)));
  }

  return prices;
}

async function seedPriceHistory() {
  try {
    console.log("Fetching all tokens from database...");

    const tokens = await prisma.token.findMany();

    if (tokens.length === 0) {
      console.log("No tokens found. Run tokens.seed.ts first.");
      return;
    }

    console.log(`Found ${tokens.length} tokens. Generating 24h price history (1440 data points each)...`);

    const TOTAL_MINUTES = 24 * 60; // 1440 minutes in 24 hours
    const now = new Date();

    // Start time is 24 hours ago from now
    const startTime = new Date(now.getTime() - TOTAL_MINUTES * 60 * 1000);

    // Clear existing price history to avoid duplicates on re-run
    await prisma.priceHistory.deleteMany();
    console.log("Cleared existing price history.");

    for (const token of tokens) {
      const basePrice = Number(token.current_price);
      const prices = generatePriceHistory(basePrice, TOTAL_MINUTES);

      // Build all records for this token
      const records: Prisma.PriceHistoryCreateManyInput[] = prices.map(
        (price, minute) => ({
          token_id: token.uuid,
          price: new Prisma.Decimal(price),
          timestamp: new Date(startTime.getTime() + minute * 60 * 1000),
        }),
      );

      // Batch insert in chunks of 500 to avoid exceeding query limits
      const BATCH_SIZE = 500;
      for (let i = 0; i < records.length; i += BATCH_SIZE) {
        const batch = records.slice(i, i + BATCH_SIZE);
        await prisma.priceHistory.createMany({ data: batch });
      }

      // Update the token's current price to the last generated price
      const lastPrice = prices[prices.length - 1] ?? basePrice;
      await prisma.token.update({
        where: { uuid: token.uuid },
        data: {
          current_price: new Prisma.Decimal(lastPrice),
          updated_at: new Date(),
        },
      });

      console.log(
        `  ✓ ${token.symbol} (${token.name}): ${TOTAL_MINUTES} records | ` +
          `$${basePrice} → $${lastPrice}`,
      );
    }

    console.log(
      `\nPrice history seeded successfully. ${tokens.length * TOTAL_MINUTES} total records inserted.`,
    );
  } catch (error) {
    console.error("Error seeding price history:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedPriceHistory();
