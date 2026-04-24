import { prisma } from "../../config/prisma.client";
import { Prisma } from "../../generated/prisma/client";

async function seedWallets() {
  try {
    console.log("Seeding wallets...");

    const users = await prisma.user.findMany({
      select: { uuid: true },
    });

    if (users.length === 0) {
      console.log("No users found. Run seed:users first.");
      return;
    }

    const wallets = users.map((user) => ({
      user_id: user.uuid,
      balance_usdt: new Prisma.Decimal("10000.00000000"),
      locked_balance: new Prisma.Decimal("0.00000000"),
    }));

    const result = await prisma.wallet.createMany({
      data: wallets,
      skipDuplicates: true,
    });

    console.log(`${result.count} wallets seeded successfully.`);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedWallets();
