-- CreateEnum
CREATE TYPE "USERROLE" AS ENUM ('MANAGER', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Role" "USERROLE" NOT NULL DEFAULT 'USER';
