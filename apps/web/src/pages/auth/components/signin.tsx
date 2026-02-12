import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { Link } from "react-router";
import { sign_in_handler } from "../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/auth.store";
import { useNavigate } from "react-router";

export function SigninForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading } = useSelector((state: RootState) => state.auth);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      const email = form.get("email") as string;
      const password = form.get("password") as string;
      const user = {
        email,
        password,
      };
      const info = await dispatch(sign_in_handler(user)).unwrap();
      console.log(info)
      if(info.data.sigin.status == 200){
        navigate("/problems")
        window.cookieStore.set("auth",info.data.sigin.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (error) {
    return <>Something went wrong</>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" type="email" name="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" name="password" required />
        </Field>
        <Field>
          <Button disabled={loading} type="submit">Login</Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link to="/auth/signup" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
