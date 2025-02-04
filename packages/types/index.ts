export type contentType = {
  id: string;
  title: string;
  content: string;
  date: Date;
  userID: string;
  username: string;
  framework: string;
  profile: string;
};

export type commentType = {
  id: string;
  contentID: string;
  comment: string;
  date: Date;
  userID: string;
  username: string;
  framework: string;
  profile: string;
};

export type userType = {
  id: string;
  username: string;
  framework: string;
  profile: string;
};

export type cardProperty = {
  content?: contentType;
  comment?: commentType;
  cardClickHandler?: (id: string) => void;
};
