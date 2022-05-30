export interface Abbreviation {
  abbreviation: string
  phrase: string
}

export interface AbbreviationWithResult extends Abbreviation {
  transcript: string
  isCorrect: boolean
}

export const TECH_ABBREVIATIONS: Abbreviation[] = [
  {
    abbreviation: 'Wi-Fi',
    phrase: 'wireless fidelity',
  },
  {
    abbreviation: 'WWW',
    phrase: 'world wide web',
  },
  {
    abbreviation: 'VPN',
    phrase: 'virtual private network',
  },
  {
    abbreviation: 'VoIP',
    phrase: 'voice over internet protocol',
  },
  {
    abbreviation: 'URL',
    phrase: 'uniform resource locator',
  },
  {
    abbreviation: 'USB',
    phrase: 'universal serial bus',
  },
  {
    abbreviation: 'UTF',
    phrase: 'unicode transformation format',
  },
  {
    abbreviation: 'UTC',
    phrase: 'coordinated universal time',
  },
  {
    abbreviation: 'UDP',
    phrase: 'user datagram protocol',
  },
  {
    abbreviation: 'TCP',
    phrase: 'transmission control protocol',
  },
  {
    abbreviation: 'TTS',
    phrase: 'text to speech',
  },
  {
    abbreviation: 'SQL',
    phrase: 'structured query language',
  },
  {
    abbreviation: 'GPU',
    phrase: 'graphical processing unit',
  },
  {
    abbreviation: 'CPU',
    phrase: 'central processing unit',
  },
  {
    abbreviation: 'RAM',
    phrase: 'random access memory',
  },
  {
    abbreviation: 'HDD',
    phrase: 'hard disk drive',
  },
  {
    abbreviation: 'SSD',
    phrase: 'solid state drive',
  },
  {
    abbreviation: 'SSH',
    phrase: 'secure shell',
  },
  {
    abbreviation: 'SSL',
    phrase: 'secure socket layer',
  },
  {
    abbreviation: 'SSO',
    phrase: 'single sign on',
  },
  {
    abbreviation: 'PnP',
    phrase: 'plug and play',
  },
  {
    abbreviation: 'PDF',
    phrase: 'portable document format',
  },
  {
    abbreviation: 'PC',
    phrase: 'personal computer',
  },
  {
    abbreviation: 'P2P',
    phrase: 'peer to peer',
  },
  {
    abbreviation: 'ML',
    phrase: 'machine learning',
  },
  {
    abbreviation: 'MFA',
    phrase: 'multi factor authorization',
  },
  {
    abbreviation: 'G18N',
    phrase: 'globalization',
  },
  {
    abbreviation: 'L10N',
    phrase: 'localization',
  },
  {
    abbreviation: 'KVM',
    phrase: 'keyboard video mouse',
  },
  {
    abbreviation: 'JS',
    phrase: 'javascript',
  },
  {
    abbreviation: 'ISP',
    phrase: 'internet service provider',
  },
  {
    abbreviation: 'IoT',
    phrase: 'internet of things',
  },
  {
    abbreviation: 'HTTP',
    phrase: 'hypertext transfer protocol',
  },
  {
    abbreviation: 'HCI',
    phrase: 'human computer interaction',
  },
  {
    abbreviation: 'GIF',
    phrase: 'graphics interchange format',
  },
  {
    abbreviation: 'WASM',
    phrase: 'web assembly',
  },
  {
    abbreviation: 'DDoS',
    phrase: 'distributed denial of service',
  },
  {
    abbreviation: 'DB',
    phrase: 'database',
  },
  {
    abbreviation: 'CORS',
    phrase: 'cross origin resource sharing',
  },
  {
    abbreviation: 'FE',
    phrase: 'front end',
  },
  {
    abbreviation: 'BE',
    phrase: 'back end',
  },
  {
    abbreviation: 'B2B',
    phrase: 'business to business',
  },
  {
    abbreviation: 'ACID',
    phrase: 'atomicity consistency isolation durability',
  },
  {
    abbreviation: 'API',
    phrase: 'application programming interface',
  },
  {
    abbreviation: 'CRUD',
    phrase: 'create read update delete',
  },
  {
    abbreviation: 'MVC',
    phrase: 'model view controller',
  },
  {
    abbreviation: 'SDK',
    phrase: 'software development kit',
  },
  {
    abbreviation: 'SOAP',
    phrase: 'simple object access protocol',
  },
  {
    abbreviation: 'ORM',
    phrase: 'object relational mapping',
  },
  {
    abbreviation: 'OOP',
    phrase: 'object oriented programming',
  },
  {
    abbreviation: 'TDD',
    phrase: 'test driven development',
  },
  {
    abbreviation: 'UAT',
    phrase: 'user acceptance testing',
  },
  {
    abbreviation: 'UUID',
    phrase: 'universally unique identifier',
  },
  {
    abbreviation: 'LGTM',
    phrase: 'looks good to me',
  },
  {
    abbreviation: 'GUI',
    phrase: 'graphical user interface',
  },
  {
    abbreviation: 'DOM',
    phrase: 'document object model',
  },
  {
    abbreviation: 'JSON',
    phrase: 'javascript object notation',
  },
  {
    abbreviation: 'HTML',
    phrase: 'hypertext markup language',
  },
  {
    abbreviation: 'CSS',
    phrase: 'cascading style sheet',
  },
  {
    abbreviation: 'SEO',
    phrase: 'search engine optimization',
  },
  {
    abbreviation: 'REGEX',
    phrase: 'regular expression',
  },
  {
    abbreviation: 'SaaS',
    phrase: 'software as a service',
  },
  {
    abbreviation: 'WYSIWYG',
    phrase: 'what you see is what you get',
  },
  {
    abbreviation: 'UI',
    phrase: 'user interface',
  },
  {
    abbreviation: 'UX',
    phrase: 'user experience',
  },
  {
    abbreviation: 'CDN',
    phrase: 'content delivery network',
  },
]

export enum GameStep {
  INITIAL = 'INITIAL',
  COUNTDOWN = 'COUNTDOWN',
  ANSWERING = 'ANSWERING',
  RESULT = 'RESULT',
  GAME_END = 'GAME_END',
}

export const BEATS_PER_BLOCK = 4
export const BEAT_MS = 700
