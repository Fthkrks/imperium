import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type SiteShellProps = {
  children: ReactNode;
  forceSolidHeader?: boolean;
};

export function SiteShell({ children, forceSolidHeader = false }: SiteShellProps) {
  return (
    <>
      <SiteHeader forceSolid={forceSolidHeader} />
      <main className={forceSolidHeader ? "main-solid-header" : undefined}>{children}</main>
      <SiteFooter />
    </>
  );
}