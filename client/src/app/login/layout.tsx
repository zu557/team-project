// app/login/layout.tsx
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No navbar or footer here—just render children
  return <>{children}</>;
}
