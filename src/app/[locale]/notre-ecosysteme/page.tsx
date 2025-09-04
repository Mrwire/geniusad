"use client";

import React from 'react';
import AppleEcosystemShowcase from '@/components/organisms/AppleEcosystemShowcase';

export default function NotreEcosystemePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <section className="pt-24 pb-12 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">Notre Écosystème</h1>
          <p className="text-lg text-center text-gray-300 max-w-3xl mx-auto mb-16">
            Explorez les différentes phases de notre écosystème et découvrez comment nous transformons 
            les idées en réalisations concrètes à travers un parcours structuré et innovant.
          </p>
        </div>
      </section>
      
      {/* Apple-style Ecosystem Showcase */}
      <section className="py-12 mb-20">
        <div className="w-full min-h-[80vh]">
          <AppleEcosystemShowcase />
        </div>
      </section>
      
      <section className="py-12 px-4 md:px-8 bg-black/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Notre Approche Synergique
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Vision Holistique</h3>
              <p className="text-gray-300">
                Notre écosystème est conçu pour assurer une progression fluide et cohérente 
                de chaque projet, en tirant parti des compétences complémentaires de nos équipes 
                et en maximisant les synergies entre les différentes phases.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-semibold mb-4">Innovation Continue</h3>
              <p className="text-gray-300">
                Chaque phase de notre écosystème est en constante évolution, intégrant les 
                meilleures pratiques et les dernières technologies pour assurer des résultats 
                exceptionnels et durables pour nos clients.
              </p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <p className="italic text-xl text-gray-400">
              "L'harmonie de notre écosystème réside dans la complémentarité 
              des phases et la passion commune qui anime nos équipes."
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
