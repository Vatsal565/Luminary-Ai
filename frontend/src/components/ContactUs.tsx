import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  User,
  MessageCircle,
  Star,
  MessageSquare,
} from "lucide-react";
import send from "@/hooks/sendMail";

// Define the type for the form data
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Define the type for the contact info items
interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  details: string[];
  color: string;
  bgColor: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Do something with the form values.
		// ✅ This will be type-safe and validated.
		e.preventDefault(); // Prevent default form submission behavior

    // Extract values correctly from formData
    const { name, email, message } = formData;

    // Call send function
    send({ name, email, message });
		// toast.success("Thanks for Submitting Response");
		setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setIsSubmitted(true);
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 765-4321"],
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@luminaryai.com", "support@luminaryai.com"],
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["SVNIT Guest House", "Surat, Gujarat, India"],
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
        "Sunday: Closed",
      ],
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen from-white to-gray-50 pt-8">
      {/* Hero Section */}
      <section className="pt-16 pb-4">
        <div className="container mx-auto px-4">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-level-2 rounded-full mb-6">
              <MessageSquare className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Contact Us</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-700">
              Get in <span className="text-level-3">Touch</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              We&apos;d love to hear from you. Let us know how we can help make your
              AI experience even better with your business
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${info.bgColor} rounded-lg p-6 hover:scale-105 transition-transform`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <info.icon className={`w-6 h-6 ${info.color}`} />
                      <h3 className="text-xl font-semibold">{info.title}</h3>
                    </div>
                    <div className="space-y-2">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Google Maps iframe */}
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                
Copy
<iframe
  title="SVNIT Guest House Location"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.073509015362!2d72.7828153154024!3d21.16513848593489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e7b7a7d0f4d%3A0x7a7d0f4d7a7d0f4d!2sSVNIT%20Guest%20House!5e0!3m2!1sen!2sin!4v1633080000000!5m2!1sen!2sin&markers=color:red%7Clabel:S%7C21.165138,72.785015"
  width="100%"
  height="400"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
></iframe>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
              className="bg-white rounded-xl p-8 border border-gray-100"
            >
              <div className="flex items-center gap-2 mb-6">
                <MessageCircle className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-bold">Send Us a Message</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-gray-700 font-medium">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 
                               focus:outline-none focus:ring-2 focus:ring-orange-500 
                               focus:border-transparent transition-all"
                      required
                    />
                    <User className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 
                               focus:outline-none focus:ring-2 focus:ring-orange-500 
                               focus:border-transparent transition-all"
                      required
                    />
                    <Mail className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-gray-700 font-medium">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 
                             focus:outline-none focus:ring-2 focus:ring-orange-500 
                             focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-gray-700 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 
                             focus:outline-none focus:ring-2 focus:ring-orange-500 
                             focus:border-transparent transition-all resize-none"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-lg flex items-center justify-center gap-2
                           ${isSubmitted ? "bg-green-500" : "bg-orange-500"} 
                           text-white font-medium transition-colors`}
                >
                  {isSubmitted ? (
                    <>
                      <Star className="w-5 h-5" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;