import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabine, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, editId }) =>
      createEditCabin(newCabinData, editId),
    onSuccess: () => {
      toast.success("Cabin succesfuly edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editCabine, isEditing };
}
