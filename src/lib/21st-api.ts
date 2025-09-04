/**
 * Utilitaire pour interagir avec l'API 21st.dev
 * Documentation officielle: https://21st.dev/docs/api
 */

// Clé API pour 21st.dev
const API_KEY = '51b307d0e68cad9668c6b30d92aa280e7ba61db9e57be6d6561a7826a1aecaa3';
const BASE_URL = 'https://api.21st.dev';

/**
 * Types pour l'API 21st.dev
 */
export interface ComponentData {
  name: string;
  description: string;
  code: string;
  install_command: string;
}

export interface ComponentUserData {
  name: string;
  username: string;
  image_url: string;
}

export interface SearchResult {
  name: string;
  preview_url: string;
  video_url: string;
  demo_id: number;
  component_data: ComponentData;
  component_user_data: ComponentUserData;
  usage_count: number;
}

export interface SearchResponse {
  results: SearchResult[];
  metadata: {
    plan: string;
    requests_remaining: number;
    pagination: {
      total: number;
      page: number;
      per_page: number;
      total_pages: number;
    };
  };
}

export interface PromptResponse {
  prompt: string;
}

export interface ErrorResponse {
  error: string;
  details?: string;
}

/**
 * Options pour la recherche de composants
 */
export interface SearchOptions {
  search: string;
  page?: number;
  per_page?: number;
}

/**
 * Options pour la génération de prompt
 */
export interface PromptOptions {
  prompt_type: 'basic' | 'sitebrew' | 'v0' | 'lovable' | 'bolt' | 'extended' | 'replit' | 'magic_patterns';
  demo_id: string | number;
}

/**
 * Classe utilitaire pour l'API 21st.dev
 */
export class TwentyFirstAPI {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey = API_KEY, baseUrl = BASE_URL) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  /**
   * Effectue une requête vers l'API 21st.dev
   */
  private async request<T>(endpoint: string, method: string, body?: any): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error((data as ErrorResponse).error || 'Une erreur est survenue lors de la requête');
      }

      return data as T;
    } catch (error) {
      console.error('Erreur lors de la requête vers 21st.dev:', error);
      throw error;
    }
  }

  /**
   * Recherche des composants UI
   */
  public async searchComponents(options: SearchOptions): Promise<SearchResponse> {
    return this.request<SearchResponse>('/api/search', 'POST', options);
  }

  /**
   * Génère un prompt pour un composant spécifique
   */
  public async generatePrompt(options: PromptOptions): Promise<PromptResponse> {
    return this.request<PromptResponse>('/api/prompts', 'POST', options);
  }

  /**
   * Recherche un composant hero section
   */
  public async searchHeroSection(): Promise<SearchResponse> {
    return this.searchComponents({
      search: 'hero section',
      per_page: 5,
    });
  }

  /**
   * Recherche un composant de présentation d'entreprise
   */
  public async searchCompanyShowcase(): Promise<SearchResponse> {
    return this.searchComponents({
      search: 'company showcase grid',
      per_page: 5,
    });
  }

  /**
   * Recherche un composant de navigation
   */
  public async searchNavigation(): Promise<SearchResponse> {
    return this.searchComponents({
      search: 'navigation header modern',
      per_page: 5,
    });
  }

  /**
   * Génère un prompt pour un composant spécifique
   */
  public async getComponentPrompt(demoId: string | number): Promise<PromptResponse> {
    return this.generatePrompt({
      prompt_type: 'basic',
      demo_id: demoId,
    });
  }
}

// Exporte une instance par défaut pour une utilisation facile
const twentyFirstAPI = new TwentyFirstAPI();
export default twentyFirstAPI;
