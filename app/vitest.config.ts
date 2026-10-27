import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: 'jsdom',
            setupFiles: ['./app/test/setup.ts'],
            include: ['app/**/*.{test,spec}.{ts,tsx}'],
            css: true
        },
    })
);