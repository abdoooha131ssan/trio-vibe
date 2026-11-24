import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/integrations/supabase/types";

export type SiteTheme = {
  primary_color: string;
  secondary_color: string;
  background_color: string;
  text_color: string;
  button_color: string;
  font: string;
};

export type SiteContentResult = {
  content: Record<string, Json>;
  theme: SiteTheme;
};

function createPublishableClient(url: string, key: string) {
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(
          typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
        );
        if (init?.headers) {
          new Headers(init.headers).forEach((value, name) => headers.set(name, value));
        }
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export const getPublicSiteContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteContentResult> => {
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) throw new Error("The website content service is not configured.");

    const client = createPublishableClient(url, key);
    const [{ data: rows, error: contentError }, { data: themeRow, error: themeError }] =
      await Promise.all([
        client.from("site_content").select("key, value, type, page").order("key"),
        client
          .from("site_theme")
          .select("primary_color, secondary_color, background_color, text_color, button_color, font")
          .eq("id", true)
          .maybeSingle(),
      ]);

    if (contentError) throw new Error("The website content could not be loaded.");
    if (themeError || !themeRow) throw new Error("The website theme could not be loaded.");

    const content: Record<string, Json> = {};
    for (const row of rows ?? []) content[row.key] = row.value;

    const mediaValue = content["site.media"];
    if (mediaValue && typeof mediaValue === "object" && !Array.isArray(mediaValue)) {
      const media = mediaValue as Record<
        string,
        { src?: string; srcSet?: string; width?: number; height?: number }
      >;
      await Promise.all(
        Object.entries(media).map(async ([name, asset]) => {
          if (!asset.src?.startsWith("storage://")) return;
          const path = asset.src.slice("storage://".length);
          const { data, error } = await client.storage
            .from("site-media")
            .createSignedUrl(path, 60 * 60 * 24 * 365);
          if (error || !data?.signedUrl) return;
          const { srcSet: _srcSet, ...rest } = asset;
          media[name] = { ...rest, src: data.signedUrl };
        }),
      );
      content["site.media"] = media as Json;
    }

    return {
      content,
      theme: {
        primary_color: themeRow.primary_color,
        secondary_color: themeRow.secondary_color,
        background_color: themeRow.background_color,
        text_color: themeRow.text_color,
        button_color: themeRow.button_color,
        font: themeRow.font,
      },
    };
  },
);