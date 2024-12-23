-- CreateTable
CREATE TABLE "Provinsi" (
    "id" SERIAL NOT NULL,
    "nama_provinsi" TEXT NOT NULL,
    "ibu_kota" TEXT NOT NULL,
    "jumlah_penduduk" INTEGER,
    "luas_wilayah" DOUBLE PRECISION,

    CONSTRAINT "Provinsi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suku" (
    "id" SERIAL NOT NULL,
    "nama_suku" TEXT NOT NULL,
    "id_provinsi" INTEGER NOT NULL,

    CONSTRAINT "Suku_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budaya" (
    "id" SERIAL NOT NULL,
    "nama_budaya" TEXT NOT NULL,
    "kategori_budaya" TEXT NOT NULL,
    "deskripsi" TEXT,
    "id_provinsi" INTEGER NOT NULL,

    CONSTRAINT "Budaya_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LaguDaerah" (
    "id" SERIAL NOT NULL,
    "judul_lagu" TEXT NOT NULL,
    "pencipta" TEXT,
    "id_provinsi" INTEGER NOT NULL,

    CONSTRAINT "LaguDaerah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kuliner" (
    "id" SERIAL NOT NULL,
    "nama_kuliner" TEXT NOT NULL,
    "deskripsi" TEXT,
    "id_provinsi" INTEGER NOT NULL,

    CONSTRAINT "Kuliner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Suku" ADD CONSTRAINT "Suku_id_provinsi_fkey" FOREIGN KEY ("id_provinsi") REFERENCES "Provinsi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Budaya" ADD CONSTRAINT "Budaya_id_provinsi_fkey" FOREIGN KEY ("id_provinsi") REFERENCES "Provinsi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LaguDaerah" ADD CONSTRAINT "LaguDaerah_id_provinsi_fkey" FOREIGN KEY ("id_provinsi") REFERENCES "Provinsi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kuliner" ADD CONSTRAINT "Kuliner_id_provinsi_fkey" FOREIGN KEY ("id_provinsi") REFERENCES "Provinsi"("id") ON DELETE CASCADE ON UPDATE CASCADE;
