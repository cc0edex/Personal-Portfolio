"use client";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Calendar,
  Clock,
  Eye,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import BlogPostCreateForm from "./BlogPostCreateForm";
import BlogPostEditForm from "./BlogPostEditForm";
import { useToast } from "@/hooks/use-toast";
interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  categories: string[];
  content: string;
}

export default function BlogPostManager() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const loading = async () => {
      try {
        setIsLoading(true);
        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error("Error loading Blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loading();
  }, []);
  // Load blogs on component mount or data changes
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        const blogs = data.blogs;
        if (response.ok) {
          setPosts(blogs);
        }
      } catch (error) {
        console.error("Error Fetching blogs:", error);
        setIsLoading(true);
      }
    };

    loadBlogs();
  }, [isDataChanged]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get all unique categories
  const categories = useMemo(() => {
    const allCategories = posts.flatMap((post) => post.categories);
    return Array.from(new Set(allCategories));
  }, [posts]);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        post.categories.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  const handleCreatePost = () => {
    setEditingPost(null);
    setIsCreateDialogOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsEditDialogOpen(true);
    setIsDataChanged(!isDataChanged);
  };

  const handleDeletePost = async (postId: String, postTitle: String) => {
    if (confirm(`Are you sure you want to delete "${postTitle}" blog post?`)) {
      try {
        const response = await fetch(`/api/blogs/${postId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setIsDataChanged(!isDataChanged);
          toast({
            title: "Warning!",
            description: "Post Deleted successfully!",
            variant: "destructive",
            duration: 1500,
          });
        }
      } catch (err) {
        console.error("Error deleting blog:", err);
        alert("Failed to delete blog. Please try again later.");
      }
    }
  };

  const handleSavePost = () => {
    setIsCreateDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsDataChanged(!isDataChanged);
    toast({
      title: "Success",
      description: "Post saved successfully!",
      variant: "success",
      duration: 1500,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              Blog Posts
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your blog content
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="animate-pulse dark:bg-[#161b27]">
              <CardHeader className="pb-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mt-2"></div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                  </div>
                  <div className="flex gap-1">
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded flex-1"></div>
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded flex-1"></div>
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-8"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Blog Posts
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your blog content ({posts.length} posts)
          </p>
        </div>
        <Button
          onClick={handleCreatePost}
          className="bg-indigo-600 hover:bg-indigo-700 text-neutral-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6 dark:bg-[#161b27]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-indigo-100 dark:bg-[#161b27] border border-input outline-none ring-offset-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-3 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-48 bg-indigo-100 dark:bg-[#161b27] border border-input outline-none ring-offset-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-3 disabled:cursor-not-allowed disabled:opacity-50">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center dark:bg-[#161b27]">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
              No blog posts found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {searchTerm || selectedCategory !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by creating your first blog post."}
            </p>
            {!searchTerm && selectedCategory === "all" && (
              <Button
                onClick={handleCreatePost}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First Post
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 bg-indigo-200/70 dark:bg-[#161b27]">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base md:text-lg line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="mt-2 line-clamp-2 text-sm">
                        {post.excerpt}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 md:space-y-4">
                    {/* Meta info */}
                    <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1 text-indigo-600 text-xs font-medium dark:text-indigo-400">
                        <Calendar className="h-3 w-3" />
                        <span className="hidden sm:inline">{post.date}</span>
                        <span className="sm:hidden">
                          {post.date.split("/")[0]}/{post.date.split("/")[2]}
                        </span>
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-wrap gap-1">
                      {post.categories
                        .slice(0, isMobile ? 1 : 2)
                        .map((category) => (
                          <Badge
                            key={category}
                            variant="secondary"
                            className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                          >
                            {category}
                          </Badge>
                        ))}
                      {post.categories.length > (isMobile ? 1 : 2) && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                        >
                          +{post.categories.length - (isMobile ? 1 : 2)}
                        </Badge>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          window.open(`/blogs/${post.slug}`, "_blank")
                        }
                        className="flex-1 text-xs bg-indigo-600 hover:bg-indigo-500 text-neutral-200 hover:text-neutral-200"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditPost(post)}
                        className="flex-1 text-xs bg-white dark:bg-neutral-200 dark:text-black hover:bg-neutral-200 dark:hover:bg-neutral-400"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeletePost(post._id, post.title)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-neutral-400 dark:bg-neutral-200"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-[#161b27]">
          <DialogHeader>
            <DialogTitle>Create New Blog Post</DialogTitle>
            <DialogDescription>
              Add a new blog post to your portfolio
            </DialogDescription>
          </DialogHeader>
          <BlogPostCreateForm
            post={editingPost}
            onClose={() => setIsCreateDialogOpen(false)}
            onSave={handleSavePost}
          />
        </DialogContent>
      </Dialog>
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-[#161b27]">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>Update your blog post details</DialogDescription>
          </DialogHeader>
          <BlogPostEditForm
            post={editingPost}
            onClose={() => setIsEditDialogOpen(false)}
            onSave={handleSavePost}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
