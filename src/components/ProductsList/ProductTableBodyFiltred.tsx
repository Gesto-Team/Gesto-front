import { TableCell, TableRow } from "@/components/ui/table";
import { TableAction } from "./TableAction";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Product } from "@/Types/Product";

interface ChildProps {
  onProductsCountUpdate: (productsCount: number) => void;
  filter: string;
}
export function ProductTableBodyFiltred(props: ChildProps) {
  let filtredData: Product[] = [];

  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      axios.get("http://localhost:3000/products").then((res) => res.data),
  });

  useEffect(() => {
    if (filtredData) {
      props.onProductsCountUpdate(filtredData.length);
    }
  }, [filtredData]);

  if (isPending)
    return (
      <TableRow>
        <TableCell colSpan={6}>Chargement...</TableCell>
      </TableRow>
    );

  if (error) return "An error has occurred: " + error.message;

  const getExpirationStatus = (expirationDate: Date) => {
    const currentDate = new Date();
    const expiration = new Date(expirationDate);
    const timeDiff = expiration.getTime() - currentDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);

    if (daysDiff < 0) {
      return (
        <p
          style={{
            color: "red",
            border: "1px red solid",
            borderRadius: "10px",
            width: "50%",
            textAlign: "center",
          }}
        >
          Expiré
        </p>
      );
    } else if (daysDiff <= 30) {
      return (
        <p
          style={{
            color: "orange",
            border: "1px orange solid",
            borderRadius: "10px",
            width: "50%",
            textAlign: "center",
          }}
        >
          Presque expiré
        </p>
      );
    } else {
      return (
        <p
          style={{
            color: "green",
            border: "1px green solid",
            borderRadius: "10px",
            width: "50%",
            textAlign: "center",
          }}
        >
          Valide
        </p>
      );
    }
  };

  if (props.filter === "valide") {
    filtredData = data.filter((product: Product) => {
      const currentDate = new Date();
      const expiration = new Date(product.expirationDate);
      const timeDiff = expiration.getTime() - currentDate.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      return daysDiff > 30 && daysDiff;
    });
  } else if (props.filter === "imminent") {
    filtredData = data.filter((product: Product) => {
      const currentDate = new Date();
      const expiration = new Date(product.expirationDate);
      const timeDiff = expiration.getTime() - currentDate.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      return daysDiff <= 30 && daysDiff > 0 && daysDiff;
    });
  } else if (props.filter === "expired") {
    filtredData = data.filter((product: Product) => {
      const currentDate = new Date();
      const expiration = new Date(product.expirationDate);
      const timeDiff = expiration.getTime() - currentDate.getTime();
      const daysDiff = timeDiff / (1000 * 3600 * 24);
      return daysDiff < 0 && daysDiff;
    });
  }

  return filtredData.map((product) => (
    <TableRow key={product._id}>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell className="hidden md:table-cell">{product.price}</TableCell>
      <TableCell className="hidden md:table-cell">{product.quantity}</TableCell>
      <TableCell className="hidden md:table-cell">{product.unit}</TableCell>
      <TableCell>
        {new Date(product.expirationDate).toLocaleDateString("en-GB")}
      </TableCell>
      <TableCell>{getExpirationStatus(product.expirationDate)}</TableCell>
      <TableCell>
        <TableAction product={product} />
      </TableCell>
    </TableRow>
  ));
}
