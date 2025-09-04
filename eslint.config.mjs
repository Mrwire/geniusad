import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.FlatConfig[]} */
const eslintConfig = [
  // Include Next.js and TypeScript configurations
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Add more strict TypeScript rules
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": compat.plugins("@typescript-eslint").plugins["@typescript-eslint"],
      "import": compat.plugins("import").plugins["import"],
    },
    rules: {
      // Typescript rules
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/consistent-type-imports": ["warn", { 
        "prefer": "type-imports"
      }],
      
      // Import rules
      "import/order": ["warn", {
        "groups": [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "index",
          "object",
          "type"
        ],
        "pathGroups": [
          {
            "pattern": "react",
            "group": "builtin",
            "position": "before"
          },
          {
            "pattern": "next/**",
            "group": "builtin",
            "position": "before"
          },
          {
            "pattern": "@/**",
            "group": "internal",
            "position": "after"
          }
        ],
        "pathGroupsExcludedImportTypes": ["react"],
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        },
        "newlines-between": "always"
      }],
      "import/no-duplicates": "warn",
      
      // React rules
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/self-closing-comp": "warn",
      "react/jsx-sort-props": ["warn", {
        "callbacksLast": true,
        "shorthandFirst": true,
        "reservedFirst": true
      }],
      
      // General rules
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "prefer-const": "warn",
      "no-undef": "error",
      "no-unused-expressions": "warn",
    }
  },
  
  // Specific rules for React components
  {
    files: ["**/components/**/*.tsx"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "react/display-name": "off"
    }
  },
  
  // Rules for test files
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-expressions": "off"
    }
  }
];

export default eslintConfig;
