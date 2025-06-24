import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function SettingsPage() {

  const session =  await auth();

  const handleLogout = async () => {
      "use server"
      await signOut({ 
        redirect: true,
        redirectTo:"/auth/login" 
      });
  };

  return (
    <>
      <div className="m-10">
        { JSON.stringify( session , null , 3 ) }
      </div>

      <form action={handleLogout}>
          <Button className="m-5 cursor-pointer" type="submit"> Log out</Button>
      </form>
    </>
  )
}