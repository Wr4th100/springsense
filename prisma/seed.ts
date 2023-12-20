import seedSprings from "./seeds/spring";
import { db as prisma } from "@/server/db";

async function main() {
    await seedSprings(prisma)
}


main()
  .then(() => {
    console.log("Seeding complete ✅");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });