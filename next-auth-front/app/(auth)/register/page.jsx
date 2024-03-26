import Register from "@/components/register/Register";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/account");
  }
  return (
    <main>
      <Register />
    </main>
  );
}
