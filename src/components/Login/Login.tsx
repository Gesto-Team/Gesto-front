import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from "../../theme/theme";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { defaultValues, formSchema } from "./Login.form";
import { Button } from "../ui/button";
import { AxiosError } from "axios";
import { useAuth } from "@/router/hooks/useAuth";

const LoginPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const form = useForm<Zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (values: Zod.infer<typeof formSchema>) => {
    try {
      await login(values);
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
            <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" className="w-full mt-4">
                    Se connecter
                  </Button>
                  {errorMessage && (
                    <FormDescription className="text-red-500">
                      {errorMessage}
                    </FormDescription>
                  )}
                  <FormDescription>
                    Vous n'avez pas de compte ?
                    <Link to="/register" className="font-bold underline">
                      S'inscrire
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

export default LoginPage;
