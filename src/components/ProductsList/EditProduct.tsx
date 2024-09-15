import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { updateProduct } from "@/api/Services/Product";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Product } from "@/Types/Product";

const formSchema = z.object({
  name: z.string().min(2, "Veuillez enter au moins 2 charactères").max(50),
  price: z.coerce.number({ message: "Veuillez entrer un nombre" }),
  quantity: z.coerce.number({ message: "Veuillez entrer un nombre" }),
  unit: z.string().min(1, "Veuillez enter au moins 2 charactères").max(10),
  expirationDate: z.coerce.date(),
});

export function EditProduct(props: { product: Product }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: props.product.name || "",
      price: props.product.price || ("" as unknown as number),
      quantity: props.product.quantity || ("" as unknown as number),
      unit: props.product.unit || "",
      expirationDate: new Date(props.product.expirationDate)
        .toISOString()
        .split("T")[0] as unknown as Date,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await updateProduct(props.product._id, values);
      window.location.reload();
      console.log("Product edited successfully", response);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Modifier le produit</DialogTitle>
        <DialogDescription>
          Remplissez les champs ci-dessous pour modifier le produit
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormControl>
                      <Input id="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Prix
              </Label>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormControl>
                      <Input id="price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantité
              </Label>
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormControl>
                      <Input id="quantity" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">
                Unité
              </Label>
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormControl>
                      <Input id="unit" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expirationDate" className="text-right">
                Date d'expiration
              </Label>
              <FormField
                control={form.control}
                name="expirationDate"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormControl>
                      <Input
                        id="expirationDate"
                        type="date"
                        {...(field as unknown as Date)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Modifier</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
