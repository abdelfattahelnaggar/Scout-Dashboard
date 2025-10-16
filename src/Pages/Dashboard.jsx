import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import DarkModeToggle from "../components/DarkModeToggle";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { useTranslation } from "react-i18next";
import LanguageButton from "../components/LanguageButton";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react";
export default function Dashboard() {
  const { t } = useTranslation();

  useDocumentHead({
    title: "Dashboard | Scout Dashboard",
    description: "Dashboard to manage your scout website.",
    keywords: "scout, dashboard, admin, moderator",
    meta: {
      "apple-mobile-web-app-title": "Scout Dashboard",
      "apple-mobile-web-app-capable": "yes",
    },
  });
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="max-w-xl text-primary-text dark:text-primary-text-dark mx-auto min-h-dvh flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">{t("Dashboard")}</h1>
      <div className="flex flex-nowrap items-center justify-center gap-3 mt-10">
        <Avatar className="size-16 flex items-center justify-center">
          <AvatarImage src={user?.scoutDetails?.idPhotoUrl} alt="Profile" />
          <AvatarFallback>
            {user?.fullName.split(" ")[0].charAt(0)}
            {user?.fullName.split(" ")[1].charAt(0)}
          </AvatarFallback>
        </Avatar>
        <p className="text-2xl font-light leading-none whitespace-nowrap">
          {t("Welcome")}, {user?.fullName}
        </p>
      </div>
      <div className="flex items-center justify-center mb-10 gap-3">
        {user?.status === "ACTIVE" && (
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600 px-2 py-1 text-sm"
          >
            <BadgeCheckIcon />
            {t("Active")}
          </Badge>
        )}
        <Badge className="px-2 py-1 text-sm">{user.role}</Badge>
      </div>
      {/* ============== Logout Button ============== */}
      <Button
        onClick={logout}
        className="bg-primary-button cursor-pointer text-sm h-14 rounded-2xl dark:bg-primary-button-dark  hover:bg-primary-button/85 dark:hover:bg-primary-button-dark/85 text-primary-text w-2/3"
      >
        {t("Logout")}
      </Button>
      <Separator className="my-5" />
      <div className="flex items-center justify-around w-full gap-3">
        <DarkModeToggle />
        <LanguageButton />
      </div>
    </div>
  );
}
