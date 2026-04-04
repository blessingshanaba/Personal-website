import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, FolderKanban, FileText, MessageSquare, Plus, Pencil, Trash2,
  Loader2, ArrowLeft, Star, Mail, MailOpen, X, Check
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import {
  useProjects, useCreateProject, useUpdateProject, useDeleteProject,
  useBlogPosts, useCreateBlogPost, useUpdateBlogPost, useDeleteBlogPost,
  useContacts, useMarkContactRead, useDeleteContact,
  type Project, type BlogPost,
} from '@/hooks/use-supabase';


type Tab = 'projects' | 'blog' | 'contacts';

// ─── Project Form Modal ─────────────────────────────────
interface ProjectFormProps {
  project?: Project | null;
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onClose }) => {
  const createProject = useCreateProject();
  const updateProject = useUpdateProject();
  const isEdit = !!project;

  const [form, setForm] = useState({
    title: project?.title ?? '',
    description: project?.description ?? '',
    image: project?.image ?? '',
    tags: project?.tags?.join(', ') ?? '',
    category: project?.category ?? 'Web App',
    live_url: project?.live_url ?? '#',
    github_url: project?.github_url ?? '#',
    featured: project?.featured ?? false,
    sort_order: project?.sort_order ?? 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (isEdit && project) {
        await updateProject.mutateAsync({ id: project.id, ...payload });
      } else {
        await createProject.mutateAsync(payload);
      }
      onClose();
    } catch { /* handled by mutation */ }
  };

  const isPending = createProject.isPending || updateProject.isPending;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl border border-border/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h3 className="text-lg font-bold text-foreground">{isEdit ? 'Edit Project' : 'New Project'}</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted text-muted-foreground"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required
                className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category</label>
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required
                className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} required
              className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Image URL</label>
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required
              className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Tags (comma separated)</label>
            <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="React, TypeScript, Node.js"
              className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Live URL</label>
              <input value={form.live_url} onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">GitHub URL</label>
              <input value={form.github_url} onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Sort Order</label>
              <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                <span className="text-sm font-medium text-foreground">Featured project</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-muted transition-all">Cancel</button>
            <button type="submit" disabled={isPending}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all disabled:opacity-60">
              {isPending ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
              {isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Blog Form Modal ─────────────────────────────────────
interface BlogFormProps {
  post?: BlogPost | null;
  onClose: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ post, onClose }) => {
  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();
  const isEdit = !!post;

  const [form, setForm] = useState({
    title: post?.title ?? '',
    excerpt: post?.excerpt ?? '',
    content: post?.content ?? '',
    image: post?.image ?? '',
    category: post?.category ?? '',
    read_time: post?.read_time ?? '5 min read',
    published: post?.published ?? true,
    slug: post?.slug ?? '',
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, slug: form.slug || generateSlug(form.title) };

    try {
      if (isEdit && post) {
        await updatePost.mutateAsync({ id: post.id, ...payload });
      } else {
        await createPost.mutateAsync(payload);
      }
      onClose();
    } catch { /* handled */ }
  };

  const isPending = createPost.isPending || updatePost.isPending;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card rounded-2xl border border-border/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <h3 className="text-lg font-bold text-foreground">{isEdit ? 'Edit Blog Post' : 'New Blog Post'}</h3>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted text-muted-foreground"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || generateSlug(e.target.value) })} required
              className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category</label>
              <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required
                className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Read Time</label>
              <input value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Slug</label>
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Image URL</label>
            <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required
              className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Excerpt</label>
            <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} required
              className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Content</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6}
              className="w-full px-3 py-2.5 rounded-xl bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
              <span className="text-sm font-medium text-foreground">Published</span>
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-muted transition-all">Cancel</button>
            <button type="submit" disabled={isPending}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all disabled:opacity-60">
              {isPending ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
              {isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Admin Dashboard ─────────────────────────────────────
const AdminDashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('projects');

  // Projects
  const { data: projects = [], isLoading: loadingProjects } = useProjects();
  const deleteProject = useDeleteProject();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);

  // Blog
  const { data: blogPosts = [], isLoading: loadingBlog } = useBlogPosts(false);
  const deleteBlogPost = useDeleteBlogPost();
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showBlogForm, setShowBlogForm] = useState(false);

  // Contacts
  const { data: contacts = [], isLoading: loadingContacts } = useContacts();
  const markRead = useMarkContactRead();
  const deleteContact = useDeleteContact();
  const [expandedContact, setExpandedContact] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;



  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const unreadCount = contacts.filter((c) => !c.read).length;

  const tabs = [
    { id: 'projects' as Tab, label: 'Projects', icon: FolderKanban, count: projects.length },
    { id: 'blog' as Tab, label: 'Blog Posts', icon: FileText, count: blogPosts.length },
    { id: 'contacts' as Tab, label: 'Messages', icon: MessageSquare, count: unreadCount || undefined },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-lg font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <button onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border/50 pb-4 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}>
                <Icon size={16} />
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                    activeTab === tab.id ? 'bg-white/20' : 'bg-primary/10 text-primary'
                  }`}>{tab.count}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* ─── Projects Tab ──────────────────────────── */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Projects ({projects.length})</h2>
              <button onClick={() => { setEditingProject(null); setShowProjectForm(true); }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all">
                <Plus size={16} /> Add Project
              </button>
            </div>

            {loadingProjects ? (
              <div className="flex justify-center py-12"><Loader2 size={28} className="animate-spin text-primary" /></div>
            ) : (
              <div className="space-y-3">
                {projects.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/10 transition-all">
                    <img src={p.image} alt={p.title} className="w-16 h-12 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground truncate">{p.title}</h3>
                        {p.featured && <Star size={14} className="text-yellow-500 fill-yellow-500 shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground">{p.category} &middot; {p.tags.join(', ')}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => { setEditingProject(p); setShowProjectForm(true); }}
                        className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all" title="Edit">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => { if (confirm('Delete this project?')) deleteProject.mutate(p.id); }}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-all" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showProjectForm && (
              <ProjectForm project={editingProject} onClose={() => { setShowProjectForm(false); setEditingProject(null); }} />
            )}
          </div>
        )}

        {/* ─── Blog Tab ──────────────────────────────── */}
        {activeTab === 'blog' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Blog Posts ({blogPosts.length})</h2>
              <button onClick={() => { setEditingPost(null); setShowBlogForm(true); }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-all">
                <Plus size={16} /> New Post
              </button>
            </div>

            {loadingBlog ? (
              <div className="flex justify-center py-12"><Loader2 size={28} className="animate-spin text-primary" /></div>
            ) : (
              <div className="space-y-3">
                {blogPosts.map((post) => (
                  <div key={post.id} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/10 transition-all">
                    <img src={post.image} alt={post.title} className="w-16 h-12 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground truncate">{post.title}</h3>
                        {post.published ? (
                          <span className="px-2 py-0.5 text-xs font-medium bg-green-500/10 text-green-600 dark:text-green-400 rounded-full shrink-0">Published</span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs font-medium bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 rounded-full shrink-0">Draft</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{post.category} &middot; {post.read_time}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => { setEditingPost(post); setShowBlogForm(true); }}
                        className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all" title="Edit">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => { if (confirm('Delete this post?')) deleteBlogPost.mutate(post.id); }}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-all" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showBlogForm && (
              <BlogForm post={editingPost} onClose={() => { setShowBlogForm(false); setEditingPost(null); }} />
            )}
          </div>
        )}

        {/* ─── Contacts Tab ──────────────────────────── */}
        {activeTab === 'contacts' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">
                Messages ({contacts.length})
                {unreadCount > 0 && (
                  <span className="ml-2 text-sm font-normal text-primary">{unreadCount} unread</span>
                )}
              </h2>
            </div>

            {loadingContacts ? (
              <div className="flex justify-center py-12"><Loader2 size={28} className="animate-spin text-primary" /></div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <MessageSquare size={40} className="mx-auto mb-4 opacity-30" />
                <p>No messages yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div key={contact.id}
                    className={`rounded-xl border transition-all ${
                      contact.read
                        ? 'bg-card border-border/50'
                        : 'bg-primary/5 border-primary/20'
                    }`}>
                    <button
                      onClick={() => {
                        setExpandedContact(expandedContact === contact.id ? null : contact.id);
                        if (!contact.read) markRead.mutate({ id: contact.id, read: true });
                      }}
                      className="w-full text-left p-4 flex items-center gap-4"
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${contact.read ? 'bg-muted text-muted-foreground' : 'bg-primary/10 text-primary'}`}>
                        {contact.read ? <MailOpen size={18} /> : <Mail size={18} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-semibold truncate ${contact.read ? 'text-foreground' : 'text-primary'}`}>{contact.name}</h3>
                          <span className="text-xs text-muted-foreground shrink-0">
                            {new Date(contact.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{contact.subject} — {contact.message}</p>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); if (confirm('Delete this message?')) deleteContact.mutate(contact.id); }}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-all shrink-0" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </button>

                    {expandedContact === contact.id && (
                      <div className="px-4 pb-4 pt-0 border-t border-border/50 mt-0">
                        <div className="pt-4 space-y-3">
                          <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">Email: </span>
                              <a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Subject: </span>
                              <span className="text-foreground font-medium">{contact.subject}</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-sm text-muted-foreground">Message:</span>
                            <p className="mt-1 text-sm text-foreground bg-muted/50 rounded-lg p-3">{contact.message}</p>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Received: {new Date(contact.created_at).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
