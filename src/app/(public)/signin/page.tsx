import { SignInForm } from "@/components/composed/signin-form";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex w-full max-w-sm">
        <SignInForm />
      </div>
    </div>
  );
}
