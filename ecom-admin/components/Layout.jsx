import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "@/components/Nav";
export default function Layout({ children }) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-dark w-screen h-screen flex items-center justify-center">
        <button
          onClick={() => signIn("google")}
          className="bg-light p-2 text-center rounded-lg px-4"
        >
          Login with google
        </button>
      </div>
    );
  }

  return (
    <div className="bg-dark min-h-screen flex">
      <Nav />
      <div className=" bg-light flex-grow mt-2 mr-2 rounded-lg p-4 mb-2">
        {children}
      </div>
    </div>
  );
}
