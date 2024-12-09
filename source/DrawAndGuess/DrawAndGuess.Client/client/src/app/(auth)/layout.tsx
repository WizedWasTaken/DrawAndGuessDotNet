export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-grow flex-col justify-center items-center">
      {children}
    </main>
  );
}
