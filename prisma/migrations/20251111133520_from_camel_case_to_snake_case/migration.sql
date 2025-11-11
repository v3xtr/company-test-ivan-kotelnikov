/*
  Warnings:

  - You are about to drop the column `eventId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `totalSeats` on the `Event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[event_id,user_id]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `event_id` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_eventId_fkey";

-- DropIndex
DROP INDEX "Booking_eventId_userId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "eventId",
DROP COLUMN "userId",
ADD COLUMN     "event_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "totalSeats",
ADD COLUMN     "total_seats" INTEGER NOT NULL DEFAULT 1000;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_event_id_user_id_key" ON "Booking"("event_id", "user_id");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
