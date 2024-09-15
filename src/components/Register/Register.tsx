import React, { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { authServices } from "../../services/auth.services";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { AxiosError } from "axios";
import { defaultValues, formSchema } from "./Register.form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { defaultTheme } from "../../theme/theme";
import { Button } from "../ui/button";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<Zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: Zod.infer<typeof formSchema>) => {
    try {
      await authServices.register(values);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        setErrorMessage(
          error.response?.data?.message || "An unexpected error occurred"
        );
      } else {
        setErrorMessage("An unexpected error occurred");
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <div className="flex items-center h-screen">
        <Card className="flex-grow mx-auto max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Inscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="m@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mot de passe</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Le mot de passe doit contenir au moins 8 caractères,
                            une minuscule, une majuscule, un nombre et un
                            caractère spécial.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full my-4">
                    S'inscrire
                  </Button>
                  {errorMessage && (
                    <FormDescription className="text-red-500">
                      {errorMessage}
                    </FormDescription>
                  )}
                  <FormDescription>
                    Déjà un compte ?
                    <Link to="/register" className="font-bold underline">
                      Se connecter
                    </Link>
                  </FormDescription>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default RegisterPage;
