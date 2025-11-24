For project setup:

1. Run the following commands in Backend folder:

npm init -y
npm i
npm i express nodemon prisma @prisma/client
npx init prisma

2. Setup the database you want to use and it's url

3. Then run the following commands

npx prisma migrate dev
npx prisma generate





Project Overview:
We often notice that whenever we need to see a doctor for some emergency and no prior appointment is booked there is a long waiting and also it is not feasable to visit multiple options at once.

Here at MediCodes we are building a tech solution where patients will be able to view the available slots and doctors available and then visit them also there will be a universal medical history off each visit available to all doctors when patient visits.

