export const GENRES: { readonly [genreID: string]: string } = {
  aventura: '12',
  fantasia: '14',
  animacao: '16',
  animação: '16',
  drama: '18',
  terror: '27',
  acao: '28',
  ação: '28',
  comedia: '35',
  comédia: '35',
  historia: '36',
  história: '36',
  faroeste: '37',
  thriller: '53',
  crime: '80',
  documentario: '99',
  documentário: '99',
  'ficcao cientifica': '878',
  'ficção científica': '878',
  misterio: '9648',
  mistério: '9648',
  musica: '10402',
  música: '10402',
  romance: '10749',
  familia: '10751',
  família: '10751',
  guerra: '10752',
  'cinema TV': '10770',
};

export function getGenreID(genre: string) {
  return GENRES[genre];
}
