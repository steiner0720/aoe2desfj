import { signIn, signOut, useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languages = routing?.locales ?? [];
  const currentLanguageLabel = t(`locale.${locale}`);

  const onClick = (lang: Locale) => {
    const newPath = pathname.replace(`/${locale}`, `/${lang}`);
    router.replace(newPath);
  };

  const dropdownItems = languages.map((lang) => (
    <DropdownMenuItem key={lang} onClick={() => onClick(lang)}>
      {t(`locale.${lang}`)}
    </DropdownMenuItem>
  ));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{currentLanguageLabel}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>{dropdownItems}</DropdownMenuContent>
    </DropdownMenu>
  );
}

function LayoutAvatarDropdown() {
  const { data } = useSession();
  const isLogged = !!data;

  const { image: avatar, name } = data?.user ?? {};
  const handleSignIn = () => {
    signIn("google");
  };

  return isLogged ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-1 text-center">
          <img
            src={avatar ?? ""}
            alt="avatar"
            className="h-5 w-5 overflow-hidden rounded-full"
          />
          <div className="text-[16px] font-bold">{name}</div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => signOut()}>SignOut</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button variant="outline" onClick={handleSignIn}>
      SignIn
    </Button>
  );
}

function LayoutHeader() {
  return (
    <div className="fixed top-0 flex h-16 w-full items-center justify-between bg-white px-6 py-2 shadow-md shadow-slate-200 backdrop-blur-md">
      <div className="text-xl font-bold text-slate-700">
        <Link href="/">AOE2 DE SFJ</Link>
      </div>
      <div className="flex gap-4">
        <LanguageSwitcher />
        <LayoutAvatarDropdown />
      </div>
    </div>
  );
}

export default LayoutHeader;
