"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const headerVariants = cva(
  "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-black text-white",
        transparent: "bg-transparent text-white",
        subsidiary: "bg-black text-white",
      },
      scrolled: {
        true: "bg-black/90 backdrop-blur-md py-2 shadow-md",
        false: "py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      scrolled: false,
    },
  }
)

export interface HeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof headerVariants> {
  subsidiaryColor?: 'mps' | 'labrigad' | 'gamius' | 'gamiusgroup' | 'moujeleell';
}

const Header = React.forwardRef<
  HTMLElement,
  HeaderProps
>(({ className, variant, scrolled, subsidiaryColor, ...props }, ref) => {
  // Set data attribute for subsidiary theming if provided
  const dataAttrs: {[key: string]: string} = {};
  if (subsidiaryColor) {
    dataAttrs['data-subsidiary'] = subsidiaryColor;
  }
  
  return (
    <header
      ref={ref}
      className={cn(headerVariants({ variant, scrolled, className }))}
      {...dataAttrs}
      {...props}
    />
  )
})
Header.displayName = "Header"

const HeaderContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("container mx-auto px-4 md:px-6", className)}
    {...props}
  />
))
HeaderContainer.displayName = "HeaderContainer"

const HeaderContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between", className)}
    {...props}
  />
))
HeaderContent.displayName = "HeaderContent"

const HeaderLogo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-shrink-0", className)}
    {...props}
  />
))
HeaderLogo.displayName = "HeaderLogo"

const HeaderNav = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <nav
    ref={ref}
    className={cn("hidden lg:flex items-center space-x-8", className)}
    {...props}
  />
))
HeaderNav.displayName = "HeaderNav"

const HeaderActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-4", className)}
    {...props}
  />
))
HeaderActions.displayName = "HeaderActions"

const HeaderMobileMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("lg:hidden", className)}
    {...props}
  />
))
HeaderMobileMenu.displayName = "HeaderMobileMenu"

export {
  Header,
  HeaderContainer,
  HeaderContent,
  HeaderLogo,
  HeaderNav,
  HeaderActions,
  HeaderMobileMenu,
}
