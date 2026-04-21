/**
 * News/Blog page content
 */

export const newsPage = {
  title: "News & Health Tips",
  subtitle: "Stay informed with the latest updates from Lifeline Medical Centre",
};

export const newsEmptyState = {
  heading: "No articles yet",
  message:
    "We're working on bringing you health tips, medical news, and updates from Lifeline Medical Centre. Check back soon!",
};

export const sidebarSearch = {
  placeholder: "Search articles...",
  buttonText: "Search",
};

export const sidebarRecentPosts = {
  heading: "Recent Posts",
  emptyMessage: "No recent posts available.",
};

export const sidebarCategories = {
  heading: "Categories",
  // Categories match the post_category enum in database
  categories: [
    { slug: "health-tips", label: "Health Tips" },
    { slug: "news", label: "News" },
    { slug: "announcements", label: "Announcements" },
  ],
};

export const sidebarVisitorGuide = {
  heading: "Visiting Us?",
  description:
    "Plan your visit to Lifeline Medical Centre. Find information about our location, visiting hours, and what to bring.",
  buttonText: "Patient & Visitor Guide",
  buttonHref: "/visitors",
};

export const postDetailPage = {
  backLink: {
    href: "/news",
    text: "← Back to News",
  },
  notFound: {
    heading: "Article Not Found",
    message: "The article you're looking for doesn't exist or has been removed.",
  },
};
