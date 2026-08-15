-- DropForeignKey
ALTER TABLE "SpecDefinition" DROP CONSTRAINT "SpecDefinition_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "SpecDefinition" ADD CONSTRAINT "SpecDefinition_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
