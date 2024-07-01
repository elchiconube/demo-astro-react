import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import translate from "../i18n/translate.json";

const schema = yup.object().shape({
  name: yup.string().required("Nombre completo es requerido"),
  email: yup
    .string()
    .email("Correo electrónico inválido")
    .required("Correo electrónico es requerido"),
  message: yup.string().required("Mensaje es requerido"),
});

const ContactForm = ({ locale = "es" }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    document.getElementById("result").innerHTML = "Enviando...";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      const resultElement = document.getElementById("result");

      if (response.status === 200) {
        resultElement.classList.add("text-green-500");
        resultElement.innerHTML = json.message;
      } else {
        resultElement.classList.add("text-red-500");
        resultElement.innerHTML = json.message;
      }
    } catch (error) {
      console.error(error);
      document.getElementById("result").innerHTML = "Algo ha salido mal";
    } finally {
      reset();
      setTimeout(() => {
        document.getElementById("result").style.display = "none";
      }, 5000);
    }
  };

  const t = translate[locale].contactform;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="needs-validation">
      <input type="hidden" name="access_key" value="CLAVE WEB3FORMS" />
      <input
        type="checkbox"
        className="hidden"
        style={{ display: "none" }}
        name="botcheck"
      />

      <div className="mb-5">
        <input
          type="text"
          placeholder={t.fullname}
          {...register("name")}
          className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 ${
            errors.name ? "is-invalid" : ""
          }`}
        />
        {errors.name && (
          <div className="invalid-feedback text-red-400 text-sm mt-1">
            {errors.name.message}
          </div>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="email_address" className="sr-only">
          {t.email}
        </label>
        <input
          id="email_address"
          type="email"
          placeholder={t.email}
          {...register("email")}
          className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 ${
            errors.email ? "is-invalid" : ""
          }`}
        />
        {errors.email && (
          <div className="invalid-feedback text-red-400 text-sm mt-1">
            {errors.email.message}
          </div>
        )}
      </div>

      <div className="mb-3">
        <textarea
          name="message"
          placeholder={t.message}
          {...register("message")}
          className={`w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none h-36 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 ${
            errors.message ? "is-invalid" : ""
          }`}></textarea>
        {errors.message && (
          <div className="invalid-feedback text-red-400 text-sm mt-1">
            {errors.message.message}
          </div>
        )}
      </div>

      <button
        type="submit"
        size="lg"
        className="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-5 py-2.5 bg-black text-white hover:bg-gray-800  border-2 border-transparent flex gap-1 items-center justify-center">
        {t.submit}
      </button>
      <div id="result" className="mt-3 text-center"></div>
    </form>
  );
};

export default ContactForm;
