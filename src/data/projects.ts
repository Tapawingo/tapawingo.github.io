export interface ProjectMeta {
	slug: string;
	name: string;
	blurb: string;
	role: string;
	tags: string[];
	/** owner/repo on GitHub, used for build-time star/language enrichment */
	repo?: string;
	/** Link to show as the primary CTA, defaults to the GitHub repo */
	href: string;
	/** Extra link, e.g. a marketplace/store listing */
	extraHref?: { label: string; href: string };
	/** Set when the repo is currently private, hides the (broken) source link */
	sourcePrivate?: boolean;
}

export const projects: ProjectMeta[] = [
	{
		slug: 'trenchkit',
		name: 'TrenchKit',
		blurb:
			'A mod manager for Foxhole, built in modern C++20 and Qt6. Handles install, load order, and packaging so players don’t have to touch the filesystem by hand.',
		role: 'Core developer & maintainer',
		tags: ['C++20', 'Qt6', 'Desktop'],
		repo: 'Tapawingo/TrenchKit',
		href: 'https://github.com/Tapawingo/TrenchKit',
		extraHref: {
			label: 'Nexus Mods',
			href: 'https://www.nexusmods.com/foxhole/mods/163',
		},
	},
	{
		slug: 'trenchquarters',
		name: 'TrenchQuarters',
		blurb:
			'A regiment management tool for Foxhole, handling rosters, logistics, and day-to-day organization for the game’s community-run regiments. Actively used by a number of regiments to run their operations.',
		role: 'Lead developer',
		tags: ['TypeScript', 'Regiment Tooling'],
		repo: 'clustermod/TrenchQuarters',
		href: 'https://github.com/clustermod/TrenchQuarters',
		sourcePrivate: true,
		extraHref: {
			label: 'Live Site',
			href: 'https://trenchquarters.com/',
		},
	},
	{
		slug: 'freetakserver',
		name: 'FreeTAKServer',
		blurb:
			'The first open-source, civilian-usable ATAK server, a Python implementation of the Situational Awareness stack used by TAK clients. Led the project and built its core COTS broadcast functionality in 2020.',
		role: 'Core developer & project lead',
		tags: ['Python', 'Open Source', 'Networking'],
		repo: 'FreeTAKTeam/FreeTakServer',
		href: 'https://github.com/FreeTAKTeam/FreeTakServer',
	},
	{
		slug: 'formlense',
		name: 'FormLense',
		blurb:
			'OCR- and AI-assisted form processing: automates data extraction from paper forms with a human-in-the-loop verification step. Built as an NTNU/SAWOO integration project.',
		role: 'Project lead, Scrum master & full-stack developer',
		tags: ['OCR', 'Full-stack', 'AI'],
		repo: 'Tapawingo/FormLense',
		href: 'https://github.com/Tapawingo/FormLense',
		sourcePrivate: true,
	},
	{
		slug: 'retro-plasma',
		name: 'retro-plasma',
		blurb:
			'A tiny, dependency-free TypeScript library for animated, dithered plasma backgrounds, with configurable hue, blob size, and ordered dithering. It’s the exact thing rendering behind this page right now.',
		role: 'Author',
		tags: ['TypeScript', 'WebGL', 'Graphics'],
		repo: 'Tapawingo/retro-plasma',
		href: 'https://github.com/Tapawingo/retro-plasma',
		extraHref: {
			label: 'Live demo',
			href: 'https://tapawingo.github.io/retro-plasma/',
		},
	},
	{
		slug: 'dlimageextension',
		name: 'DLImageExtension',
		blurb:
			'A published Chrome extension for bulk-downloading images from the current webpage in one click.',
		role: 'Author',
		tags: ['JavaScript', 'Chrome Extension'],
		repo: 'Tapawingo/DLImageExtension',
		href: 'https://github.com/Tapawingo/DLImageExtension',
		extraHref: {
			label: 'Store Page',
			href: 'https://chromewebstore.google.com/detail/fmfgcdnflhhghkcdmdhkdcdofimnipgp',
		},
	},
];
