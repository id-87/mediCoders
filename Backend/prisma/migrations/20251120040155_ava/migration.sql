-- AddForeignKey
ALTER TABLE "Availablity" ADD CONSTRAINT "Availablity_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
