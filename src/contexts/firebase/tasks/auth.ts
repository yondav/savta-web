import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { toTitleCase } from 'utils/utils.textFormat';

import type { User } from 'types/types.user';

import { auth } from '../config';
import FirebaseCrudTasks from './crud';

import type { ReturnType } from './task';

export default class FirebaseAuthTasks extends FirebaseCrudTasks<User> {
  public async checkAuth() {
    return new Promise((resolve: (value: User | null) => void, reject) => {
      auth.onAuthStateChanged(async user => {
        try {
          const userDoc = await this.fetchDocument({ doc: user?.uid });
          resolve(userDoc.data);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  public async resetPassword(payload: { email: string }): Promise<ReturnType<User>> {
    const { email } = payload;

    try {
      await sendPasswordResetEmail(auth, email);

      return this.response(null, null, 'Check inbox for reset link.');
    } catch (err) {
      return this.response(null, err);
    }
  }

  public async signIn(payload: {
    email: string;
    password: string;
  }): Promise<ReturnType<User>> {
    const { email, password } = payload;

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      if (!user.emailVerified) {
        await signOut(auth);
        await sendEmailVerification(user);

        return this.response(
          null,
          null,
          'Must verify account. Check inbox for verification link.'
        );
      }

      const userDoc = await this.fetchDocument({ doc: user.uid });

      return this.response(userDoc.data, null, `Welcome back ${user.displayName}`);
    } catch (err) {
      return this.response(null, err);
    }
  }

  public async signOut() {
    try {
      await signOut(auth);

      return this.response(null, null, 'Come back soon!');
    } catch (err) {
      return this.response(null, err);
    }
  }

  public async signUp(payload: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<ReturnType<User>> {
    const { email, password, firstName, lastName } = payload;

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(user, {
        displayName: `${toTitleCase(firstName)} ${toTitleCase(lastName)}`,
      });

      const newUser = await this.post({
        doc: user.uid,
        data: {
          uid: user.uid,
          firstName,
          lastName,
          email: {
            value: user.email,
            verified: user.emailVerified,
          },
          phone: user.phoneNumber,
          image: user.photoURL,
          posts: [],
          comments: [],
          saved: [],
        },
      });

      await signOut(auth);
      await sendEmailVerification(user);

      return this.response(newUser.data, null, 'Check inbox for verification link.');
    } catch (err) {
      return this.response(null, err);
    }
  }

  public async updateUser(payload: { data: Partial<User> }) {
    const { data } = payload;
    try {
      const { currentUser } = auth;

      if (!currentUser) throw new Error('Please log in and try again');

      await updateProfile(currentUser, {
        photoURL: data.image ?? currentUser.photoURL,
        displayName:
          data.firstName && data.lastName
            ? `${toTitleCase(data.firstName)} ${toTitleCase(data.lastName)}`
            : currentUser.displayName,
      });

      const updated = await this.put({ doc: currentUser.uid, data });

      return this.response(updated.data);
    } catch (err) {
      return this.response(null, err);
    }
  }
}
