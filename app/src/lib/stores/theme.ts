import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'system';

function getInitialTheme(): Theme {
	if (!browser) return 'system';

	const stored = localStorage.getItem('cctv-theme');
	if (stored === 'light' || stored === 'dark' || stored === 'system') {
		return stored;
	}
	return 'system';
}

function applyTheme(theme: Theme) {
	if (!browser) return;

	const root = document.documentElement;
	const isDark =
		theme === 'dark' ||
		(theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

	if (isDark) {
		root.classList.add('dark');
	} else {
		root.classList.remove('dark');
	}

	localStorage.setItem('cctv-theme', theme);
}

function createThemeStore() {
	const initialTheme = getInitialTheme();
	const { subscribe, set } = writable<Theme>(initialTheme);

	// Apply initial theme
	if (browser) {
		applyTheme(initialTheme);
	}

	const setTheme = (theme: Theme) => {
		set(theme);
		applyTheme(theme);
	};

	const toggle = () => {
		const current = get({ subscribe });

		const next: Theme =
			current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light';

		setTheme(next);
	};

	return {
		subscribe,
		setTheme,
		toggle
	};
}

export const theme = createThemeStore();

