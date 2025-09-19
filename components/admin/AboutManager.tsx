"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  GraduationCap,
  Code,
  Plus,
  Edit,
  Save,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import SkillCreateForm from "./SkillCreateForm";
import SkillEditForm from "./SkillEditForm";
import ExperienceCreateForm from "./ExperienceCreateForm";
import ExperienceEditForm from "./ExperienceEditForm";
import EducationCreateForm from "./EducationCreateForm";
import EducationEditForm from "./EducationEditForm";
import InterestsCreateForm from "./InterestsCreateForm";
import InterestsEditForm from "./InterestsEditForm";
import { useToast } from "@/hooks/use-toast";
interface Skill {
  uniqId: string;
  name: string;
  category: string;
}

interface Experience {
  uniqId: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Education {
  uniqId: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}
interface Interests {
  uniqId: string;
  interest: string;
}

export default function AboutManager() {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [interests, setInterests] = useState<Interests[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null
  );
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null
  );
  const [editingInterests, setEditingInterests] = useState<Interests | null>(
    null
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEduEditDialogOpen, setIsEduEditDialogOpen] = useState(false);
  const [isSkillCreateDialogOpen, setIsSkillCreateDialogOpen] = useState(false);
  const [isSkillEditDialogOpen, setIsSkillEditDialogOpen] = useState(false);
  const [isExpCreateDialogOpen, setIsExpCreateDialogOpen] = useState(false);
  const [isExpEditDialogOpen, setIsExpEditDialogOpen] = useState(false);
  const [isIntCreateDialogOpen, setIsIntCreateDialogOpen] = useState(false);
  const [isIntEditDialogOpen, setIsIntEditDialogOpen] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  // Load Data on component mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/api/about");
        const data = await response.json();
        const { skills, Experiences, Educations, interests } =
          data.about[0] || {};
        if (response.ok) {
          setSkills(skills || []);
          setExperience(Experiences || []);
          setEducation(Educations || []);
          setInterests(interests || []);
        }
      } catch (error) {
        console.error("Error Fetching projects:", error);
        setIsLoading(true);
      }
    };

    loadProjects();
  }, [isDataChanged]);
  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const response = await fetch("/api/about", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          skills,
          Experiences: experience,
          Educations: education,
          interests,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to save data");
      } else {
        const data = await response.json();
        console.log("Data saved successfully:", data);
        setIsSaving(false);
        toast({
          title: "Success",
          description: "About Data saved successfully!",
          variant: "success",
          duration: 1500,
        });
      }
    } catch (err) {
      console.error("Error saving data:", err);
      setIsSaving(false);
    }
  };
  // Handlers for Creating and Editing Skills
  const handleCreateSkills = () => {
    setEditingSkill(null);
    setIsSkillCreateDialogOpen(true);
  };
  const handleEditSkills = (skill: Skill) => {
    setEditingSkill(skill);
    setIsSkillEditDialogOpen(true);
  };
  const handleDeleteSkills = (skillId: String) => {
    if (confirm("Are you sure you want to delete this?")) {
      setSkills((prev) => prev.filter((skill) => skill.uniqId !== skillId));
    }
  };
  const handleSaveSkills = (skillData: Partial<Skill>) => {
    if (editingSkill) {
      // Update existing skill
      setSkills((prev) =>
        prev.map((skill) =>
          skill.uniqId === editingSkill.uniqId
            ? { ...skill, ...skillData }
            : skill
        )
      );
    } else {
      // Create new skill
      const newSkill: Skill = {
        uniqId: skillData.uniqId || "",
        name: skillData.name || "",
        category: skillData.category || "",
      };
      setSkills((prev) => [newSkill, ...prev]);
    }
    setIsSkillCreateDialogOpen(false);
    setIsSkillEditDialogOpen(false);
  };

  // Handlers for Creating and Editing Experience
  const handleCreateExperience = () => {
    setEditingExperience(null);
    setIsExpCreateDialogOpen(true);
  };
  const handleEditExperience = (experience: Experience) => {
    setEditingExperience(experience);
    setIsExpEditDialogOpen(true);
  };
  const handleDeleteExperience = (experienceId: String) => {
    if (confirm("Are you sure you want to delete this Experience details?")) {
      setExperience((prev) =>
        prev.filter((exp) => exp.uniqId !== experienceId)
      );
    }
  };
  const handleSaveExperience = (ExperienceData: Partial<Experience>) => {
    if (editingExperience) {
      // Update existing Experience
      setExperience((prev) =>
        prev.map((exp) =>
          exp.uniqId === editingExperience.uniqId
            ? { ...exp, ...ExperienceData }
            : exp
        )
      );
    } else {
      // Create new Experience
      const newExperience: Experience = {
        uniqId: ExperienceData.uniqId || "",
        title: ExperienceData.title || "",
        company: ExperienceData.company || "",
        location: ExperienceData.location || "",
        startDate: ExperienceData.startDate || "",
        endDate: ExperienceData.endDate || "",
        current: ExperienceData.current || false,
        description: ExperienceData.description || "",
      };
      setExperience((prev) => [newExperience, ...prev]);
    }
    setIsExpCreateDialogOpen(false);
    setIsExpEditDialogOpen(false);
  };

  // Handlers for Creating and Editing Education
  const handleCreateEducation = () => {
    setEditingEducation(null);
    setIsCreateDialogOpen(true);
  };
  const handleEditEducation = (education: Education) => {
    setEditingEducation(education);
    setIsCreateDialogOpen(true);
  };
  const handleDeleteEducation = (educationId: string) => {
    if (confirm("Are you sure you want to delete this Education details?")) {
      setEducation((prev) => prev.filter((edu) => edu.uniqId !== educationId));
    }
  };
  const handleSaveEducation = (EducationData: Partial<Education>) => {
    if (editingEducation) {
      // Update existing Education
      setEducation((prev) =>
        prev.map((edu) =>
          edu.uniqId === editingEducation.uniqId
            ? { ...edu, ...EducationData }
            : edu
        )
      );
    } else {
      // Create new Education
      const newEducation: Education = {
        uniqId: EducationData.uniqId || "",
        degree: EducationData.degree || "",
        school: EducationData.school || "",
        location: EducationData.location || "",
        startDate: EducationData.startDate || "",
        endDate: EducationData.endDate || "",
        current: EducationData.current || false,
        description: EducationData.description || "",
      };
      setEducation((prev) => [newEducation, ...prev]);
    }

    setIsCreateDialogOpen(false);
    setIsEduEditDialogOpen(false);
  };
  // Handlers for Creating and Editing Interestes
  const handleCreateInterests = () => {
    setEditingInterests(null);
    setIsIntCreateDialogOpen(true);
  };
  const handleEditInterests = (interests: Interests) => {
    setEditingInterests(interests);
    setIsIntCreateDialogOpen(true);
  };
  const handleDeleteInterests = (interestId: string) => {
    if (confirm("Are you sure you want to delete this Interest?")) {
      setInterests((prev) => prev.filter((int) => int.uniqId !== interestId));
    }
  };
  const handleSaveInterests = (InterestsData: Partial<Interests>) => {
    if (editingInterests) {
      // Update existing Interests
      setInterests((prev) =>
        prev.map((int) =>
          int.uniqId === editingInterests.uniqId
            ? { ...int, ...InterestsData }
            : int
        )
      );
    } else {
      // Create new Interests
      const newInterests: Interests = {
        uniqId: InterestsData.uniqId || "",
        interest: InterestsData.interest || "",
      };
      setInterests((prev) => [newInterests, ...prev]);
    }
    setIsIntCreateDialogOpen(false);
    setIsIntEditDialogOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const skillCategories = Array.from(
    new Set(skills.map((skill) => skill.category))
  );
  if (isLoading) {
    return (
      <div className="space-y-6 w-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
              About Management
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your personal information, skills, and experience
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
    <motion.div
      className="space-y-6 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            About Management
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Manage your personal information, skills, and experience
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-indigo-600 hover:bg-indigo-700 text-neutral-200"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </motion.div>
      {/* Skills Management */}
      <motion.div variants={itemVariants}>
        <Card className="dark:bg-[#161b27]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Skills Management
            </CardTitle>
            <CardDescription>
              Manage your technical skills and proficiency levels
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add New Skill */}
            {/* Skills by Category */}
            {skillCategories.map((category) => (
              <div key={category}>
                <Badge className="font-medium mb-3 bg-indigo-600 text-neutral-200 dark:text-slate-200">
                  <h4>{category}</h4>
                </Badge>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <div
                        key={skill.uniqId}
                        className="border rounded-lg p-3 bg-indigo-100 dark:bg-slate-800"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditSkills(skill)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteSkills(skill.uniqId)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-neutral-200 hover:text-neutral-200"
              onClick={handleCreateSkills}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Skills
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Experience */}
      <motion.div variants={itemVariants}>
        <Card className="dark:bg-[#161b27]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Work Experience
            </CardTitle>
            <CardDescription>
              Manage your professional experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {experience.map((exp, index) => (
              <div
                key={exp.uniqId}
                className="border rounded-lg p-4 bg-indigo-100 dark:bg-slate-800"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                      {exp.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {exp.company} • {exp.location}
                    </p>
                    <div className="flex">
                      <p className="text-sm text-slate-500">
                        {exp.startDate} -{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </p>
                      {exp.current && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditExperience(exp)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteExperience(exp.uniqId)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                {/* Article Content */}
                <article className="prose prose-indigo dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: exp.description }} />
                </article>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-neutral-200 hover:text-neutral-200"
              onClick={handleCreateExperience}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Education */}
      <motion.div variants={itemVariants}>
        <Card className="dark:bg-[#161b27]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Education
            </CardTitle>
            <CardDescription>
              Manage your educational background
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {education.map((edu, index) => (
              <div
                key={edu.uniqId}
                className="border rounded-lg p-4 bg-indigo-100 dark:bg-slate-800"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                      {edu.degree}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {edu.school} • {edu.location}
                    </p>
                    <div className="flex">
                      <p className="text-sm text-slate-500">
                        {edu.startDate} -{" "}
                        {edu.current ? "Present" : edu.endDate}
                      </p>
                      {edu.current && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Current
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditEducation(edu)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteEducation(edu.uniqId)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {edu.description}
                </p>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={handleCreateEducation}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-neutral-200 hover:text-neutral-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </CardContent>
        </Card>
      </motion.div>
      {/* Interests & Hobbies */}
      <motion.div variants={itemVariants}>
        <Card className="dark:bg-[#161b27]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Interests & Hobbies
            </CardTitle>
            <CardDescription>Manage your Interests & Hobbies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {interests.map((int, index) => (
              <div
                key={int.uniqId}
                className="border rounded-lg p-4 bg-indigo-100 dark:bg-slate-800"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                      {int.interest}
                    </h4>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEditInterests(int)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteInterests(int.uniqId)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={handleCreateInterests}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-neutral-200 hover:text-neutral-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Interests
            </Button>
          </CardContent>
        </Card>
      </motion.div>
      {/* Create skills Dialog */}
      <Dialog
        open={isSkillCreateDialogOpen}
        onOpenChange={setIsSkillCreateDialogOpen}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-[#161b27]">
          <DialogHeader>
            <DialogTitle>Create New Skills</DialogTitle>
            <DialogDescription>Add a new Skills</DialogDescription>
          </DialogHeader>
          <SkillCreateForm
            skill={editingSkill}
            onClose={() => setIsSkillCreateDialogOpen(false)}
            onSave={handleSaveSkills}
          />
        </DialogContent>
      </Dialog>
      {/* Edit skills Dialog */}
      <Dialog
        open={isSkillEditDialogOpen}
        onOpenChange={setIsSkillEditDialogOpen}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-[#161b27]">
          <DialogHeader>
            <DialogTitle>Edit Skills</DialogTitle>
            <DialogDescription>Edit your Skills</DialogDescription>
          </DialogHeader>
          <SkillEditForm
            skill={editingSkill}
            onClose={() => setIsSkillEditDialogOpen(false)}
            onSave={handleSaveSkills}
          />
        </DialogContent>
      </Dialog>
      {/* Create Experience dialog */}
      <Dialog
        open={isExpCreateDialogOpen}
        onOpenChange={setIsExpCreateDialogOpen}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-[#161b27]">
          <DialogHeader>
            <DialogTitle>Create New Experience details</DialogTitle>
            <DialogDescription>Add a new Experience details</DialogDescription>
          </DialogHeader>
          <ExperienceCreateForm
            experience={editingExperience}
            onClose={() => setIsExpCreateDialogOpen(false)}
            onSave={handleSaveExperience}
          />
        </DialogContent>
      </Dialog>
      {/* Edit Experience dialog */}
      <Dialog open={isExpEditDialogOpen} onOpenChange={setIsExpEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-[#161b27]">
          <DialogHeader>
            <DialogTitle>Edit Experience details</DialogTitle>
            <DialogDescription>
              Update your Experience details
            </DialogDescription>
          </DialogHeader>
          <ExperienceEditForm
            experience={editingExperience}
            onClose={() => setIsExpEditDialogOpen(false)}
            onSave={handleSaveExperience}
          />
        </DialogContent>
      </Dialog>
      {/* Create Education dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-[#161b27]">
          <DialogHeader>
            <DialogTitle>Create New educational background</DialogTitle>
            <DialogDescription>
              Add a new educational background
            </DialogDescription>
          </DialogHeader>
          <EducationCreateForm
            education={editingEducation}
            onClose={() => setIsCreateDialogOpen(false)}
            onSave={handleSaveEducation}
          />
        </DialogContent>
      </Dialog>
      {/* Edit Education dialog */}
      <Dialog open={isEduEditDialogOpen} onOpenChange={setIsEduEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-[#161b27]">
          <DialogHeader>
            <DialogTitle>Edit educational background</DialogTitle>
            <DialogDescription>
              Update your educational details
            </DialogDescription>
          </DialogHeader>
          <EducationEditForm
            education={editingEducation}
            onClose={() => setIsEduEditDialogOpen(false)}
            onSave={handleSaveEducation}
          />
        </DialogContent>
      </Dialog>
      {/* Create Interests */}
      <Dialog
        open={isIntCreateDialogOpen}
        onOpenChange={setIsIntCreateDialogOpen}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-[#161b27]">
          <DialogHeader>
            <DialogTitle>Create New Interest</DialogTitle>
            <DialogDescription>Add a new Interest</DialogDescription>
          </DialogHeader>
          <InterestsCreateForm
            interest={editingInterests}
            onClose={() => setIsIntCreateDialogOpen(false)}
            onSave={handleSaveInterests}
          />
        </DialogContent>
      </Dialog>
      {/* Edit Interests */}
      <Dialog open={isIntEditDialogOpen} onOpenChange={setIsIntEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-[#161b27]">
          <DialogHeader>
            <DialogTitle>Edit Interest</DialogTitle>
            <DialogDescription>Update your Interests</DialogDescription>
          </DialogHeader>
          <InterestsEditForm
            interest={editingInterests}
            onClose={() => setIsIntEditDialogOpen(false)}
            onSave={handleSaveInterests}
          />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
