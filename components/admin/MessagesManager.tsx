"use client";
import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Search, Clock, User, MessageSquare, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

import { useToast } from "@/hooks/use-toast";

export default function MessagesManager() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDataChanged, setIsDataChanged] = useState(false);
  const toast = useToast();
  useEffect(() => {
    const loading = async () => {
      try {
        setIsLoading(true);
        // Simulate loading delay
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (error) {
        console.error("Error loading Messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loading();
  }, []);
  // Load Messages on component mount or data changes
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await fetch("/api/messages");
        const data = await response.json();
        const messages = data.messages;
        if (response.ok) {
          setMessages(messages);
        }
      } catch (error) {
        console.error("Error Fetching Messages:", error);
        setIsLoading(true);
      }
    };

    loadMessages();
  }, [isDataChanged]);
  // Filter and search messages
  const filteredMessages = useMemo(() => {
    return messages.filter((message) => {
      const matchesSearch =
        message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.message.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [messages, searchQuery]);
  const deleteMessage = async (messageId: string) => {
    try {
      const response = await fetch(`/api/messages`, {
        method: "DELETE",
        body: JSON.stringify({ id: messageId }),
      });
      if (response.ok) {
        setIsDataChanged(!isDataChanged);
      }
    } catch (err) {
      console.error("Error deleting Message:", err);
      alert("Failed to delete Message. Please try again later.");
    }
    setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    if (selectedMessage?._id === messageId) {
      setSelectedMessage(null);
    }
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

  return (
    <motion.div
      className="space-y-6 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          Messages
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Manage contact form submissions and inquiries (
          {filteredMessages.length} messages)
        </p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div variants={itemVariants}>
        <Card className="dark:bg-[#161b27]">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Filter Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-indigo-100 dark:bg-[#161b27] border border-input outline-none ring-offset-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-3 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Messages List */}
      <motion.div variants={itemVariants}>
        <Card className="dark:bg-[#161b27]">
          <CardHeader></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <AnimatePresence>
                {filteredMessages.map((message) => (
                  <motion.div
                    key={message._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md bg-indigo-100 dark:bg-slate-800 border-blue-200 dark:border-slate-700"
                    onClick={() => setSelectedMessage(message)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 min-w-0 flex-1">
                        <div className="mt-1">
                          <Mail className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium truncate text-slate-900 dark:text-slate-100">
                              {message.name}
                            </h3>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 truncate mb-1">
                            {message.email}
                          </p>
                          <p className="text-sm mb-2 truncate text-slate-800 dark:text-slate-300">
                            {message.subject}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                            {message.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="text-indigo-600 text-xs font-medium flex items-center gap-1 dark:text-indigo-400 whitespace-nowrap">
                          <Clock className="h-3 w-3" />
                          {message.date}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMessage(message._id);
                          }}
                          className="h-8 w-8 p-0 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredMessages.length === 0 && (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">
                    No messages found
                  </h3>
                  <p className="text-slate-500 dark:text-slate-500">
                    {searchQuery}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Message Detail Dialog */}
      <Dialog
        open={!!selectedMessage}
        onOpenChange={() => setSelectedMessage(null)}
      >
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-[#161b27]">
          {selectedMessage && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <DialogTitle className="text-xl mb-2">
                      {selectedMessage.subject}
                    </DialogTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-slate-500" />
                      <span className="font-medium">
                        {selectedMessage.name}
                      </span>
                    </div>
                    <DialogDescription className="flex items-center gap-4 text-sm">
                      <span>{selectedMessage.email}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {selectedMessage.date}
                      </span>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Message</h4>
                  <div className="bg-indigo-100 dark:bg-slate-800 rounded-lg p-4">
                    <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    className="dark:bg-neutral-100 dark:text-slate-900"
                    onClick={() => setSelectedMessage(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
