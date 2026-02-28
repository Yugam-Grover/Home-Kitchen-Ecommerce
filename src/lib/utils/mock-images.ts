// src/lib/utils/mock-images.ts

const MOCK_IMAGE_COUNT = 15;

/** Return a deterministic mock image path based on product index */
export function getMockImageSrc(index: number): string {
    const num = (index % MOCK_IMAGE_COUNT) + 1;
    return `/assets/mock/img${num}.jpg`;
}

/** Return a mock gallery (3 images cycling from the base) */
export function getMockGallery(index: number): string[] {
    return [
        getMockImageSrc(index),
        getMockImageSrc(index + 3),
        getMockImageSrc(index + 7),
    ];
}
