import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

import type { UpdateData } from 'firebase/firestore';

import { db } from '../config';
import FirebaseTask from './task';

import type { ReturnType } from './task';

export default class FirebaseCrudTasks<
  T extends Record<string, any>
> extends FirebaseTask<T> {
  public async fetchCollection(): Promise<ReturnType<T, []>> {
    try {
      const data = await getDocs(
        collection(db, this.collName).withConverter(this.converter())
      );

      return this.response<[]>(data.docs.map(d => d.data()));
    } catch (err) {
      return this.response(null, err);
    }
  }

  public async fetchDocument(payload?: { doc?: string }): Promise<ReturnType<T>> {
    const docName = this.docName ?? payload?.doc;

    if (!docName) return this.response();

    try {
      const document = await getDoc(
        doc(db, this.collName, docName).withConverter(this.converter())
      );

      return this.response(document.data());
    } catch (err) {
      return this.response(null, err);
    }
  }

  public async post(payload?: { doc?: string; data?: T }) {
    const docName = this.docName ?? payload?.doc;
    const data = this.data ?? payload?.data;

    if (!docName || !data) return this.response();

    try {
      await setDoc(doc(db, this.collName, docName), data);

      const updated = await getDoc(
        doc(db, this.collName, docName).withConverter(this.converter())
      );

      return this.response(updated.data());
    } catch (err) {
      return this.response(null, err);
    }
  }

  public async put(payload: { doc: string; data: Partial<T> }) {
    const docName = this.docName ?? payload?.doc;
    const data = (this.data ?? payload?.data) as UpdateData<T>;

    if (!docName || !data) return this.response();

    try {
      await updateDoc(
        doc(db, this.collName, docName).withConverter(this.converter()),
        data
      );

      const updated = await getDoc(
        doc(db, this.collName, docName).withConverter(this.converter())
      );

      return this.response(updated.data());
    } catch (err) {
      return this.response(null, err);
    }
  }
}
