import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {signInUser} from "../../../../api/auth-api.ts";
import {toast} from "react-toastify";
import {extractApiError} from "../../../../utils/error/extractApiError.ts";
import {AxiosError} from "axios";

type SignInInputs = {
  email: string;
  password: string;
}

function SignInForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignInInputs>()

  const signInMutation = useMutation({
    mutationFn: signInUser,
    onSuccess: (data) => {
      console.log(data)
      navigate("/");
    },
    onError: (err) => {
      toast.error(extractApiError(err as AxiosError))
    }
  })

  const onSubmit: SubmitHandler<SignInInputs> = (data) => {
    signInMutation.mutate({email: data.email, password: data.password})
  }

  return (
    <form className={"flex flex-col gap-2 w-full"} onSubmit={handleSubmit(onSubmit)}>

      <div>
        <input type="email" placeholder="Email"
               className="input input-bordered w-full" {...register("email", {required: true})}/>
        {errors.email && <span className={"text-error text-sm"}>email is required</span>}
      </div>

      <div>
        <input type="password" placeholder="Password"
               className="input input-bordered w-full" {...register("password", {required: true})}/>
        {errors.password && <span className={"text-error text-sm"}>password is required</span>}
      </div>

      <button className={"btn btn-primary mt-2 w-full"}>Login</button>
    </form>
  );
}

export default SignInForm