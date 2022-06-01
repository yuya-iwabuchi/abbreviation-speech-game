export interface Abbreviation {
  abbreviation: string
  phrase: string
}

export interface AbbreviationWithResult extends Abbreviation {
  transcript: string
  isCorrect: boolean
}

export const DEVELOPER_ABBREVIATIONS: Abbreviation[] = [
  { abbreviation: 'Wi-Fi', phrase: 'wireless fidelity' },
  { abbreviation: 'WWW', phrase: 'world wide web' },
  { abbreviation: 'VPN', phrase: 'virtual private network' },
  { abbreviation: 'VoIP', phrase: 'voice over internet protocol' },
  { abbreviation: 'URL', phrase: 'uniform resource locator' },
  { abbreviation: 'UTF', phrase: 'unicode transformation format' },
  { abbreviation: 'UTC', phrase: 'coordinated universal time' },
  { abbreviation: 'UDP', phrase: 'user datagram protocol' },
  { abbreviation: 'TCP', phrase: 'transmission control protocol' },
  { abbreviation: 'TTS', phrase: 'text to speech' },
  { abbreviation: 'SQL', phrase: 'structured query language' },
  { abbreviation: 'SSH', phrase: 'secure shell' },
  { abbreviation: 'SSL', phrase: 'secure socket layer' },
  { abbreviation: 'SSO', phrase: 'single sign on' },
  { abbreviation: 'PDF', phrase: 'portable document format' },
  { abbreviation: 'P2P', phrase: 'peer to peer' },
  { abbreviation: 'ML', phrase: 'machine learning' },
  { abbreviation: 'MFA', phrase: 'multi factor authorization' },
  { abbreviation: 'G18N', phrase: 'globalization' },
  { abbreviation: 'L10N', phrase: 'localization' },
  { abbreviation: 'JS', phrase: 'javascript' },
  { abbreviation: 'ISP', phrase: 'internet service provider' },
  { abbreviation: 'IoT', phrase: 'internet of things' },
  { abbreviation: 'HTTP', phrase: 'hypertext transfer protocol' },
  { abbreviation: 'HCI', phrase: 'human computer interaction' },
  { abbreviation: 'GIF', phrase: 'graphics interchange format' },
  { abbreviation: 'WASM', phrase: 'web assembly' },
  { abbreviation: 'DDoS', phrase: 'distributed denial of service' },
  { abbreviation: 'DB', phrase: 'database' },
  { abbreviation: 'CORS', phrase: 'cross origin resource sharing' },
  { abbreviation: 'FE', phrase: 'front end' },
  { abbreviation: 'BE', phrase: 'back end' },
  { abbreviation: 'B2B', phrase: 'business to business' },
  { abbreviation: 'ACID', phrase: 'atomicity consistency isolation durability' },
  { abbreviation: 'API', phrase: 'application programming interface' },
  { abbreviation: 'CRUD', phrase: 'create read update delete' },
  { abbreviation: 'MVC', phrase: 'model view controller' },
  { abbreviation: 'SDK', phrase: 'software development kit' },
  { abbreviation: 'SOAP', phrase: 'simple object access protocol' },
  { abbreviation: 'ORM', phrase: 'object relational mapping' },
  { abbreviation: 'OOP', phrase: 'object oriented programming' },
  { abbreviation: 'TDD', phrase: 'test driven development' },
  { abbreviation: 'UAT', phrase: 'user acceptance testing' },
  { abbreviation: 'UUID', phrase: 'universally unique identifier' },
  { abbreviation: 'LGTM', phrase: 'looks good to me' },
  { abbreviation: 'QA', phrase: 'quality assurance' },
  { abbreviation: 'GUI', phrase: 'graphical user interface' },
  { abbreviation: 'DOM', phrase: 'document object model' },
  { abbreviation: 'JSON', phrase: 'javascript object notation' },
  { abbreviation: 'HTML', phrase: 'hypertext markup language' },
  { abbreviation: 'CSS', phrase: 'cascading style sheet' },
  { abbreviation: 'SEO', phrase: 'search engine optimization' },
  { abbreviation: 'REGEX', phrase: 'regular expression' },
  { abbreviation: 'SaaS', phrase: 'software as a service' },
  { abbreviation: 'WYSIWYG', phrase: 'what you see is what you get' },
  { abbreviation: 'UI', phrase: 'user interface' },
  { abbreviation: 'UX', phrase: 'user experience' },
  { abbreviation: 'CDN', phrase: 'content delivery network' },
  { abbreviation: 'CLI', phrase: 'command line interface' },
  { abbreviation: 'DNS', phrase: 'domain name service' },
  { abbreviation: 'IT', phrase: 'information technology' },
  { abbreviation: 'FTP', phrase: 'file transfer protocol' },
  { abbreviation: 'ASCII', phrase: 'american standard code for information interchange' },
  { abbreviation: 'DHCP', phrase: 'dynamic host configuration protocol' },
  { abbreviation: 'CRM', phrase: 'customer relationship management' },
  { abbreviation: 'IDE', phrase: 'integrated development environment' },
  { abbreviation: 'QoS', phrase: 'quality of service' },
  { abbreviation: 'XML', phrase: 'extensible markup language' },
  { abbreviation: 'AES', phrase: 'advanced encryption standard' },
  { abbreviation: 'VM', phrase: 'virtual machine' },
  { abbreviation: 'JPEG', phrase: 'joint photographic experts group' },
  { abbreviation: 'ROM', phrase: 'read only memory' },
  { abbreviation: 'NTP', phrase: 'network time protocol' },
  { abbreviation: 'LTE', phrase: 'long term evolution' },
  { abbreviation: 'DBMS', phrase: 'database management service' },
  { abbreviation: 'CD', phrase: 'compact disc' },
  { abbreviation: 'CAD', phrase: 'computer aided design' },
  { abbreviation: 'AI', phrase: 'artificial intelligence' },
]

export const COMPUTING_ABBREVIATIONS: Abbreviation[] = [
  { abbreviation: 'USB', phrase: 'universal serial bus' },
  { abbreviation: 'GPU', phrase: 'graphical processing unit' },
  { abbreviation: 'CPU', phrase: 'central processing unit' },
  { abbreviation: 'RAM', phrase: 'random access memory' },
  { abbreviation: 'HDD', phrase: 'hard disk drive' },
  { abbreviation: 'SSD', phrase: 'solid state drive' },
  { abbreviation: 'PnP', phrase: 'plug and play' },
  { abbreviation: 'PC', phrase: 'personal computer' },
  { abbreviation: 'KVM', phrase: 'keyboard video mouse' },
  { abbreviation: 'LCD', phrase: 'liquid crystal display' },
  { abbreviation: 'OEM', phrase: 'original equipment manufacturer' },
  { abbreviation: 'LAN', phrase: 'local area network' },
  { abbreviation: 'WAN', phrase: 'wide area network' },
  { abbreviation: 'PC', phrase: 'personal computer' },
  { abbreviation: 'OS', phrase: 'operating system' },
  { abbreviation: 'MAC', phrase: 'media access control' },
  { abbreviation: 'PCB', phrase: 'printed circuit board' },
  { abbreviation: 'LED', phrase: 'light emitting diode' },
  { abbreviation: 'CRT', phrase: 'cathode ray tube' },
  { abbreviation: 'SSID', phrase: 'service set identifier' },
  { abbreviation: 'RSS', phrase: 'really simple syndication' },
  { abbreviation: 'NFC', phrase: 'near field communication' },
  { abbreviation: 'HDMI', phrase: 'high definition multimedia interface' },
  { abbreviation: 'DRM', phrase: 'digital rights management' },
  { abbreviation: 'GPS', phrase: 'global positioning system' },
]

export const AWS_ABBREVIATIONS: Abbreviation[] = [
  { abbreviation: 'AWS', phrase: 'amazon web services' },
  { abbreviation: 'S3', phrase: 'simple storage service' },
  { abbreviation: 'RDS', phrase: 'relational database service' },
  { abbreviation: 'EC2', phrase: 'elastic compute cloud' },
  { abbreviation: 'ACL', phrase: 'access control list' },
  { abbreviation: 'ARN', phrase: 'amazon resource name' },
  { abbreviation: 'AZ', phrase: 'availability zone' },
  { abbreviation: 'ASG', phrase: 'auto scaling group' },
  { abbreviation: 'DMS', phrase: 'database migration service' },
  { abbreviation: 'ECR', phrase: 'elastic container registry' },
  { abbreviation: 'EKS', phrase: 'elastic kubernetes service' },
  { abbreviation: 'ELB', phrase: 'elastic load balancing' },
  { abbreviation: 'EMR', phrase: 'elastic map reduce' },
  { abbreviation: 'FaaS', phrase: 'function as a service' },
  { abbreviation: 'IAM', phrase: 'identity and access management' },
  { abbreviation: 'KMS', phrase: 'key management service' },
  { abbreviation: 'SMS', phrase: 'server migration service' },
  { abbreviation: 'SES', phrase: 'simple email service' },
  { abbreviation: 'SQS', phrase: 'simple queue service' },
  { abbreviation: 'SNS', phrase: 'simple notification service' },
  { abbreviation: 'SAML', phrase: 'security assertion markup language' },
  { abbreviation: 'VPC', phrase: 'virtual private cloud' },
  { abbreviation: 'WAF', phrase: 'web application firewall' },
]

export const GAMING_ABBREVIATIONS: Abbreviation[] = [
  { abbreviation: 'PVP', phrase: 'player versus player' },
  { abbreviation: 'PVE', phrase: 'player versus environment' },
  { abbreviation: 'DLC', phrase: 'downloadable content' },
  { abbreviation: 'KDR', phrase: 'kill death ratio' },
  { abbreviation: 'NPC', phrase: 'non player character' },
  { abbreviation: 'RPG', phrase: 'role playing game' },
  { abbreviation: 'HUD', phrase: 'head up display' },
  { abbreviation: 'RTS', phrase: 'real time strategy' },
  { abbreviation: 'TBS', phrase: 'turn based strategy' },
  { abbreviation: 'TPS', phrase: 'third person shooter' },
  { abbreviation: 'MOBA', phrase: 'multiplayer online battle arena' },
  { abbreviation: 'MMO', phrase: 'massively multiplayer online' },
  { abbreviation: 'P2W', phrase: 'pay to win' },
  { abbreviation: 'GLHF', phrase: 'good luck have fun' },
  { abbreviation: 'GG', phrase: 'good game' },
  { abbreviation: 'AFK', phrase: 'away from keyboard' },
  { abbreviation: 'OP', phrase: 'overpowered' },
  { abbreviation: 'AOE', phrase: 'area of effect' },
  { abbreviation: 'DOT', phrase: 'damage over time' },
  { abbreviation: 'DPS', phrase: 'damage per second' },
  { abbreviation: 'HP', phrase: 'health point' },
  { abbreviation: 'MVP', phrase: 'most valuable player' },
  { abbreviation: 'F2P', phrase: 'free to play' },
  { abbreviation: 'WoW', phrase: 'world of warcraft' },
  { abbreviation: 'GTA', phrase: 'grand theft auto' },
  { abbreviation: 'LAN', phrase: 'local area network' },
  { abbreviation: 'DC', phrase: 'disconnect' },
  { abbreviation: 'LFG', phrase: 'looking for group' },
]

export const SLANG_ABBREVIATIONS: Abbreviation[] = [
  { abbreviation: 'BTW', phrase: 'by the way' },
  { abbreviation: 'AFAIK', phrase: 'as far as i know' },
  { abbreviation: 'FOMO', phrase: 'fear of missing out' },
  { abbreviation: 'FWIW', phrase: "for what it's worth" },
  { abbreviation: 'NVM', phrase: 'nevermind' },
  { abbreviation: 'TBH', phrase: 'to be honest' },
  { abbreviation: 'SMH', phrase: 'shaking my head' },
  { abbreviation: 'YOLO', phrase: 'you only live once' },
  { abbreviation: 'BRB', phrase: 'be right back' },
  { abbreviation: 'DM', phrase: 'direct message' },
  { abbreviation: 'FYI', phrase: 'for your information' },
  { abbreviation: 'IMO', phrase: 'in my opinion' },
  { abbreviation: 'IRL', phrase: 'in real life' },
  { abbreviation: 'JK', phrase: 'just kidding' },
  { abbreviation: 'LMK', phrase: 'let me know' },
  { abbreviation: 'LOL', phrase: 'laughing out loud' },
  { abbreviation: 'HMU', phrase: 'hit me up' },
  { abbreviation: 'OMG', phrase: 'oh my god' },
  { abbreviation: 'LMAO', phrase: 'laughing my ass off' },
  { abbreviation: 'TIL', phrase: 'today i learned' },
  { abbreviation: 'TBT', phrase: 'throwback thursday' },
  { abbreviation: 'AMA', phrase: 'ask me anything' },
  { abbreviation: 'NBD', phrase: 'not big deal' },
  { abbreviation: 'TMI', phrase: 'too much information' },
  { abbreviation: 'TTYL', phrase: 'talk to you later' },
]

export const BUSINESS_ABBREVIATIONS: Abbreviation[] = [
  { abbreviation: 'GDP', phrase: 'gross domestic product' },
  { abbreviation: 'IMF', phrase: 'international monetary fund' },
  { abbreviation: 'IPO', phrase: 'initial public offering' },
  { abbreviation: 'CPI', phrase: 'consumer price index' },
  { abbreviation: 'CRM', phrase: 'customer relationship management' },
  { abbreviation: 'NAV', phrase: 'net asset value' },
  { abbreviation: 'FDI', phrase: 'foreign direct investment' },
  { abbreviation: 'GL', phrase: 'general ledger' },
  { abbreviation: 'ROI', phrase: 'return of investment' },
  { abbreviation: 'GP', phrase: 'gross profit' },
  { abbreviation: 'COGS', phrase: 'cost of goods sold' },
  { abbreviation: 'KYC', phrase: 'know your customer' },
  { abbreviation: 'PPP', phrase: 'purchasing power parity' },
  { abbreviation: 'ATM', phrase: 'automated teller machine' },
  { abbreviation: 'BOM', phrase: 'bill of material' },
  { abbreviation: 'ALM', phrase: 'asset liability management' },
  { abbreviation: 'CAR', phrase: 'capital adequacy ratio' },
  { abbreviation: 'AML', phrase: 'anti money laundering' },
  { abbreviation: 'CEO', phrase: 'chief executive officer' },
  { abbreviation: 'CFO', phrase: 'chief financial officer' },
  { abbreviation: 'KPI', phrase: 'key performance indicator' },
]

export interface Category {
  key: string
  label: string
  abbreviations: Abbreviation[]
}

export const CATEGORIES: Category[] = [
  {
    key: 'developer',
    label: 'Developer',
    abbreviations: DEVELOPER_ABBREVIATIONS,
  },
  {
    key: 'computing',
    label: 'Computing',
    abbreviations: COMPUTING_ABBREVIATIONS,
  },
  {
    key: 'aws',
    label: 'AWS',
    abbreviations: AWS_ABBREVIATIONS,
  },
  {
    key: 'gaming',
    label: 'Gaming',
    abbreviations: GAMING_ABBREVIATIONS,
  },
  {
    key: 'slang',
    label: 'Slang',
    abbreviations: SLANG_ABBREVIATIONS,
  },
  {
    key: 'business',
    label: 'Business',
    abbreviations: BUSINESS_ABBREVIATIONS,
  },
]
