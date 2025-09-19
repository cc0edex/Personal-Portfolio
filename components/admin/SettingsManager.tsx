"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, User, Globe, Camera, X } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function SettingsManager() {
  const { toast } = useToast();
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    location: "",
    phone: "",
    cvLink: "",
    profileImg: { url: "/placeholder.svg", public_id: "" },
    bio: "",
    about: "",
    siteTitle: "",
    siteDescription: "",
    facebookUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load Data on component mount
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/api/settings");
        const data = await response.json();
        const settings = data.settings[0];
        if (response.ok) {
          setSettings(settings);
        }
      } catch (error) {
        console.error("Error Fetching projects:", error);
      }
    };

    loadProjects();
  }, [isDataChanged]);

  // Handle image file selection and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfileImg(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Function to get the image source for display
  const getImageSrc = () => {
    if (previewUrl) {
      return previewUrl;
    }
    return settings.profileImg.url || "/placeholder.svg";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData();
    formData.append("name", settings.name);
    formData.append("email", settings.email);
    formData.append("location", settings.location);
    formData.append("phone", settings.phone);
    formData.append("cvLink", settings.cvLink);
    if (profileImg) {
      formData.append("profileImg", profileImg);
    }
    formData.append("bio", settings.bio);
    formData.append("about", settings.about);
    formData.append("siteTitle", settings.siteTitle);
    formData.append("siteDescription", settings.siteDescription);
    formData.append("facebookUrl", settings.facebookUrl);
    formData.append("githubUrl", settings.githubUrl);
    formData.append("linkedinUrl", settings.linkedinUrl);
    formData.append("twitterUrl", settings.twitterUrl);
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to save data");
      } else {
        const data = await response.json();
        // Clear preview after successful save
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        setProfileImg(null);
        setIsDataChanged(!isDataChanged); // Refresh data
        toast({
          title: "Success",
          description: "Settings saved successfully!",
          variant: "success",
          duration: 1500,
        });
        setIsSaving(false);
      }
    } catch (err) {
      console.error("Error saving data:", err);
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
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
              Settings
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your portfolio settings and preferences
            </p>
          </div>
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-indigo-600 hover:bg-indigo-700 text-neutral-200"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <motion.div variants={itemVariants}>
            <Card className="dark:bg-[#161b27]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Profile Image Section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-200 dark:border-slate-700">
                      <Image
                        src={getImageSrc()}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {settings.profileImg.url !== "/placeholder.svg" && (
                      <Button
                        size="sm"
                        type="button"
                        variant="destructive"
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="flex items-center gap-2"
                    >
                      {isUploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Camera className="h-4 w-4" />
                          Change Photo
                        </>
                      )}
                    </Button>
                  </div>

                  <Input
                    ref={fileInputRef}
                    type="file"
                    id="profileImg"
                    name="profileImg"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                    Recommended: Square image, at least 400x400px, max 5MB
                  </p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={settings.name}
                      onChange={handleChange}
                      className="dark:bg-transparent dark:border-2 dark:border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      className="dark:bg-transparent dark:border-2 dark:border-gray-700"
                      value={settings.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      className="dark:bg-transparent dark:border-2 dark:border-gray-700"
                      id="location"
                      name="location"
                      value={settings.location}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      className="dark:bg-transparent dark:border-2 dark:border-gray-700"
                      value={settings.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvLink">Cv Link</Label>
                  <Input
                    id="cvLink"
                    name="cvLink"
                    className="dark:bg-transparent dark:border-2 dark:border-gray-700"
                    value={settings.cvLink}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    className="dark:bg-transparent dark:border-2 dark:border-gray-700"
                    value={settings.bio}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about">About You</Label>
                  <Textarea
                    id="about"
                    name="about"
                    className="dark:bg-transparent dark:border-2 dark:border-gray-700"
                    value={settings.about}
                    onChange={handleChange}
                    rows={10}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Site Settings */}
          <motion.div variants={itemVariants}>
            <Card className="dark:bg-[#161b27]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Site Settings
                </CardTitle>
                <CardDescription>
                  Configure your website settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteTitle">Site Title</Label>
                  <Input
                    className="dark:bg-transparent dark:border-2 dark:border-gray-700"
                    id="siteTitle"
                    name="siteTitle"
                    value={settings.siteTitle}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    className="dark:bg-transparent dark:border-2 dark:border-gray-700"
                    id="siteDescription"
                    name="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <Card className="dark:bg-[#161b27]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Social Links
                </CardTitle>
                <CardDescription>
                  Update your social media profiles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebookUrl">Facebook URL</Label>
                  <Input
                    className="dark:bg-transparent dark:border-2 dark:border-gray-700"
                    id="facebookUrl"
                    name="facebookUrl"
                    value={settings.facebookUrl}
                    onChange={handleChange}
                    placeholder=""
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    className="dark:bg-transparent dark:border-2 dark:border-gray-700"
                    id="githubUrl"
                    name="githubUrl"
                    value={settings.githubUrl}
                    onChange={handleChange}
                    placeholder=""
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    className="dark:bg-transparent dark:border-2 dark:border-gray-700"
                    id="linkedinUrl"
                    name="linkedinUrl"
                    value={settings.linkedinUrl}
                    onChange={handleChange}
                    placeholder=""
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitterUrl">Twitter URL</Label>
                  <Input
                    className="dark:bg-transparent dark:border-2 dark:border-gray-700"
                    id="twitterUrl"
                    name="twitterUrl"
                    value={settings.twitterUrl}
                    onChange={handleChange}
                    placeholder=""
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </form>
  );
}
