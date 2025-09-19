import mongoose from "mongoose";
const skillSchema = new mongoose.Schema({
  uniqId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    default: "JavaScript",
  },
  category: {
    type: String,
    required: true,
    default: "Language",
  },
});
const ExperienceSchema = new mongoose.Schema({
  uniqId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: "Frontend Development Specialist",
  },
  company: {
    type: String,
    required: true,
    default: "Independent Freelancer",
  },
  location: {
    type: String,
    required: true,
    default: "Algeria",
  },
  startDate: {
    type: String,
    required: true,
    default: "2021",
  },
  endDate: {
    type: String,
  },
  current: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
    default:
      "Working directly with clients worldwide to deliver custom web solutions. Specializing in React,Next.js, and modern frontend technologies to create responsive, accessible, and performant web applications.",
  },
});
const EducationSchema = new mongoose.Schema({
  uniqId: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
    default: "Bachelor's in Science and Technology",
  },
  school: {
    type: String,
    required: true,
    default: "Mentouri Brothers Constantine 1 University",
  },
  location: {
    type: String,
    required: true,
    default: "Constantine, Algeria",
  },
  startDate: {
    type: String,
    required: true,
    default: "2023",
  },
  endDate: {
    type: String,
  },
  current: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
    default:
      "Currently pursuing a Bachelor's in Science and Technology, with a growing focus on applying technical knowledge to front-end development.",
  },
});
const interestSchema = new mongoose.Schema({
  uniqId: {
    type: String,
    required: true,
  },
  interest: {
    type: String,
    required: true,
    default: "Web Development",
  },
});
const Schema = new mongoose.Schema({
  name: {
    type: String,
    default: "Noufel Benchabia",
  },
  about: {
    type: String,
    default: `I'm a passionate Frontend Developer based in Algeria with 2+ years of experience crafting beautiful, responsive, and user-friendly web applications. My journey in web development started when I was in college, and I've been in love with creating digital experiences ever since.

        I specialize in modern JavaScript frameworks like React and Next.js, and I'm committed to writing clean, maintainable code that follows best practices. I believe in the power of accessible design and strive to create interfaces that can be used by everyone.`,
  },
  profileImg: {
    type: String,
    default: "/placeholder.svg?height=120&width=120",
  },
  skills: [skillSchema],
  Experiences: [ExperienceSchema],
  Educations: [EducationSchema],
  interests: [interestSchema],
});
const AboutModel = mongoose.models.about || mongoose.model("about", Schema);
export default AboutModel;
