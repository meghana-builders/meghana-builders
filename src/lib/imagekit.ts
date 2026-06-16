// ImageKit configuration and helper functions for optimized image delivery.
import heroTower from "@/assets/hero-tower.jpg";
import aboutFacade from "@/assets/about-facade.jpg";
import chairmanImg from "@/assets/chairman.jpg";
import pLuxury from "@/assets/project-luxury-heights.jpg";
import pSecretariat from "@/assets/project-secretariat.jpg";
import pSunrise from "@/assets/project-sunrise.jpg";
import pCivic from "@/assets/project-civic.jpg";
import pVilla from "@/assets/project-villa.jpg";
import pMeghana from "@/assets/project-meghana-towers.jpg";

export const imageKitConfig = {
  urlEndpoint: "https://ik.imagekit.io/poojaMK",
  publicKey: "public_FSRoCNEyUnaqEixvLDRLgn6szhw=",
  // Note: For security reasons, the private key (private_j5sZzXeoD3o...) 
  // must NOT be included in client-side code.
};

const assetMapping: Record<string, string> = {
  "/src/assets/hero-tower.jpg": heroTower,
  "hero-tower.jpg": heroTower,
  "/src/assets/about-facade.jpg": aboutFacade,
  "about-facade.jpg": aboutFacade,
  "/src/assets/chairman.jpg": chairmanImg,
  "chairman.jpg": chairmanImg,
  "/src/assets/project-luxury-heights.jpg": pLuxury,
  "project-luxury-heights.jpg": pLuxury,
  "/src/assets/project-secretariat.jpg": pSecretariat,
  "project-secretariat.jpg": pSecretariat,
  "/src/assets/project-sunrise.jpg": pSunrise,
  "project-sunrise.jpg": pSunrise,
  "/src/assets/project-civic.jpg": pCivic,
  "project-civic.jpg": pCivic,
  "/src/assets/project-villa.jpg": pVilla,
  "project-villa.jpg": pVilla,
  "/src/assets/project-meghana-towers.jpg": pMeghana,
  "project-meghana-towers.jpg": pMeghana,
};

export interface ImageKitTransformations {
  width?: number;
  height?: number;
  quality?: number;
  blur?: number;
  crop?: "force" | "at_max" | "at_least" | "maintain_ratio";
  format?: "auto" | "webp" | "jpg" | "png";
}

/**
 * Generates an optimized ImageKit URL for a given asset path and transformations.
 * Supports resolving standard image paths as well as local imported assets (Vite format).
 * 
 * @param path The image path (e.g. '/hero-tower.jpg' or a Vite import like '/src/assets/hero-tower.jpg')
 * @param transformations Optional parameters for resizing, cropping, and optimizing the image
 * @returns The complete, optimized ImageKit URL
 */
export function ikUrl(path: string, transformations?: ImageKitTransformations): string {
  if (!path) return "";

  // If the path is a data URI, return as-is
  if (path.startsWith("data:")) {
    return path;
  }

  // Check if it is a Pinterest link (not a direct image)
  if (path.includes("pinterest.com")) {
    return assetMapping["/src/assets/about-facade.jpg"] || path;
  }

  // Check mappings only for local paths, not for external URLs/uploads
  const isLocal = !path.startsWith("http://") && !path.startsWith("https://");
  if (isLocal) {
    // Check direct path mapping
    if (assetMapping[path]) {
      return assetMapping[path];
    }

    // Check base name mapping (e.g. "project-luxury-heights.jpg")
    const baseName = path.substring(Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\")) + 1);
    if (assetMapping[baseName]) {
      return assetMapping[baseName];
    }
  }

  let cleanPath = "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    if (path.startsWith(imageKitConfig.urlEndpoint)) {
      // It's already an ImageKit URL. Extract the path after the endpoint, preserving subfolders.
      cleanPath = path.substring(imageKitConfig.urlEndpoint.length);
    } else {
      // It's a non-ImageKit external URL (like an external image or direct video link), return as-is.
      return path;
    }
  } else {
    // Local path or simple filename
    let fileName = path;
    if (path.includes("/") || path.includes("\\")) {
      const parts = path.split(/[/\\]/);
      fileName = parts[parts.length - 1];

      // Remove Vite's production build hashes if present
      // matches a hyphen followed by 8 alphanumeric characters before the extension
      // e.g., "hero-tower-A8d3F9g2.jpg" -> "hero-tower.jpg"
      fileName = fileName.replace(/-[a-zA-Z0-9]{8}\.([a-zA-Z0-9]+)$/, '.$1');
    }
    cleanPath = fileName.startsWith("/") ? fileName : `/${fileName}`;
  }

  const baseUrl = `${imageKitConfig.urlEndpoint}${cleanPath}`;

  if (!transformations) {
    return baseUrl;
  }

  // Map option keys to ImageKit transformation parameters
  const params: string[] = [];
  
  if (transformations.width !== undefined) params.push(`w-${transformations.width}`);
  if (transformations.height !== undefined) params.push(`h-${transformations.height}`);
  if (transformations.quality !== undefined) params.push(`q-${transformations.quality}`);
  if (transformations.blur !== undefined) params.push(`bl-${transformations.blur}`);
  if (transformations.crop !== undefined) {
    const cropMap: Record<string, string> = {
      force: "fo",
      at_max: "at_max",
      at_least: "at_least",
      maintain_ratio: "maintain_ratio"
    };
    params.push(`cm-${cropMap[transformations.crop] || transformations.crop}`);
  }
  
  if (transformations.format && transformations.format !== "auto") {
    params.push(`f-${transformations.format}`);
  }

  if (params.length > 0) {
    return `${baseUrl}?tr=${params.join(",")}`;
  }

  return baseUrl;
}
