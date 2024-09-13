import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Product } from "@/Types/Product"
import { deleteProduct } from "@/api/Services/Product"

import { useNavigate } from "react-router-dom";



export function DeleteProduct(props: { 'product': Product }) {

  const navigate = useNavigate();

  const refreshPage = () => {
    navigate(0);
  }

  async function handleClick() {
    // Supprimer le produit
    try {
      const response = await deleteProduct(props.product._id);
      refreshPage();
      console.log('Produit supprimé avec succès', response);
    } catch (error) {
      console.error('Erreur lors de la suppression du produit', error);
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Voulez vous supprimer ce produit?</DialogTitle>
        <DialogDescription>
          Ce produit sera supprimé de manière permanente.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button onClick={handleClick}>Confirmer la suppression</Button>
      </DialogFooter>
    </>

  )
}