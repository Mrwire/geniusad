"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const footerVariants = cva(
  "w-full border-t",
  {
    variants: {
      variant: {
        default: "bg-black border-neutral-800 text-white",
        subsidiary: "bg-black border-neutral-800 text-white",
      },
      size: {
        default: "py-12",
        sm: "py-8",
        lg: "py-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface FooterProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof footerVariants> {
  subsidiaryColor?: 'mps' | 'labrigad' | 'gamius' | 'moujeleell';
}

const Footer = React.forwardRef<
  HTMLElement,
  FooterProps
>(({ className, variant, size, subsidiaryColor, ...props }, ref) => {
  // Set data attribute for subsidiary theming if provided
  const dataAttrs: {[key: string]: string} = {};
  if (subsidiaryColor) {
    dataAttrs['data-subsidiary'] = subsidiaryColor;
  }

  return (
    <footer
      ref={ref}
      className={cn(footerVariants({ variant, size, className }))}
      {...dataAttrs}
      {...props}
    />
  )
})
Footer.displayName = "Footer"

const FooterContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("container mx-auto px-4 md:px-6", className)}
    {...props}
  />
))
FooterContainer.displayName = "FooterContainer"

const FooterSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10", className)}
    {...props}
  />
))
FooterSection.displayName = "FooterSection"

const FooterBrand = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("lg:col-span-4", className)}
    {...props}
  />
))
FooterBrand.displayName = "FooterBrand"

const FooterNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("lg:col-span-1 md:col-span-1 space-y-4", className)}
    {...props}
  />
))
FooterNav.displayName = "FooterNav"

const FooterNavTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("font-semibold text-base mb-6", className)}
    {...props}
  />
))
FooterNavTitle.displayName = "FooterNavTitle"

const FooterNavList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("space-y-2", className)}
    {...props}
  />
))
FooterNavList.displayName = "FooterNavList"

const FooterNavItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("", className)}
    {...props}
  />
))
FooterNavItem.displayName = "FooterNavItem"

const FooterBottom = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center", className)}
    {...props}
  />
))
FooterBottom.displayName = "FooterBottom"

const FooterSocial = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex space-x-4 mb-6", className)}
    {...props}
  />
))
FooterSocial.displayName = "FooterSocial"

const FooterSocialLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn("w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition-colors", className)}
    {...props}
  />
))
FooterSocialLink.displayName = "FooterSocialLink"

const FooterLegal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex space-x-6 mt-4 md:mt-0", className)}
    {...props}
  />
))
FooterLegal.displayName = "FooterLegal"

const FooterCopyright = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-neutral-400", className)}
    {...props}
  />
))
FooterCopyright.displayName = "FooterCopyright"

const FooterNewsletter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("container mx-auto p-4 py-16", className)}
    {...props}
  />
))
FooterNewsletter.displayName = "FooterNewsletter"

export {
  Footer,
  FooterContainer,
  FooterSection,
  FooterBrand,
  FooterNav,
  FooterNavTitle,
  FooterNavList,
  FooterNavItem,
  FooterBottom,
  FooterSocial,
  FooterSocialLink,
  FooterLegal,
  FooterCopyright,
  FooterNewsletter,
}
