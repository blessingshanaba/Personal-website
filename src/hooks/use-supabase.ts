import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

// ─── Types ───────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  live_url: string;
  github_url: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  read_time: string;
  published: boolean;
  slug: string;
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

// ─── Projects ────────────────────────────────────────────
export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (project: Omit<Project, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('projects').insert(project).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Project> & { id: string }) => {
      const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
}

// ─── Blog Posts ──────────────────────────────────────────
export function useBlogPosts(publishedOnly = true) {
  return useQuery<BlogPost[]>({
    queryKey: ['blog_posts', publishedOnly],
    queryFn: async () => {
      let query = supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      if (publishedOnly) query = query.eq('published', true);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useCreateBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (post: Omit<BlogPost, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('blog_posts').insert(post).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blog_posts'] }),
  });
}

export function useUpdateBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<BlogPost> & { id: string }) => {
      const { data, error } = await supabase.from('blog_posts').update(updates).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blog_posts'] }),
  });
}

export function useDeleteBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blog_posts'] }),
  });
}

// ─── Contacts ────────────────────────────────────────────
export function useContacts() {
  return useQuery<Contact[]>({
    queryKey: ['contacts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
}

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (contact: { name: string; email: string; subject: string; message: string }) => {
      const { data, error } = await supabase.from('contacts').insert(contact).select().single();
      if (error) throw error;
      return data;
    },
  });
}

export function useMarkContactRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, read }: { id: string; read: boolean }) => {
      const { error } = await supabase.from('contacts').update({ read }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contacts'] }),
  });
}

export function useDeleteContact() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contacts'] }),
  });
}

// ─── Admin Auth ──────────────────────────────────────────
export function useVerifyAdmin() {
  return useMutation({
    mutationFn: async (password: string) => {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('value')
        .eq('key', 'admin_password')
        .single();
      if (error) throw error;
      if (data.value !== password) throw new Error('Invalid password');
      return true;
    },
  });
}
