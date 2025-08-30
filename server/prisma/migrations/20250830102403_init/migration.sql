/*
  Warnings:

  - You are about to drop the `Spin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Spin`;

-- CreateTable
CREATE TABLE `SpinResult` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `segment` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NULL,
    `userEmail` VARCHAR(191) NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
