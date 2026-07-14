import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "LEI"
  }).format(value);

export function slugToTitle(text: string) {
  return text
    .replace(/-/g, ' ')             // înlocuiește cratimele
    .split(' ')                     // împarte în cuvinte
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(' ');
}

export function getStrapiMedia(url: string | null | undefined): string {
  if (!url) return '';

  // Dacă URL-ul este deja complet (începe cu http sau https), îl returnăm ca atare
  // (util în producție dacă folosești S3, Cloudinary sau dacă Strapi returnează URL-uri absolute)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Verificăm dacă suntem în modul de development
  // const isDev = process.env.NODE_ENV === 'development';

  // URL-ul de bază pentru Strapi în local
  const strapiUrl = import.meta.env.VITE_STRAPI_URL;

  // În dev adăugăm localhost, în producție lăsăm URL-ul relativ (sau adaugi domeniul de prod dacă e cazul)
  return `${strapiUrl}${url}` ;
}



