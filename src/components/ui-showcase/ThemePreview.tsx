'use client';

import React from 'react';
import { useTheme } from '@/components/theme';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';

/**
 * ThemePreview Component
 * 
 * Showcase for Shadcn UI components with our theme system
 */
export function ThemePreview() {
  const { themeName, setTheme } = useTheme();
  
  // List of available themes
  const themes = [
    { id: 'genius', name: 'Genius Ad District' },
    { id: 'mps', name: 'MPS' },
    { id: 'labrigad', name: 'LABRIG\'AD' },
    { id: 'gamius', name: 'GAMIUS' },
    { id: 'moujeleell', name: 'MOUJE-LEELL' },
  ];
  
  return (
    <div className="space-y-12 py-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Theme Preview</h2>
        <p className="text-gray-500 dark:text-gray-400">
          This page demonstrates how Shadcn UI components look with our theme system.
          Select different subsidiary themes to see how the components adapt.
        </p>
        
        <div className="flex flex-wrap gap-2 my-6">
          {themes.map((theme) => (
            <Button
              key={theme.id}
              variant={themeName === theme.id ? 'default' : 'outline'}
              onClick={() => setTheme(theme.id as any)}
              className="capitalize"
            >
              {theme.name}
            </Button>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="components" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="components">UI Components</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
        </TabsList>
        
        <TabsContent value="components" className="space-y-8 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description with details</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is a sample card component from Shadcn UI customized with our theme system.</p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Various button styles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
                <CardDescription>Text styles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <h1 className="text-3xl font-bold">Heading 1</h1>
                <h2 className="text-2xl font-bold">Heading 2</h2>
                <h3 className="text-xl font-bold">Heading 3</h3>
                <p className="text-base">Body text looks like this</p>
                <p className="text-sm text-muted-foreground">Small text with muted style</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="navigation" className="space-y-8 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Navigation Menu</CardTitle>
              <CardDescription>Example navigation with dropdown</CardDescription>
            </CardHeader>
            <CardContent>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-4 w-[400px] md:w-[500px]">
                        <NavigationMenuLink asChild>
                          <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Introduction</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Learn about our agency and services.
                            </p>
                          </a>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <a className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Case Studies</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              View our portfolio of client work.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Subsidiaries</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-4 w-[400px] md:w-[500px]">
                        {themes.slice(1).map((theme) => (
                          <NavigationMenuLink key={theme.id} asChild>
                            <a 
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              onClick={() => setTheme(theme.id as any)}
                            >
                              <div className="text-sm font-medium leading-none">{theme.name}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Switch to {theme.name} theme.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink className="block select-none rounded-md p-3 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                      Contact
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forms" className="space-y-8 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
              <CardDescription>Sample form with styled inputs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Name
                </label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Message
                </label>
                <textarea 
                  id="message" 
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter your message"
                />
              </div>
              
              <Button className="w-full">Submit</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="p-6 rounded-lg bg-muted">
        <h3 className="text-lg font-medium mb-2">Current Theme: {themes.find(t => t.id === themeName)?.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Notice how components adapt to each subsidiary's brand colors while maintaining consistent UI patterns.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="w-16 h-16 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-medium">
            Primary
          </div>
          <div className="w-16 h-16 rounded-md bg-secondary flex items-center justify-center text-secondary-foreground font-medium">
            Secondary
          </div>
          <div className="w-16 h-16 rounded-md border bg-background flex items-center justify-center text-foreground font-medium">
            Background
          </div>
          <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center text-muted-foreground font-medium">
            Muted
          </div>
        </div>
      </div>
    </div>
  );
} 