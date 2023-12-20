import { type PrismaClient } from "@prisma/client";

export default async function seedSprings(prisma: PrismaClient) {
  const azhagar = await prisma.springShed.create({
    data: {
      name: "Alagar hills springshed",
      state: "Tamil Nadu",
    },
  });

  const nagamalai = await prisma.springShed.create({
    data: {
      name: "Nagamalai Springshed",
      state: "Tamil Nadu",
    },
  });

  const kodaikanal = await prisma.springShed.create({
    data: {
      name: "Kodaikanal springshed",
      state: "Tamil Nadu",
    },
  });

  const nilgiris = await prisma.springShed.create({
    data: {
      name: "Nilgiris Springshed",
      state: "Tamil Nadu",
    },
  });

  console.log("Seeded springsheds");
}
