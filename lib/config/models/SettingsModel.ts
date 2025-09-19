import mongoose from "mongoose";
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Noufel Benchabia",
  },
  email: {
    type: String,
    required: true,
    default: "noufelbenchabia@gmail.com",
  },
  cvLink: {
    type: String,
    required: true,
    default: "#",
  },
  profileImg: {
    url: { type: String, default: "/placeholder.svg" },
    public_id: { type: String },
  },
  bio: {
    type: String,
    required: true,
    default:
      "A passionate Frontend developer based in Algeria. I build pixel-perfect, engaging, and accessible digital experiences. I'll help you build beautiful websites, turning ideas into visually appealing and functional web solutions.",
  },
  about: {
    type: String,
    required: true,
    default: `I'm a passionate Frontend Developer based in Algeria with 2+ years of experience crafting beautiful, responsive, and user-friendly web applications. My journey in web development started when I was in college, and I've been in love with creating digital experiences ever since.

        I specialize in modern JavaScript frameworks like React and Next.js, and I'm committed to writing clean, maintainable code that follows best practices. I believe in the power of accessible design and strive to create interfaces that can be used by everyone.`,
  },
  location: {
    type: String,
    required: true,
    default: "Algeria",
  },
  phone: {
    type: String,
    required: true,
    default: "+213798923729",
  },
  siteTitle: {
    type: String,
    required: true,
    default: "Noufel Benchabia | Frontend Developer",
  },
  siteDescription: {
    type: String,
    required: true,
    default:
      "Personal portfolio website of Noufel Benchabia, a frontend developer based in Algeria",
  },
  githubUrl: {
    type: String,
    required: true,
    default: "#",
  },
  linkedinUrl: {
    type: String,
    required: true,
    default: "#",
  },
  twitterUrl: {
    type: String,
    required: true,
    default: "#",
  },
  facebookUrl: {
    type: String,
    required: true,
    default: "#",
  },
});
const SettingsModel =
  mongoose.models.settings || mongoose.model("settings", Schema);
export default SettingsModel;
