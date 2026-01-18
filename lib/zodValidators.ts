import { z } from "zod";

export const GenderEnum = z.enum(["MALE", "FEMALE"]);

export const createAnimalSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  
  speciesId: z.string().min(1, "Species is required"),
  
  gender: GenderEnum,
  
  birthDate: z.coerce.date(),
  
  weight: z.coerce
    .number()
    .positive("Weight must be positive")
    .max(10000, "Weight seems too high"),
  
  color: z.string().min(1, "Color is required").max(50, "Color is too long"),
  
  castrated: z.boolean(),
  
  notes: z.string().max(1000, "Notes are too long").optional().or(z.literal("")),
  
  pictureUrl: z.url("Invalid URL").optional().or(z.literal("")),
});

export const updateAnimalSchema = createAnimalSchema.extend({
  id: z.string().min(1, "ID do animal é obrigatório"),
});


// export const editAnimalSchema = createAnimalSchema.extend({
//   id: z.string(),
//   vaccines: z.array(z.any()).default([]),
//   medicines: z.array(z.any()).default([]),
//   appointments: z.array(z.any()).default([]),
// });

export const createSpeciesSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
});
