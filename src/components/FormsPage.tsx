import { useForm } from "react-hook-form";

type FormInputs = {
  email: string;
  password: string;
};

const FormsPage = () => {
  const { register, handleSubmit, formState, watch  } = useForm<FormInputs>({
    defaultValues: {
      email: "mar@gmail.com",
      password: "Abc123"
    }
  });

  console.log(watch('email'));
  

  const onSubmit = (myForm: FormInputs) => {
    console.log("Data submited:", myForm);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3> Formularios</h3>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="text"
            placeholder="email"
            {...register("email", { required: true })}
          />

          <input
            type="text"
            placeholder="password"
            {...register("password", { required: true })}
          />

          <button type="submit">Ingresar</button>
        </div>
      </form>

      <pre>
        {JSON.stringify(formState,null,2)}
      </pre>
    </>
  );
};

export default FormsPage;
