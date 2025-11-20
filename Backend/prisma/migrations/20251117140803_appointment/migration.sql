-- CreateTable
CREATE TABLE "Availablity" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "slots" JSONB NOT NULL,

    CONSTRAINT "Availablity_pkey" PRIMARY KEY ("id")
);
