import { type NextPage } from "next"
import Link from "next/link"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { classNames } from "primereact/utils"
import { Controller, useForm } from "react-hook-form"

export type LoginFormData = {
  email: string
  password: string
}

const LoginPage: NextPage = () => {
  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
    reset
  } = useForm<LoginFormData>()

  const onSubmit = (data: LoginFormData) => {
    console.log(data)
  }

  const getFormErrorMessage = (name: keyof LoginFormData) => {
    return errors[name] && <small className="p-error">{errors[name]?.message}</small>
  }

  const passwordFooter = (
    <>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="ml-2 mt-0 list-disc pl-2" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </>
  )

  return (
    <div className="rounded-lg border p-4 shadow-2xl">
      <div className="mb-6 grid grid-cols-3 items-center gap-4">
        <Link href="/register">
          <Button icon="pi pi-arrow-left" className="p-button-text" />
        </Link>
        <h5 className="justify-self-center text-xl font-semibold">Login</h5>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid flex flex-col gap-8">
        <div>
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-envelope" />
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required.",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address. E.g. example@email.com"
                }
              }}
              render={({ field, fieldState }) => (
                <InputText id={field.name} {...field} className={classNames({ "p-invalid": fieldState.error })} />
              )}
            />
            <label htmlFor="email" className={classNames({ "p-error": !!errors.email })}>
              Email*
            </label>
          </span>
          {getFormErrorMessage("email")}
        </div>

        <div>
          <span className="p-float-label">
            <Controller
              name="password"
              control={control}
              rules={{ required: "Password is required." }}
              render={({ field, fieldState }) => (
                <Password
                  id={field.name}
                  {...field}
                  toggleMask
                  className={classNames({ "p-invalid": fieldState.error })}
                  header={<h1>Password security level:</h1>}
                  footer={passwordFooter}
                />
              )}
            />
            <label htmlFor="password" className={classNames({ "p-error": errors.password })}>
              Password*
            </label>
          </span>
          {getFormErrorMessage("password")}
        </div>
        {/* Change text style inside button */}
        <Button type="submit" label="Login" icon="pi pi-sign-in" iconPos="right" />
      </form>
      <Divider />
      <Link href="/register">
        <Button className="p-button-text">Doesn&apos;t have an account yet? Sign up here!</Button>
      </Link>
    </div>
  )
}

export default LoginPage
