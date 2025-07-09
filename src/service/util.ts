/**
 * Get the current screen size in tailwind notation.
 *
 * Example: If the current screen width is greater than 1024px, return 'lg'.
 * @returns {'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'default'} the Tailwind CSS compatible screen size identifier.
 */
export function getScreenSize(): 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'default' {
    const width = window.innerWidth;

    if (width >= 1536) return '2xl';
    if (width >= 1280) return 'xl';
    if (width >= 1024) return 'lg';
    if (width >= 768) return 'md';
    if (width >= 640) return 'sm';
    return 'default';
}
