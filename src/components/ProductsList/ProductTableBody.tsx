import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { TableAction } from "./TableAction"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

export function ProductTableBody() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios
        .get('http://localhost:3000/product')
        .then((res) => res.data),
  })

  if (isPending) return (
    <TableRow>
      <TableCell colSpan={6}>Loading...</TableCell>
    </TableRow>
  )

  if (error) return 'An error has occurred: ' + error.message

  const products = data;
  console.log(products);

  return (


    products.map((product) => (
      <TableRow key={product._id}>
        <TableCell className="hidden sm:table-cell">
          <img
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            height="64"
            src="https://ui.shadcn.com/placeholder.svg"
            width="64"
          />
        </TableCell>
        <TableCell className="font-medium">
          {product.name}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {product.price}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {product.quantity}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {product.unit}
        </TableCell>
        <TableCell>
          {new Date(product.expirationDate).toLocaleDateString('en-GB')}
        </TableCell>
        <TableCell>
          <TableAction product={product} />
        </TableCell>
      </TableRow>
    ))

  );
}