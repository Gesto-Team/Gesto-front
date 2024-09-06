import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Product } from "@/Types/Product";

type DashBoardTableBodyProps = {
  isPending: boolean;
  error: Error | null;
  data: Product[] | undefined;
  onRowClick: (productId: Product) => void;
}

export function DashboardTableBody(props: DashBoardTableBodyProps) {

  if (props.isPending) return (
    <TableRow>
      <TableCell colSpan={6}>Chargement...</TableCell>
    </TableRow>
  )

  if (props.data) {
    return (
      props.data.filter((product: Product) => {
        const currentDate = new Date();
        const expiration = new Date(product.expirationDate);
        const timeDiff = expiration.getTime() - currentDate.getTime();
        const daysDiff = timeDiff / (1000 * 3600 * 24);
        return daysDiff <= 30 && daysDiff > 0 && daysDiff
      }).map((product: Product) => (
        <TableRow key={product._id} onClick={() => props.onRowClick(product)}>
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
        </TableRow>
      ))
    );
  }

  if (props.error) return (
    <TableRow>
      <TableCell colSpan={6}>Erreur de chargement:  + {props.error.message}</TableCell>
    </TableRow>
  );
}