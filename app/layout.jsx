export const metadata = {
  title: "NY Trading Journal",
  description: "Trading journal dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
