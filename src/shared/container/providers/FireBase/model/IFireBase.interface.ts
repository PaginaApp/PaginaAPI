import { DecodedIdToken, UserRecord } from 'firebase-admin/auth';

interface IFireBase {
  createUserWithEmailAndPassword(
    email: string,
    password: string,
    usu_id: string,
  ): Promise<UserRecord>;
  signInWithEmailAndPassword(uid: string): Promise<string>;
  signOut(uid: string): Promise<void>;
  verifyIdToken(idToken: string): Promise<DecodedIdToken>;
}

export { IFireBase };
