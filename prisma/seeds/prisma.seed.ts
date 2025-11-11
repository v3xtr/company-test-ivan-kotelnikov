import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.event.createMany({
    data: [
      { name: "Концерт рок-группы", total_seats: 500 },
      { name: "IT конференция", total_seats: 200 },
      { name: "Кулинарный мастер-класс", total_seats: 50 },
    ],
  });

  console.log("Events created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
