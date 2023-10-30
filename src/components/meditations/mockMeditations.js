const mockTracksData = [
  {
    public_id: 'track001',
    url: 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg',
  },
  {
    public_id: 'track002',
    url: 'https://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a',
  },
  {
    public_id: 'track003',
    url: 'http://commondatastorage.googleapis.com/codeskulptor-assets/week7-button.m4a',
  },
  {
    public_id: 'track004',
    url: 'http://commondatastorage.googleapis.com/codeskulptor-assets/week7-bounce.m4a',
  },
  // Puedes agregar más pistas con datos ficticios
];

export const meditations = [
  {
    name: 'Meditation 1',
    description: 'A relaxing meditation',
    tracks: [
      mockTracksData[0],
      mockTracksData[1],
    ],
  },
  {
    name: 'Meditation 2',
    description: 'Another calming meditation',
    tracks: [
      mockTracksData[2],
      mockTracksData[3],
    ],
  },
  // Puedes seguir agregando meditaciones con las pistas correspondientes
];
