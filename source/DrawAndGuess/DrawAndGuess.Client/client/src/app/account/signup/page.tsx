import SignUpForm from "@/components/form/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex flex-col flex-grow items-center justify-center p-5">
      <h1 className="text-3xl font-bold">Opret konto</h1>
      <p className="mt-2 text-sm text-gray-600">
        Opret en konto her, for at starte med at bruge vores tjenester.
      </p>
      <SignUpForm className="w-full" />
    </div>
  );
}
