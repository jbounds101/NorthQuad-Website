export const dataMovies: any[] = [
  {
    id: '1',
    name: 'Star Wars: Episode IV - A New Hope',
    releaseYear: 1977,
    director: 'George Lucas',
    boxOffice: 775398007,
    runningTime: 121,
    imagePath: 'assets/star-wars-4.jpg',
  },
  {
    id: '2',
    name: 'Star Wars: Episode V - The Empire Strikes Back',
    releaseYear: 1980,
    director: 'Irvin Kershner',
    boxOffice: 538375067,
    runningTime: 124,
    imagePath: 'assets/star-wars-5.jpg',
  },
  {
    id: '3',
    name: 'Star Wars: Episode VI - Return of the Jedi',
    releaseYear: 1983,
    director: 'Richard Marquand',
    boxOffice: 475106177,
    runningTime: 131,
    imagePath: 'assets/star-wars-6.jpg',
  },
  {
    id: '4',
    name: 'Star Wars: Episode I - The Phantom Menace',
    releaseYear: 1999,
    director: 'George Lucas',
    boxOffice: 1027044677,
    runningTime: 136,
    imagePath: 'assets/star-wars-1.jpg',
  },
  {
    id: '5',
    name: 'Star Wars: Episode II - Attack of the Clones',
    releaseYear: 2002,
    director: 'George Lucas',
    boxOffice: 653779970,
    runningTime: 142,
    imagePath: 'assets/star-wars-2.jpg',
  },
  {
    id: '6',
    name: 'Star Wars: Episode III - Revenge of the Sith',
    releaseYear: 2005,
    director: 'George Lucas',
    boxOffice: 868390560,
    runningTime: 140,
    imagePath: 'assets/star-wars-3.jpg',
  },
  {
    id: '7',
    name: 'Star Wars: Episode VII - The Force Awakens',
    releaseYear: 2015,
    director: 'J.J. Abrams',
    boxOffice: 2068223624,
    runningTime: 138,
    imagePath: 'assets/star-wars-7.jpg',
  },
  {
    id: '8',
    name: 'Star Wars: Episode VIII - The Last Jedi',
    releaseYear: 2017,
    director: 'Rian Johnson',
    boxOffice: 1332539889,
    runningTime: 152,
    imagePath: 'assets/star-wars-8.jpg',
  },
  {
    id: '9',
    name: 'Star Wars: Episode IX - The Rise of Skywalker',
    releaseYear: 2019,
    director: 'J.J. Abrams',
    boxOffice: 1074144248,
    runningTime: 142,
    imagePath: 'assets/star-wars-9.jpg',
  },
];

export const dataUsers: any[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@gmail.com",
    password: "12345",
    isAdmin: true,
  },
  {
    id: "2",
    name: "Jane Doe",
    email: "jane@gmail.com",
    password: "12345",
    isAdmin: false,
  },
];

export const dataComments: any[] = [
  {
    id: "1",
    body: "I like A New Hope",
    userName: "John Doe",
    userId: "1",
    movieId: "1"
  }, 
  {
    id: "2",
    body: "I don't like A New Hope at all!!!",
    userName: "Jane Doe",
    userId: "2",
    movieId: "1"
  },
  {
    id: "3",
    body: "Fills me with anguish and disgust",
    userName: "Jane Doe",
    userId: "2",
    movieId: "9"
  }
]

export function findHighestId(data: any[]): number {
  let highestId = 0;
  data.forEach(item => {
    if (item.id && parseInt(item.id) > highestId) {
      highestId = parseInt(item.id);
    }
  });
  return highestId;
}