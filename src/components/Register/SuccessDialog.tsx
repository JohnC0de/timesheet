import Link from "next/link"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import type { RegisterFormData } from "../../pages/register"

type SuccessDialogProps = {
  showMessage: boolean
  setShowMessage: (showMessage: boolean) => void
  formData: RegisterFormData
}

export function SuccessDialog({ showMessage, setShowMessage, formData }: SuccessDialogProps) {
  const dialogFooter = (
    <div className="flex justify-center">
      <Link href="/">
        <Button label="OK" className="p-button-text" autoFocus />
      </Link>
    </div>
  )

  return (
    <Dialog
      visible={showMessage}
      onHide={() => setShowMessage(false)}
      position="center"
      footer={dialogFooter}
      showHeader={false}
      className="w-[85vw] md:w-[50vw] lg:w-[30vw]"
    >
      <div className="flex flex-col items-center gap-6 px-3 pt-6 text-center">
        <i className="pi pi-check-circle" style={{ fontSize: "5rem", color: "var(--green-500)" }}></i>
        <h5 className="text-xl font-semibold">Registration Successful!</h5>
        <p>
          Congratulations <b>{formData.name}</b>! You are now part of our team!
        </p>
        <p>
          Please check <b>{formData.email}</b> to confirm your account.
        </p>
      </div>
    </Dialog>
  )
}
