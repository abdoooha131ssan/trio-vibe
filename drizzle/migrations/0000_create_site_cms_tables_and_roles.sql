CREATE TABLE public.site_content (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  type text NOT NULL CHECK (type IN ('text', 'image', 'link', 'data', 'sections', 'custom-section', 'snapshot', 'meta')),
  page text NOT NULL DEFAULT 'home',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.site_theme (
  id boolean PRIMARY KEY DEFAULT true CHECK (id),
  primary_color text NOT NULL,
  secondary_color text NOT NULL,
  background_color text NOT NULL,
  text_color text NOT NULL,
  button_color text NOT NULL,
  font text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_theme TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.site_theme TO authenticated;
GRANT ALL ON public.site_theme TO service_role;
ALTER TABLE public.site_theme ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'user')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_site_role(_role text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role = _role
  );
$$;
REVOKE ALL ON FUNCTION public.has_site_role(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_site_role(text) TO authenticated;

CREATE POLICY "Public can read site content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Admins can insert site content" ON public.site_content FOR INSERT TO authenticated WITH CHECK (public.has_site_role('admin'));
CREATE POLICY "Admins can update site content" ON public.site_content FOR UPDATE TO authenticated USING (public.has_site_role('admin')) WITH CHECK (public.has_site_role('admin'));
CREATE POLICY "Admins can delete site content" ON public.site_content FOR DELETE TO authenticated USING (public.has_site_role('admin'));
CREATE POLICY "Public can read site theme" ON public.site_theme FOR SELECT USING (true);
CREATE POLICY "Admins can insert site theme" ON public.site_theme FOR INSERT TO authenticated WITH CHECK (public.has_site_role('admin'));
CREATE POLICY "Admins can update site theme" ON public.site_theme FOR UPDATE TO authenticated USING (public.has_site_role('admin')) WITH CHECK (public.has_site_role('admin'));
CREATE POLICY "Admins can delete site theme" ON public.site_theme FOR DELETE TO authenticated USING (public.has_site_role('admin'));
CREATE POLICY "Users can read own role and admins can read roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_site_role('admin'));

CREATE OR REPLACE FUNCTION public.assign_site_user_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    CASE WHEN lower(coalesce(NEW.email, '')) = 'admin@mysite.com' THEN 'admin' ELSE 'user' END
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.assign_site_user_role() FROM PUBLIC;
CREATE TRIGGER on_auth_user_created_assign_site_role
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.assign_site_user_role();

ALTER PUBLICATION supabase_realtime ADD TABLE public.site_content;
ALTER PUBLICATION supabase_realtime ADD TABLE public.site_theme;