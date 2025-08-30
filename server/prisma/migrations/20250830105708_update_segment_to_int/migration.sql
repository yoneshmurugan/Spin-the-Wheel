/*
  Warnings:

  - You are about to alter the column `segment` on the `SpinResult` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[userEmail]` on the table `SpinResult` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userName` on table `SpinResult` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userEmail` on table `SpinResult` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `SpinResult` MODIFY `segment` INTEGER NOT NULL,
    MODIFY `userName` VARCHAR(191) NOT NULL,
    MODIFY `userEmail` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `SpinResult_userEmail_key` ON `SpinResult`(`userEmail`);
