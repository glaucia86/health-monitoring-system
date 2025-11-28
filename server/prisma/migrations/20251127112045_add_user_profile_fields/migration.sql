-- AlterTable
ALTER TABLE "User" ADD COLUMN "address" TEXT,
ADD COLUMN "avatarUrl" TEXT,
ADD COLUMN "birthDate" TIMESTAMP(3),
ADD COLUMN "cpf" TEXT,
ADD COLUMN "emergencyContact" TEXT,
ADD COLUMN "emergencyPhone" TEXT,
ADD COLUMN "phone" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");
