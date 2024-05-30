export interface IHouse {
  url: string;
  name: string;
  region: string;
  coatOfArms: string;
  words: string;
  titles: string[];
  seats: string[];
  currentLord: string;
  heir: string;
  overlord: string;
  founded: string;
  founder: string;
  diedOut: Date;
  ancestralWeapons: string[];
  cadetBranches: string[];
  swornMembers: string[];
}

export type ICommonForHouseAndCharacter = Pick<
  IHouse,
  'url' | 'name' | 'titles'
>;

export interface ICharacter extends ICommonForHouseAndCharacter {
  gender: string;
  culture: string;
  born: string;
  died: string;
  aliases: string[];
  father: string;
  mother: string;
  spouse: string;
  allegiances: string[];
  books: string[];
  povBooks: string[];
  tvSeries: string[];
  playedBy: string[];
}

export interface ISkeletonDimension {
  height: string;
  width: string;
}
