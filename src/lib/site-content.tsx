import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { getPublicSiteContent, type SiteContentResult, type SiteTheme } from "./site-content.functions";
import type { Json } from "@/integrations/supabase/types";

type SiteCMSValue = {
  content: Record<string, Json>;
  theme: SiteTheme;
  role: "admin" | "user" | null;
  refresh: () => Promise<void>;
  setTheme: (theme: SiteTheme) => void;
};

const SiteCMSContext = createContext<SiteCMSValue | null>(null);

export function SiteCMSProvider({
  initialData,
  children,
}: {
  initialData: SiteContentResult;
  children: ReactNode;
}) {
  const [content, setContent] = useState(initialData.content);
  const [theme, setTheme] = useState(initialData.theme);
  const [role, setRole] = useState<"admin" | "user" | null>(null);

  const refresh = useCallback(async () => {
    const next = await getPublicSiteContent();
    setContent(next.content);
    setTheme(next.theme);
  }, []);

  useEffect(() => {
    setContent(initialData.content);
    setTheme(initialData.theme);
  }, [initialData]);

  useEffect(() => {
    const channel = supabase
      .channel(`site-content-${Date.now()}-${Math.random().toString(36).slice(2)}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "site_content" }, () => {
        void refresh().catch(() => undefined);
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "site_theme" }, () => {
        void refresh().catch(() => undefined);
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [refresh]);

  useEffect(() => {
    let active = true;
    const syncRole = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!active) return;
      if (!userId) {
        setRole(null);
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .maybeSingle();
      if (active) setRole(data?.role === "admin" || data?.role === "user" ? data.role : null);
    };

    void syncRole();
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        void Promise.resolve().then(syncRole);
      }
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--background", theme.background_color);
    root.style.setProperty("--card", theme.secondary_color);
    root.style.setProperty("--popover", theme.secondary_color);
    root.style.setProperty("--secondary", theme.secondary_color);
    root.style.setProperty("--muted", theme.secondary_color);
    root.style.setProperty("--surface", theme.secondary_color);
    root.style.setProperty("--surface-raised", theme.secondary_color);
    root.style.setProperty("--foreground", theme.text_color);
    root.style.setProperty("--card-foreground", theme.text_color);
    root.style.setProperty("--popover-foreground", theme.text_color);
    root.style.setProperty("--secondary-foreground", theme.text_color);
    root.style.setProperty("--brand-orange", theme.primary_color);
    root.style.setProperty("--primary", theme.button_color);
    root.style.setProperty("--ring", theme.primary_color);
    root.style.setProperty("--chart-1", theme.primary_color);
    root.style.setProperty("--font-sans", `"${theme.font}", ui-sans-serif, system-ui, sans-serif`);
  }, [theme]);

  const value = useMemo(
    () => ({ content, theme, role, refresh, setTheme }),
    [content, theme, role, refresh],
  );

  return <SiteCMSContext.Provider value={value}>{children}</SiteCMSContext.Provider>;
}

export function useSiteCMS() {
  const value = useContext(SiteCMSContext);
  if (!value) throw new Error("Site content is not available outside the website provider.");
  return value;
}

export function useSiteBlock<T>(key: string): T {
  const { content } = useSiteCMS();
  const value = content[key];
  if (value === undefined) throw new Error(`Website content block “${key}” is missing.`);
  return value as T;
}