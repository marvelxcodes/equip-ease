-- AlterEnum
ALTER TYPE "BorrowedCartStatus" ADD VALUE 'QUEUED';

-- AlterTable
ALTER TABLE "BorrowedCart" ALTER COLUMN "borrowStatus" SET DEFAULT 'QUEUED';
