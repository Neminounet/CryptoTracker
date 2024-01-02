import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { createUser } from "../../../service/user";

function RegisterForm() {
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Veuillez renseigner une adresse email.")
      .email("L'adresse email doit être valide."),
    username: yup
      .string()
      .required("Veuillez renseigner votre nom d'utilisateur")
      .min(
        2,
        "Votre nom d'utilisateur doit comporter un minimum de deux caractères."
      ),
    password: yup
      .string()
      .required("Veuillez renseigner un mot de passe.")
      .min(6, "Le mot de passe doit comporter un minimum de six caractères.")
      .matches(
        /^(?=.*[A-Z])(?=.*\d).+$/,
        "Le mot de passe doit comporter au moins une Majuscule et un chiffre."
      ),
    passwordVal: yup
      .string()
      .required("Le mot de passe est obligatoire.")
      .oneOf(
        [yup.ref("password"), ""],
        "Les mots de passes ne sont pas identiques"
      ),
  });

  const initialValues = {
    email: "",
    username: "",
    password: "",
    passwordVal: "",
  };

  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
  });

  const submit = async (values) => {
    const { passwordVal, ...restValues } = values;
    console.log(restValues);
    try {
      clearErrors();
      await createUser(restValues);
    } catch (error) {
      setError("generic", { type: "generic", message: error });
    }
  };

  return (
    <div>
      <h3>Inscription</h3>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="email">Adresse email</label>
          <input type="text" name="email" {...register("email")} />
          {errors?.email && <p className="formError">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input type="text" name="username" {...register("username")} />
          {errors?.username && (
            <p className="formError">{errors.username.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input type="text" name="password" {...register("password")} />
          {errors?.password && (
            <p className="formError">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="passwordVal">Confirmation du mot de passe</label>
          <input type="text" name="passwordVal" {...register("passwordVal")} />
          {errors?.passwordVal && (
            <p className="formError">{errors.passwordVal.message}</p>
          )}
        </div>
        {errors.generic && (
          <div>
            <p className="formError">{errors.generic.message.toString()}</p>
          </div>
        )}
        <div>
          <button disabled={isSubmitting}> S'inscrire </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
