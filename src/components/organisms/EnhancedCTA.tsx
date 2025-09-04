"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const EnhancedCTA = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  const handleExploreProjects = () => {
    router.push('/projets');
  };
  
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pourriez ajouter la logique pour envoyer le formulaire
    setOpenDialog(false);
  };

  return (
    <section className="bg-black py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-medium mb-8 text-white leading-tight"
            variants={itemVariants}
          >
            Transformez votre vision
          </motion.h2>
          
          <motion.p 
            className="text-5xl md:text-7xl font-medium mb-12 text-white/70 leading-tight"
            variants={itemVariants}
          >
            en réalité.
          </motion.p>

          <motion.div 
            className="max-w-2xl mx-auto mb-16"
            variants={itemVariants}
          >
            <p className="text-lg text-gray-400 mb-8">
              L'excellence n'est pas un objectif, mais une habitude. 
              Notre approche sur-mesure transforme vos idées en expériences mémorables.
            </p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setOpenDialog(true)}
              className="group bg-transparent text-white border-white/20 hover:bg-white/5 hover:border-white/30 transition-all duration-300 px-8 py-6 text-base"
            >
              Discutons de votre projet
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              onClick={handleExploreProjects}
              className="text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300 px-8 py-6 text-base"
            >
              Explorer nos réalisations →
            </Button>
          </motion.div>


        </motion.div>
      </div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.02\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '60px 60px',
            backgroundRepeat: 'repeat'
          }}
        />
      </div>
      
      {/* Contact Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[500px] bg-black border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-medium">Parlons de votre projet</DialogTitle>
            <DialogDescription className="text-gray-400">
              Partagez quelques détails sur votre projet et nous vous contacterons rapidement.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitForm} className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Nom</Label>
              <Input 
                id="name" 
                placeholder="Votre nom" 
                className="bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="votre@email.com" 
                className="bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project" className="text-white">Votre projet</Label>
              <Textarea 
                id="project" 
                placeholder="Décrivez brièvement votre projet..." 
                className="bg-white/5 border-white/10 text-white focus:border-white/30 focus:ring-0 min-h-[100px]"
              />
            </div>
            <DialogFooter className="pt-4">
              <Button 
                type="submit" 
                variant="outline" 
                className="w-full bg-white text-black hover:bg-white/90 font-medium transition-all duration-300"
              >
                Envoyer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EnhancedCTA;
