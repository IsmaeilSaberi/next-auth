import SignOut from "@/components/signOut/SignOut";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
      <h1>Account</h1>
      {session ? (
        <div className="flex flex-col gap-4 bg-indigo-200 rounded-md p-8">
          <div>{session.user.name}</div>
          <div>{session.user.email}</div>
          <div>{session.user.image}</div>
        </div>
      ) : (
        <div></div>
      )}
      <SignOut />
    </div>
  );
}
