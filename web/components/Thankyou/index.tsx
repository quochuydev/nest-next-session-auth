/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Tab, Transition } from "@headlessui/react";
import { FilterIcon, StarIcon } from "@heroicons/react/solid";
import Script from "next/dist/client/script";

import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import { SearchIcon, MailIcon } from "@heroicons/react/solid";
import { Popover } from "@headlessui/react";
import {
  BookmarkAltIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  CursorClickIcon,
  DesktopComputerIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  MenuIcon,
  NewspaperIcon,
  OfficeBuildingIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/outline";
import { ChevronDownIcon } from "@heroicons/react/solid";

const solutions = [
  {
    name: "Analytics",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: CursorClickIcon,
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: ShieldCheckIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: ViewGridIcon,
  },
];
const callsToAction = [
  { name: "Watch Demo", href: "#", icon: PlayIcon },
  { name: "View All Products", href: "#", icon: CheckCircleIcon },
  { name: "Contact Sales", href: "#", icon: PhoneIcon },
];
const company = [
  { name: "About", href: "#", icon: InformationCircleIcon },
  { name: "Customers", href: "#", icon: OfficeBuildingIcon },
  { name: "Press", href: "#", icon: NewspaperIcon },
  { name: "Careers", href: "#", icon: BriefcaseIcon },
  { name: "Privacy", href: "#", icon: ShieldCheckIcon },
];
const resources = [
  { name: "Community", href: "#", icon: UserGroupIcon },
  { name: "Partners", href: "#", icon: GlobeAltIcon },
  { name: "Guides", href: "#", icon: BookmarkAltIcon },
  { name: "Webinars", href: "#", icon: DesktopComputerIcon },
];
const filters = {
  price: [
    { value: "0", label: "$0 - $25", checked: false },
    { value: "25", label: "$25 - $50", checked: false },
    { value: "50", label: "$50 - $75", checked: false },
    { value: "75", label: "$75+", checked: false },
  ],
  color: [
    { value: "white", label: "White", checked: false },
    { value: "beige", label: "Beige", checked: false },
    { value: "blue", label: "Blue", checked: true },
    { value: "brown", label: "Brown", checked: false },
    { value: "green", label: "Green", checked: false },
    { value: "purple", label: "Purple", checked: false },
  ],
  size: [
    { value: "xs", label: "XS", checked: false },
    { value: "s", label: "S", checked: true },
    { value: "m", label: "M", checked: false },
    { value: "l", label: "L", checked: false },
    { value: "xl", label: "XL", checked: false },
    { value: "2xl", label: "2XL", checked: false },
  ],
  category: [
    { value: "all-new-arrivals", label: "All New Arrivals", checked: false },
    { value: "tees", label: "Tees", checked: false },
    { value: "objects", label: "Objects", checked: false },
    { value: "sweatshirts", label: "Sweatshirts", checked: false },
    { value: "pants-and-shorts", label: "Pants & Shorts", checked: false },
  ],
};
const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const products = [
  {
    id: 1,
    name: "Organize Basic Set (Walnut)",
    price: "$149",
    rating: 5,
    reviewCount: 38,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 2,
    name: "Organize Pen Holder",
    price: "$15",
    rating: 5,
    reviewCount: 18,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 3,
    name: "Organize Sticky Note Holder",
    price: "$15",
    rating: 5,
    reviewCount: 14,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 4,
    name: "Organize Phone Holder",
    price: "$15",
    rating: 4,
    reviewCount: 21,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 5,
    name: "Organize Basic Set (Walnut)",
    price: "$149",
    rating: 5,
    reviewCount: 38,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 6,
    name: "Organize Pen Holder",
    price: "$15",
    rating: 5,
    reviewCount: 18,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 3,
    name: "Organize Sticky Note Holder",
    price: "$15",
    rating: 5,
    reviewCount: 14,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 7,
    name: "Organize Phone Holder",
    price: "$15",
    rating: 4,
    reviewCount: 21,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 1,
    name: "Organize Basic Set (Walnut)",
    price: "$149",
    rating: 5,
    reviewCount: 38,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 2,
    name: "Organize Pen Holder",
    price: "$15",
    rating: 5,
    reviewCount: 18,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 3,
    name: "Organize Sticky Note Holder",
    price: "$15",
    rating: 5,
    reviewCount: 14,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 4,
    name: "Organize Phone Holder",
    price: "$15",
    rating: 4,
    reviewCount: 21,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 5,
    name: "Organize Basic Set (Walnut)",
    price: "$149",
    rating: 5,
    reviewCount: 38,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 6,
    name: "Organize Pen Holder",
    price: "$15",
    rating: 5,
    reviewCount: 18,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 3,
    name: "Organize Sticky Note Holder",
    price: "$15",
    rating: 5,
    reviewCount: 14,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 7,
    name: "Organize Phone Holder",
    price: "$15",
    rating: 4,
    reviewCount: 21,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 1,
    name: "Organize Basic Set (Walnut)",
    price: "$149",
    rating: 5,
    reviewCount: 38,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 2,
    name: "Organize Pen Holder",
    price: "$15",
    rating: 5,
    reviewCount: 18,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 3,
    name: "Organize Sticky Note Holder",
    price: "$15",
    rating: 5,
    reviewCount: 14,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 4,
    name: "Organize Phone Holder",
    price: "$15",
    rating: 4,
    reviewCount: 21,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 5,
    name: "Organize Basic Set (Walnut)",
    price: "$149",
    rating: 5,
    reviewCount: 38,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 6,
    name: "Organize Pen Holder",
    price: "$15",
    rating: 5,
    reviewCount: 18,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 3,
    name: "Organize Sticky Note Holder",
    price: "$15",
    rating: 5,
    reviewCount: 14,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 7,
    name: "Organize Phone Holder",
    price: "$15",
    rating: 4,
    reviewCount: 21,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  // More products...
];

const blogPosts = [
  {
    id: 1,
    name: "Boost your conversion rate",
    href: "#",
    preview:
      "Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.",
    imageUrl:
      "https://images.unsplash.com/photo-1558478551-1a378f63328e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2849&q=80",
  },
  {
    id: 2,
    name: "How to use search engine optimization to drive traffic to your site",
    href: "#",
    preview:
      "Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.",
    imageUrl:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2300&q=80",
  },
];

const navigation3 = [
  {
    name: "Facebook",
    href: "#",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "#",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Dribbble",
    href: "#",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },

  { name: "Contact Us", href: "/contact", icon: PhoneIcon, current: false },
];
const navigation2 = [
  { name: "Solutions", href: "#" },
  { name: "Pricing", href: "#" },
  { name: "Docs", href: "#" },
  { name: "Company", href: "#" },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <head>
        <meta
          name="facebook-domain-verification"
          content="eveuxypjl1h26al88rva9b2nc0zh8p"
        />
      </head>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-X2HB7B4JHT`}
      />
      <Script strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-X2HB7B4JHT');`}
      </Script>

      {/*
        This example requires updating your template:
        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 flex z-40">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 flex items-center px-4">
                    <a href="/">
                      <span className="sr-only">Workflow</span>
                      <img
                        className="h-20 w-auto"
                        src="https://gitlab.com/moggymog/4way/-/raw/master/public/assets/usedgrade2.jpeg"
                        alt="Workflow"
                      />
                    </a>
                  </div>
                  <div className="mt-5 flex-1 h-0 overflow-y-auto">
                    <nav className="px-2 space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                            "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                          )}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-4 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <a href="/">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-30 w-auto"
                  src="https://gitlab.com/moggymog/4way/-/raw/master/public/assets/usedgrade2.jpeg"
                  alt="Workflow"
                />
              </a>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="md:pl-64 flex flex-col flex-1">
          <div className="bg-gray-900">
            <div className=" mx-auto h-10 px-4 flex items-center justify-between sm:px-6 lg:px-8">
              <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
                Email: sales@usedgrade.com | Phone#: +1 (267)-400-1085
              </p>
            </div>
          </div>

          <div className="relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                <svg
                  className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                  fill="currentColor"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <polygon points="50,0 100,0 50,100 0,100" />
                </svg>

                <Popover>
                  <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>

                  <Transition
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-100 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Popover.Panel
                      focus
                      className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                    >
                      <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="px-5 pt-4 flex items-center justify-between">
                          <div>
                            <img
                              className="h-8 w-auto"
                              src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"
                              alt=""
                            />
                          </div>
                          <div className="-mr-2">
                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                              <span className="sr-only">Close main menu</span>
                              <XIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                          </div>
                        </div>
                        <div className="px-2 pt-2 pb-3 space-y-1">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                        <a
                          href="#"
                          className="block w-full px-5 py-3 text-center font-medium text-blue-600 bg-gray-50 hover:bg-gray-100"
                        >
                          Log in
                        </a>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
                <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                  <div className="sm:text-center lg:text-left">
                    <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                      <span className="block xl:inline">
                        Welcome to the UsedGrade
                      </span>{" "}
                      <span className="block text-usedgrade xl:inline">
                        Marketplace
                      </span>
                    </h1>
                    <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                      Your one-stop stop shop to global electronics sourcing.
                    </p>
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                      <div className="rounded-md shadow">
                        <a
                          href="/"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-usedgrade hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                        >
                          Catalog (coming soon!)
                        </a>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <a
                          href="/contact"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-usedgrade bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                        >
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <img
                className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                src="https://gitlab.com/moggymog/4way/-/raw/master/public/assets/warehouse.jpeg"
                alt=""
              />
            </div>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-full mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                  <main className="pb-24">
                    <div className="text-center py-16 px-4 sm:px-6 lg:px-8">
                      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                        We're here to service your demand and accelerate your
                        product flow.
                      </h1>
                      <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                        We have been in the second hand electronics market in
                        USA since 2013, during this time we have gained a lot of
                        inside in to the market and partners who constantly work
                        with us. Wether you want to shop with us today or become
                        our long term business partner, we are here for you.
                        UsedGrade will provide you with proper grading on used
                        electronics so you can easily make a choice.
                      </p>
                      <p className="mt-4 max-w-xl mx-auto text-base text-gray-500"></p>
                    </div>

                    <div className="bg-gray-50 pt-12 sm:pt-16">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                            As we build out our platfrom
                          </h2>
                          <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                            Feel free to reach us about the following channels:
                          </p>
                        </div>
                      </div>
                      <div className="mt-10 pb-12 bg-white sm:pb-16">
                        <div className="relative">
                          <div className="absolute inset-0 h-1/2 bg-gray-50" />
                          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="max-w-4xl mx-auto">
                              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500"></dt>
                                  <dd className="col-span-1 flex justify-center py-8 px-8 ">
                                    <a
                                      href="https://www.ebay.com/str/upgradepro"
                                      target="_blank"
                                      rel="noreferrer noopener"
                                    >
                                      <span className="sr-only">Workflow</span>
                                      <img
                                        className="h-8 w-auto sm:h-10"
                                        src="https://gitlab.com/moggymog/4way/-/raw/master/public/assets/ebay.png"
                                        alt=""
                                      />
                                    </a>
                                  </dd>
                                </div>
                                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500"></dt>
                                  <dd className="col-span-1 flex justify-center py-8 px-8 ">
                                    <a
                                      href="https://www.facebook.com/usedgrade"
                                      target="_blank"
                                      rel="noreferrer noopener"
                                    >
                                      <span className="sr-only">Workflow</span>
                                      <img
                                        className="h-8 w-auto sm:h-10"
                                        src="https://gitlab.com/moggymog/4way/-/raw/master/public/assets/facebook.png"
                                        alt=""
                                      />
                                    </a>
                                  </dd>
                                </div>
                                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500"></dt>
                                  <dd className="col-span-1 flex justify-center py-8 px-8 ">
                                    <a
                                      href="https://www.twitter.com/usedgrade"
                                      target="_blank"
                                      rel="noreferrer noopener"
                                    >
                                      <span className="sr-only">Workflow</span>
                                      <img
                                        className="h-8 w-auto sm:h-10"
                                        src="https://gitlab.com/moggymog/4way/-/raw/master/public/assets/twitter.png"
                                        alt=""
                                      />
                                    </a>
                                  </dd>
                                </div>
                              </dl>
                              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500"></dt>
                                  <dd className="col-span-1 flex justify-center py-8 px-8 ">
                                    <a
                                      href="https://www.instagram.com/usedgrade/"
                                      target="_blank"
                                      rel="noreferrer noopener"
                                    >
                                      <span className="sr-only">Workflow</span>
                                      <img
                                        className="h-8 w-auto sm:h-10"
                                        src="https://gitlab.com/moggymog/4way/-/raw/master/public/assets/instagram.png"
                                        alt=""
                                      />
                                    </a>
                                  </dd>
                                </div>
                                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500"></dt>
                                  <dd className="col-span-1 flex justify-center py-8 px-8 ">
                                    <a
                                      href="https://www.linkedin.com/company/usedgrade"
                                      target="_blank"
                                      rel="noreferrer noopener"
                                    >
                                      <span className="sr-only">Workflow</span>
                                      <img
                                        className="h-8 w-auto sm:h-10"
                                        src="https://gitlab.com/moggymog/4way/-/raw/master/public/assets/linkedin.png"
                                        alt=""
                                      />
                                    </a>
                                  </dd>
                                </div>
                                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500"></dt>
                                  <dd className="col-span-1 flex justify-center py-8 px-8 ">
                                    <a
                                      href="tel:+12674001085"
                                      target="_blank"
                                      rel="noreferrer noopener"
                                    >
                                      <span className="sr-only">Workflow</span>
                                      <img
                                        className="h-8 w-auto sm:h-10"
                                        src="https://gitlab.com/moggymog/4way/-/raw/master/public/assets/phone.png"
                                        alt=""
                                      />
                                    </a>
                                  </dd>
                                </div>
                              </dl>
                              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500"></dt>
                                  <dd className="col-span-1 flex justify-center py-8 px-8 ">
                                    <a
                                      href="mailto:sales@usedgrade.com"
                                      target="_blank"
                                      rel="noreferrer noopener"
                                    >
                                      <span className="sr-only">Workflow</span>
                                      <img
                                        className="h-8 w-auto sm:h-10"
                                        src="https://gitlab.com/moggymog/4way/-/raw/master/public/assets/email.png"
                                        alt=""
                                      />
                                    </a>
                                  </dd>
                                </div>
                                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500"></dt>
                                  <dd className="col-span-1 flex justify-center py-8 px-8 ">
                                    <a
                                      href="https://www.reddit.com/user/usedgrade101/"
                                      target="_blank"
                                      rel="noreferrer noopener"
                                    >
                                      <span className="sr-only">Workflow</span>
                                      <img
                                        className="h-8 w-auto sm:h-10"
                                        src="https://gitlab.com/moggymog/4way/-/raw/master/public/assets/reddit.png"
                                        alt=""
                                      />
                                    </a>
                                  </dd>
                                </div>
                                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500"></dt>
                                  <dd className="col-span-1 flex justify-center py-8 px-8 ">
                                    <a
                                      href="https://t.me/+X6t8l1Nm3j5lODQx"
                                      target="_blank"
                                      rel="noreferrer noopener"
                                    >
                                      <span className="sr-only">Workflow</span>
                                      <img
                                        className="h-8 w-auto sm:h-10"
                                        src="https://gitlab.com/moggymog/4way/-/raw/master/public/assets/telegram.png"
                                        alt=""
                                      />
                                    </a>
                                  </dd>
                                </div>
                              </dl>
                              <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                                <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500"></dt>
                                  <dd className="col-span-1 flex justify-center py-8 px-8 ">
                                    <a
                                      href="https://www.youtube.com/channel/UCZ6aMnEwpVfzEoh5dsnptSA"
                                      target="_blank"
                                      rel="noreferrer noopener"
                                    >
                                      <span className="sr-only">Workflow</span>
                                      <img
                                        className="h-8 w-auto sm:h-10"
                                        src="https://gitlab.com/moggymog/4way/-/raw/master/public/assets/youtube.png"
                                        alt=""
                                      />
                                    </a>
                                  </dd>
                                </div>
                                <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500"></dt>
                                  <dd className="col-span-1 flex justify-center py-8 px-8 ">
                                    <a
                                      href="https://www.pinterest.com/usedgrade"
                                      target="_blank"
                                      rel="noreferrer noopener"
                                    >
                                      <span className="sr-only">Workflow</span>
                                      <img
                                        className="h-8 w-auto sm:h-10"
                                        src="https://gitlab.com/moggymog/4way/-/raw/master/public/assets/pinterest.png"
                                        alt=""
                                      />
                                    </a>
                                  </dd>
                                </div>
                                <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                                  <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500"></dt>
                                  <dd className="col-span-1 flex justify-center py-8 px-8 ">
                                    <a
                                      href="https://wa.me/message/U4D4LJUCSQ3AC1"
                                      target="_blank"
                                      rel="noreferrer noopener"
                                    >
                                      <span className="sr-only">Workflow</span>
                                      <img
                                        className="h-8 w-auto sm:h-10"
                                        src="https://gitlab.com/moggymog/4way/-/raw/master/public/assets/whatsapp.png"
                                        alt=""
                                      />
                                    </a>
                                  </dd>
                                </div>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
                {/* /End replace */}
                {/* Contact form */}
                <div class="max-w-4xl mx-auto">
                  <h3 className="text-lg font-medium text-gray-900">
                    Send us a message
                  </h3>
                  <form
                    name="homeform"
                    method="POST"
                    data-netlify="true"
                    onSubmit="submit"
                    className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                  >
                    <input type="hidden" name="form-name" value="homeform" />

                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="first-name"
                          id="first-name"
                          autoComplete="given-name"
                          className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="last-name"
                          id="last-name"
                          autoComplete="family-name"
                          className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Phone
                        </label>
                        <span
                          id="phone-optional"
                          className="text-sm text-gray-500"
                        >
                          Optional
                        </span>
                      </div>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          autoComplete="tel"
                          className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                          aria-describedby="phone-optional"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-900"
                      >
                        Subject
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex justify-between">
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-900"
                        >
                          Message
                        </label>
                        <span
                          id="message-max"
                          className="text-sm text-gray-500"
                        >
                          Max. 500 characters
                        </span>
                      </div>
                      <div className="mt-1">
                        <textarea
                          id="message"
                          name="message"
                          rows={4}
                          className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                          aria-describedby="message-max"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2 sm:flex sm:justify-end">
                      <button
                        type="submit"
                        className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-usedgrade hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </main>
          <footer className="bg-white">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
              <div className="flex justify-center space-x-6 md:order-2"></div>
              <div className="mt-8 md:mt-0 md:order-1">
                <p className="text-center text-base text-gray-400">
                  &copy; 2022 UsedGrade, Inc. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
