This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Model Context Protocol (MCP) Integration

Le projet Genius Ad District intègre le [Model Context Protocol (MCP)](https://github.com/modularml/mcp) pour exploiter les capacités d'IA générative dans le processus de développement d'interface utilisateur.

### Générateur de Composants UI

Notre intégration MCP offre un outil de génération de composants UI qui permet de :
- Créer rapidement des composants React/Next.js conformes à notre design system
- Explorer des inspirations visuelles pour différents types de composants
- Raffiner et améliorer des composants existants

Pour accéder au générateur de composants:
1. Démarrez le serveur de développement avec `npm run dev`
2. Naviguez vers `/[locale]/tools/component-generator` dans votre navigateur

### Configuration MCP

Notre configuration MCP utilise notamment les serveurs suivants:
- **@21st-dev/magic**: Génération de composants UI selon notre design system Apple-inspired
- **@modelcontextprotocol/server-everything**: Pour les tests et les démonstrations

La configuration est définie dans `src/lib/mcp-config.js`.

### API MCP

Une API REST est disponible à `/api/mcp` pour interagir avec les serveurs MCP depuis le client. Cette API:
- Traite les demandes de génération de composants
- Gère la recherche et l'optimisation de logos
- Fournit des fonctionnalités d'amélioration de composants existants

### Dépendances

Pour utiliser les fonctionnalités MCP, assurez-vous que ces packages sont installés:
```bash
npm install @modelcontextprotocol/server-everything @21st-dev/magic
```

## Autres fonctionnalités
