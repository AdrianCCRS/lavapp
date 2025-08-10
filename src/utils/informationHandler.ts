import { addToast } from "@heroui/toast";

type ToastOptions = {
  successTitle?: string;
  errorTitle?: string;
  successMessage?: string;
  errorMessage?: string;
};

export async function handleFirestore<T>(
  operation: () => Promise<T>,
  options?: ToastOptions
): Promise<T | null> {

  try {
    const result = await operation();
    addToast({
      title: options?.successTitle || "Proceso exitoso",
      description: options?.successMessage || "El proceso se completó correctamente.",
      color: "success",
    });
    return result;
  } catch (err: any) {
    console.error("Firestore error:", err);
    if (err instanceof Error) {
      addToast({
        title: options?.errorTitle || "Error en la operación",
        description: err.message,
        color: "danger",
      });
    } else {
      addToast({
        title: "Error inesperado",
        description: options?.errorMessage || "Ocurrió un error inesperado.",
        color: "danger",
      });
    }
    return null;
    }
}

export async function handleFirestoreErrorOnly<T>(
  operation: () => Promise<T>,
  options?: ToastOptions
): Promise<T | null> {
  try {
    const result = await operation();
    return result;
  } catch (err: any) {
    console.error("Firestore error:", err);
    if (err instanceof Error) {
      addToast({
        title: options?.errorTitle || "Error en la operación",
        description: err.message,
        color: "danger",
      });
    } else {
      addToast({
        title: "Error inesperado",
        description: options?.errorMessage || "Ocurrió un error inesperado.",
        color: "danger",
      });
    }
    return null;
  }
}

export function handleError(error: Error, options?: ToastOptions): void {
  console.error("Error:", error);
  addToast({
    title: options?.errorTitle || "Error",
    description: error.message,
    color: "danger",
  });
}
