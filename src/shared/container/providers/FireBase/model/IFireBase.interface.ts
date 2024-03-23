import { DecodedIdToken, UserRecord } from 'firebase-admin/auth';

interface IFireBase {
  createUserWithEmailAndPassword(
    email: string,
    password: string,
    usu_id: string,
  ): Promise<UserRecord>;
  signIn(uid: string): Promise<string>;
  signOut(uid: string): Promise<void>;
  verifyIdToken(idToken: string): Promise<DecodedIdToken>;

  // bucket operations
  uploadFile(fileName: string, fileContent: Buffer): Promise<string>;

  downloadFile(fileName: string): Promise<Buffer>;

  deleteFile(fileName: string): Promise<void>;
}

export { IFireBase };
