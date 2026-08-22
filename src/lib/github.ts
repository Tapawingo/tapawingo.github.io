export interface RepoStats {
	stars: number;
	language: string | null;
}

/** Hand-set fallback numbers (as of writing) used if the GitHub API call fails or is rate-limited at build time. */
const FALLBACK: Record<string, RepoStats> = {
	'Tapawingo/TrenchKit': { stars: 11, language: 'C++' },
	'clustermod/TrenchQuarters': { stars: 0, language: 'TypeScript' },
	'FreeTAKTeam/FreeTakServer': { stars: 947, language: 'Python' },
	'Tapawingo/FormLense': { stars: 0, language: 'Go' },
	'Tapawingo/retro-plasma': { stars: 0, language: 'TypeScript' },
	'Tapawingo/DLImageExtension': { stars: 2, language: 'JavaScript' },
};

/**
 * Fetches star count + primary language for a repo at build time.
 * Falls back to a hardcoded snapshot so the build never breaks on
 * GitHub being unreachable or rate-limiting the anonymous request.
 */
export async function getRepoStats(repo: string): Promise<RepoStats> {
	try {
		const res = await fetch(`https://api.github.com/repos/${repo}`, {
			headers: { Accept: 'application/vnd.github+json' },
		});

		if (!res.ok) {
			throw new Error(`GitHub API responded ${res.status} for ${repo}`);
		}

		const data = (await res.json()) as {
			stargazers_count: number;
			language: string | null;
		};

		return { stars: data.stargazers_count, language: data.language };
	} catch (err) {
		console.warn(`[github.ts] falling back for ${repo}:`, err);
		return FALLBACK[repo] ?? { stars: 0, language: null };
	}
}
