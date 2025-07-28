-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "bggId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER,
    "image" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Game_bggId_key" ON "Game"("bggId");
