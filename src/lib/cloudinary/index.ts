/**
 * Cloudinary URL Builder
 * Enforces organic modernist performance standards: f_auto, q_auto
 * Source: architecture.md §7.1
 */

export interface CloudinaryOptions {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
}

/**
 * Builds a Cloudinary URL with mandatory optimization flags
 * @param path - The asset path (without the base Cloudinary URL)
 * @param options - Transformation options
 * @returns Fully qualified Cloudinary URL
 */
export function cloudinaryUrl(path: string, options: CloudinaryOptions = {}): string {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
    // If path is already a full URL, return it (basic safety)
    if (path.startsWith('http')) return path;

    const base = `https://res.cloudinary.com/${cloudName}/image/upload`;

    // Enforce f_auto (format) and q_auto (quality)
    const defaultTransforms = ['f_auto', 'q_auto:eco'];

    const customTransforms: string[] = [];
    if (options.width) customTransforms.push(`w_${options.width}`);
    if (options.height) customTransforms.push(`h_${options.height}`);
    if (options.crop) customTransforms.push(`c_${options.crop}`);
    if (options.quality) customTransforms.push(`q_${options.quality}`);
    if (options.format) customTransforms.push(`f_${options.format}`);

    const transformString = [...defaultTransforms, ...customTransforms].join(',');

    // Ensure path doesn't start with a slash
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;

    return `${base}/${transformString}/${cleanPath}`;
}
