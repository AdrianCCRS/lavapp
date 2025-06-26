import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { login } from "../services/auth.service";
import { useForm } from "react-hook-form";
import type { LoginForm } from "../types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>();
  
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const onSubmit = async (data: LoginForm) => {
    try {
      setError(null);
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-6">
      <Form
        className="w-auto max-w-md flex flex-col gap-4 p-6 border rounded-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="w-full text-xl text-center text-gray-600">
          Iniciar sesión
        </h1>

        {error && (
          <div className="p-3 text-sm w-full text-center text-red-600 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <Input
          isRequired
          errorMessage="Ingrese un correo válido"
          label="Correo Electrónico"
          labelPlacement="outside"
          type="email"
          {...register("email")}
        />

        <Input
          isRequired
          errorMessage="Ingrese una contraseña"
          label="Contraseña"
          labelPlacement="outside"
          type="password"
          {...register("password")}
        />

        <div className="flex gap-2 justify-center w-full">
          <Button color="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Iniciando sesión..." : "Acceder"}
          </Button>
          <Button type="reset" variant="flat">
            Cancelar
          </Button>
        </div>

        <p className="text-xs text-center text-gray-500">
          Si tiene alguna duda o problema al acceder, por favor comuníquese con
          algún miembro de la junta
        </p>
      </Form>
    </div>
  );
}