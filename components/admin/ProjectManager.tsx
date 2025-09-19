"use client";

import type React from "react";

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
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  ExternalLink,
  Github,
  Star,
  FolderOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import ProjectCreateForm from "./ProjectCreateForm";
import ProjectEditForm from "./ProjectEditForm";
import { useToast } from "@/hooks/use-toast";

interface Project {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}
export default function ProjectManager() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    const loading = async () => {
      try {
        setIsLoading(true);
        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loading();
  }, []);
  // Load projects on component mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        const projects = data.projects;
        if (response.ok) {
          setProjectList(projects);
        }
      } catch (error) {
        console.error("Error Fetching projects:", error);
        setIsLoading(true);
      }
    };

    loadProjects();
  }, [isDataChanged]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projectList.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [projectList, searchTerm]);

  const handleCreateProject = () => {
    setEditingProject(null);
    setIsCreateDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsEditDialogOpen(true);
    setIsDataChanged(!isDataChanged);
  };

  const handleDeleteProject = async (
    projectId: String,
    projectTitle: String
  ) => {
    if (confirm(`Are you sure you want to delete [${projectTitle}] project?`)) {
      try {
        const response = await fetch(`/api/projects/${projectId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setIsDataChanged(!isDataChanged);
          toast({
            title: "Warning!",
            description: "Project Deleted successfully!",
            variant: "destructive",
            duration: 1500,
          });
        }
      } catch (err) {
        console.error("Error deleting project:", err);
        alert("Failed to delete project. Please try again later.");
      }
    }
  };

  const handleSaveProject = () => {
    setIsCreateDialogOpen(false);
    setIsEditDialogOpen(false);
    setIsDataChanged(!isDataChanged);
    toast({
      title: "Success",
      description: "Project saved successfully!",
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
              Projects
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your portfolio projects
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, index) => (
            <Card key={index} className="animate-pulse dark:bg-[#161b27]">
              <CardHeader className="pb-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full mt-2"></div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex gap-1">
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                    <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded flex-1"></div>
                    <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded flex-1"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-20"></div>
                    <div className="flex gap-2">
                      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-8"></div>
                      <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-8"></div>
                    </div>
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
            Projects
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your portfolio projects ({projectList.length} projects)
          </p>
        </div>
        <Button
          onClick={handleCreateProject}
          className="bg-indigo-600 hover:bg-indigo-700 text-slate-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6 dark:bg-[#161b27]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-indigo-100 dark:bg-[#161b27] border border-input outline-none ring-offset-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-3 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center dark:bg-[#161b27]">
            <FolderOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-2">
              No projects found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {searchTerm
                ? "Try adjusting your search criteria."
                : "Get started by creating your first project."}
            </p>
            {!searchTerm && (
              <Button
                onClick={handleCreateProject}
                className="bg-indigo-600 hover:bg-indigo-700 text-slate-200"
              >
                <Plus className="h-4 w-4 mr-2 " />
                Create First Project
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 bg-indigo-200 dark:bg-[#161b27]">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base md:text-lg truncate">
                          {project.title}
                        </CardTitle>
                        {project.featured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current shrink-0" />
                        )}
                      </div>
                      <CardDescription className="mt-2 line-clamp-2 text-sm">
                        {project.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 md:space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, isMobile ? 2 : 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {project.tags.length > (isMobile ? 2 : 3) && (
                        <Badge
                          variant="outline"
                          className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
                        >
                          +{project.tags.length - (isMobile ? 2 : 3)}
                        </Badge>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(project.liveUrl, "_blank")}
                          className="flex-1 text-xs bg-indigo-600 hover:bg-indigo-500 text-neutral-200 hover:text-neutral-200"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          {isMobile ? "Demo" : "Live Demo"}
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            window.open(project.githubUrl, "_blank")
                          }
                          className="flex-1 text-xs bg-white dark:bg-neutral-200 dark:text-black hover:bg-neutral-200 dark:hover:bg-neutral-400"
                        >
                          <Github className="h-3 w-3 mr-1" />
                          Code
                        </Button>
                      )}
                    </div>

                    {/* Featured Toggle */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={project.featured}
                          aria-readonly="true"
                          className="data-[state=checked]:bg-indigo-600"
                        />
                        <Label className="text-sm">Featured</Label>
                      </div>
                      <div className="flex items-center gap-1 md:gap-2">
                        <Button
                          onClick={() => handleEditProject(project)}
                          size="sm"
                          variant="outline"
                          className="dark:hover:bg-neutral-400 dark:bg-neutral-200 dark:text-slate-900"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) =>
                            handleDeleteProject(project._id, project.title)
                          }
                          className="text-red-600 hover:text-red-700 dark:hover:bg-neutral-400 dark:bg-neutral-200"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
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
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>Add a new project</DialogDescription>
          </DialogHeader>
          <ProjectCreateForm
            project={editingProject}
            onClose={() => setIsCreateDialogOpen(false)}
            onSave={handleSaveProject}
          />
        </DialogContent>
      </Dialog>
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-[#161b27]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>Update your project details</DialogDescription>
          </DialogHeader>
          <ProjectEditForm
            project={editingProject}
            onClose={() => setIsEditDialogOpen(false)}
            onSave={handleSaveProject}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
