import { type NextPage } from "next"
import Link from "next/link"
import { Button } from "primereact/button"
import { Divider } from "primereact/divider"
import { InputText } from "primereact/inputtext"
import { Password } from "primereact/password"
import { classNames } from "primereact/utils"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { SuccessDialog } from "../components/Register/SuccessDialog"
import { trpc } from "../utils/trpc"

export type RegisterFormData = {
  name: string
  email: string
  password: string
}

const RegisterPage: NextPage = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: ""
  })

  const {
    control,
    formState: { errors },
    setError,
    handleSubmit,
    reset
  } = useForm<RegisterFormData>()

  const userCreate = trpc.user.register.useMutation({
    onSuccess: () => {
      console.log("Success")
      setShowMessage(true)
      reset()
    },
    onError: error => {
      if (error.message === "Email already exists") {
        setError("email", { type: "manual", message: error.message })
      }
    }
  })

  const onSubmit = (data: RegisterFormData) => {
    setFormData(data)
    userCreate.mutate(data)
  }

  const getFormErrorMessage = (name: keyof RegisterFormData) => {
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
      <SuccessDialog formData={formData} showMessage={showMessage} setShowMessage={setShowMessage} />
      <div className="mb-6 grid grid-cols-3 items-center gap-4">
        <Link href="/login">
          <Button icon="pi pi-arrow-left" className="p-button-text" />
        </Link>
        <h5 className="justify-self-center text-xl font-semibold">Register</h5>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid flex flex-col gap-8">
        <div>
          <span className="p-float-label p-input-icon-right">
            <i className="pi pi-user" />
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required." }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  autoFocus
                  className={classNames({ "p-invalid": fieldState.error })}
                />
              )}
            />
            <label htmlFor="name" className={classNames({ "p-error": errors.name })}>
              Name*
            </label>
          </span>
          {getFormErrorMessage("name")}
        </div>

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
        <Button type="submit" label="Submit" icon="pi pi-user-plus" iconPos="right" disabled={userCreate.isLoading} />
      </form>
      <Divider />
      <Link href="/login">
        <Button className="p-button-text">Already have an account? Click here to login.</Button>
      </Link>
    </div>
  )
}

export default RegisterPage
