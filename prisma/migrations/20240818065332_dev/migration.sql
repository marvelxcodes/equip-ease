-- CreateEnum
CREATE TYPE "BorrowedCartStatus" AS ENUM ('BORROWED', 'REQUESTED', 'RETURNED');

-- CreateEnum
CREATE TYPE "EquipmentAvailabilityEnum" AS ENUM ('AVAILABLE', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'ADMINISTRATOR');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "availability" "EquipmentAvailabilityEnum" NOT NULL,
    "borrowedCartId" INTEGER,

    CONSTRAINT "Equipments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowedCart" (
    "id" SERIAL NOT NULL,
    "borrowStatus" "BorrowedCartStatus" NOT NULL DEFAULT 'REQUESTED',
    "allotedTime" DOUBLE PRECISION NOT NULL,
    "issuedTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BorrowedCart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Equipments_id_key" ON "Equipments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BorrowedCart_id_key" ON "BorrowedCart"("id");

-- AddForeignKey
ALTER TABLE "Equipments" ADD CONSTRAINT "Equipments_borrowedCartId_fkey" FOREIGN KEY ("borrowedCartId") REFERENCES "BorrowedCart"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowedCart" ADD CONSTRAINT "BorrowedCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
