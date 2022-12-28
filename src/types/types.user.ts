type User = {
  uid: string;
  firstName: string;
  lastName: string;
  email: {
    value: string | null;
    verified: boolean;
  };
  phone?: string | null;
  image?: string | null;
  posts: [];
  comments: [];
  saved: [];
};

export type { User };
