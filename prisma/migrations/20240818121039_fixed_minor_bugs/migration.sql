/*
  Warnings:

  - The primary key for the `BorrowedCart` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Equipments" DROP CONSTRAINT "Equipments_borrowedCartId_fkey";

-- AlterTable
ALTER TABLE "BorrowedCart" DROP CONSTRAINT "BorrowedCart_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BorrowedCart_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BorrowedCart_id_seq";

-- AlterTable
ALTER TABLE "Equipments" ALTER COLUMN "borrowedCartId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Equipments" ADD CONSTRAINT "Equipments_borrowedCartId_fkey" FOREIGN KEY ("borrowedCartId") REFERENCES "BorrowedCart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
