import { object, string } from "zod";
import { UserData } from "@/models/user.model";

export const formSchema = object({
  username: string().email(),
  password: string(),
});

export const defaultValues: UserData = {
  username: "",
  password: "",
};
