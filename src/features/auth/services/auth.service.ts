import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import type { UserCredential } from "firebase/auth";
import { auth } from "@config/firebase.config";
import { FirebaseError } from "firebase/app";
import type { User } from "../types";
import { db } from "@config/firebase.config";
import { getDocs, collection, query, where } from "firebase/firestore";
import { handleFirestoreErrorOnly } from "@/utils/informationHandler";
/**
 * Función para iniciar sesión con correo electrónico y contraseña en firebase auth
 * @param email Correo electrónico del usuario
 * @param password Contraseña del usuario
 * @returns Un objeto UserCredential
 */


export async function login(
  email: string,
  password: string
): Promise<UserCredential | null> {
  return await handleFirestoreErrorOnly(
    async () => {
      try {
        return await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        if (error instanceof FirebaseError) {
          throw new Error(handleAuthFirebaseError(error.code));
        }
        throw error;
      }
    },
    {
      errorTitle: "Error al iniciar sesión",
      errorMessage: "No se pudo iniciar sesión. Verifica tus credenciales.",
    }
  );
}

  export async function getUserProps(): Promise<User | null> {
    const returnedUser = await handleFirestoreErrorOnly(
      async () => {
      const user = auth.currentUser;
      if (!user || !user.email) {
        throw new Error("Usuario no encontrado o correo electrónico no válido.");
      }
      const q = query(
          collection(db, "users"),
          where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Ningún usuario encontrado con el email: " + user.email);
      }

      const userData = querySnapshot.docs[0].data();
      const studentCode = querySnapshot.docs[0].id;

        return {
          id: studentCode,
          firstName: userData.firstName || "",
          secondName: userData.secondName || "",
          firstLastName: userData.firstLastName || "",
          secondLastName: userData.secondLastName || "",
          currentReservations: userData.currentReservations || [],
          email: userData.email || "",
          role: userData.role,
          phoneNumber: userData.phoneNumber || ""
        } as User;
      }, {
        errorTitle: "Error al obtener los datos del usuario",
        errorMessage: "No se pudieron obtener los datos del usuario.",
      });
      return returnedUser;
  }
  

  //Traductor de errores de Firebase a mensajes amigables
  function handleAuthFirebaseError(code: string): string {
    const errorMap: Record<string, string> = {
      "auth/invalid-email": "Correo electrónico inválido",
      "auth/user-disabled": "Cuenta deshabilitada",
      "auth/user-not-found": "Usuario no encontrado",
      "auth/wrong-password": "Contraseña incorrecta",
      "auth/invalid-credential": "El correo o la contraseña son inválidos",
      "auth/too-many-requests": "Demasiados intentos. Intenta más tarde",
    };
    return errorMap[code] || "Error desconocido al iniciar sesión";
  }

/**
 * Función para cerrar sesión del usuario actual en firebase auth
 * @returns Una promesa que se resuelve cuando el usuario ha cerrado sesión correctamente
 */

export async function logout(): Promise<void> {
    return await signOut(auth);
}