/**
 * Utilitaire pour l'API Iconscout
 * Documentation officielle: https://developers.iconscout.com/
 */

// Clés d'API pour Iconscout
const ICONSCOUT_CLIENT_ID = "132217868137890";
const ICONSCOUT_SECRET_KEY = "WuE90mzkKFpIt9P53UhTmD7cNqa1LAwv";

/**
 * Types d'icônes disponibles
 */
export type IconStyle = 'line' | 'filled' | 'colored' | 'outline';
export type IconSize = 24 | 32 | 48 | 64 | 128;

/**
 * Interface pour les options de requête d'icônes
 */
interface IconRequestOptions {
  query: string;
  style?: IconStyle;
  size?: IconSize;
  limit?: number;
  page?: number;
}

/**
 * Interface pour la réponse de l'API Iconscout
 */
interface IconscoutResponse {
  icons: IconData[];
  total: number;
  page: number;
  perPage: number;
}

/**
 * Interface pour les données d'une icône
 */
export interface IconData {
  id: string;
  name: string;
  url: string;
  downloadUrl: string;
  previewUrl: string;
  style: IconStyle;
  price: number;
  isFree: boolean;
}

/**
 * Recherche des icônes sur Iconscout
 * @param options Options de recherche
 * @returns Promesse contenant les données des icônes
 */
export async function searchIcons({
  query,
  style = 'line',
  size = 32,
  limit = 10,
  page = 1
}: IconRequestOptions): Promise<IconData[]> {
  try {
    const apiUrl = new URL('https://api.iconscout.com/v3/search');
    apiUrl.searchParams.append('client_id', ICONSCOUT_CLIENT_ID);
    apiUrl.searchParams.append('secret_key', ICONSCOUT_SECRET_KEY);
    apiUrl.searchParams.append('query', query);
    apiUrl.searchParams.append('product_type', 'icons');
    apiUrl.searchParams.append('style', style);
    apiUrl.searchParams.append('format', 'svg');
    apiUrl.searchParams.append('size', size.toString());
    apiUrl.searchParams.append('limit', limit.toString());
    apiUrl.searchParams.append('page', page.toString());

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur API Iconscout: ${response.status}`);
    }

    const data = await response.json() as IconscoutResponse;
    return data.icons;
  } catch (error) {
    console.error('Erreur lors de la recherche d\'icônes:', error);
    return [];
  }
}

/**
 * Récupère une icône par son identifiant
 * @param iconId Identifiant de l'icône
 * @returns Promesse contenant les données de l'icône
 */
export async function getIconById(iconId: string): Promise<IconData | null> {
  try {
    const apiUrl = new URL(`https://api.iconscout.com/v3/icons/${iconId}`);
    apiUrl.searchParams.append('client_id', ICONSCOUT_CLIENT_ID);
    apiUrl.searchParams.append('secret_key', ICONSCOUT_SECRET_KEY);

    const response = await fetch(apiUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Erreur API Iconscout: ${response.status}`);
    }

    const data = await response.json();
    return data.icon;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'icône ${iconId}:`, error);
    return null;
  }
}

/**
 * Composant client pour l'intégration d'Iconscout dans l'application
 */
export default {
  searchIcons,
  getIconById,
};
