import type {
  DocumentData,
  FirestoreError,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from 'firebase/firestore';

import { fromSlug, toSentence } from 'utils/utils.textFormat';

interface TaskConfig<T> {
  coll: string;
  doc?: string;
  data?: T;
}

export type ReturnType<T, A = void> = {
  message: string;
  error: FirestoreError | null;
  data: (A extends [] ? T[] : T) | null;
};

export default class FirebaseTask<T extends Record<string, any>> {
  public collName: string;

  public docName?: string;

  public data?: T;

  constructor(config: TaskConfig<T>) {
    this.collName = config.coll;
    this.docName = config.doc;
    this.data = config.data;
  }

  // eslint-disable-next-line class-methods-use-this
  protected converter() {
    return {
      toFirestore: (data: T): DocumentData => ({ ...data }),
      fromFirestore: (snap: QueryDocumentSnapshot, options: SnapshotOptions): T => {
        const data = snap.data(options)!;
        return data as T;
      },
    };
  }

  // eslint-disable-next-line class-methods-use-this
  protected response<A = void>(
    data: (A extends [] ? T[] : T) | null = null,
    err: unknown = null,
    message: string | null = null
  ): ReturnType<T, A> {
    const error = err as FirestoreError;

    if (error)
      return {
        message: toSentence(fromSlug(error.code.split('/').slice(1).join())),
        error,
        data,
      };

    return {
      message: message || 'success',
      error,
      data,
    };
  }
}
