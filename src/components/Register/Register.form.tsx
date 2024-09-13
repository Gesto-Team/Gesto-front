import { object, string } from "zod";
import { UserData } from "@/models/user.model";

export const formSchema = object({
  username: string().email("Email invalide"),
  password: string()
    .min(8, "Le mot de passe doit faire au moins 8 caractères")
    .regex(
      /^(?=.*[a-z])/,
      "Le mot de passe doit contenir au moins une minuscule"
    )
    .regex(
      /^(?=.*[A-Z])/,
      "Le mot de passe doit contenir au moins une majuscule"
    )
    .regex(/^(?=.*\d)/, "Le mot de passe doit contenir au moins un nombre")
    .regex(
      /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
      "Le mot de passe doit contenir au moins un caractère spécial"
    ),
});

export const defaultValues: UserData = {
  username: "",
  password: "",
};
