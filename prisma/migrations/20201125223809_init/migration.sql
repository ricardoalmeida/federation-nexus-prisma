-- CreateTable
CREATE TABLE "Playlist" (
"id" SERIAL,
    "description" TEXT NOT NULL,
    "userId" TEXT,

    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "PlaylistTrack" (
"id" SERIAL,
    "addedAt" TIMESTAMP(3) NOT NULL,
    "playlistId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);
-- CreateTable
CREATE TABLE "Track" (
"id" SERIAL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
-- AddForeignKey
ALTER TABLE "PlaylistTrack" ADD FOREIGN KEY("playlistId")REFERENCES "Playlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
