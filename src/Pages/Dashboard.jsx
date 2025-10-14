import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import DarkModeToggle from "../components/DarkModeToggle";
export default function Dashboard() {
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="max-w-xl text-primary-text dark:text-primary-text-dark mx-auto min-h-dvh flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <div className="flex items-center justify-center gap-3 my-10">
        <Avatar className="size-16 flex items-center justify-center">
          <AvatarImage src={user?.scoutDetails?.idPhotoUrl} alt="Profile" />
          <AvatarFallback>
            {user?.fullName.split(" ")[0].charAt(0)}
            {user?.fullName.split(" ")[1].charAt(0)}
          </AvatarFallback>
        </Avatar>
        <p className="text-2xl font-light mb-5">Welcome, {user?.fullName}</p>
      </div>
      <Button
        onClick={logout}
        className="bg-primary-button cursor-pointer text-sm h-14 rounded-2xl dark:bg-primary-button-dark  hover:bg-primary-button/85 dark:hover:bg-primary-button-dark/85 text-primary-text w-2/3"
      >
        Logout
      </Button>
      <Separator className="my-5" />
      <DarkModeToggle />
    </div>
  );
}
