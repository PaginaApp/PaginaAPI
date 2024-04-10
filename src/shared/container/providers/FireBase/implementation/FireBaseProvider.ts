import { AuthorizationError } from '@shared/errors/AuthorizationError';
import { UnknownError } from '@shared/errors/UnknownError';
import axios from 'axios';
import admin from 'firebase-admin';
import { DecodedIdToken, UserRecord } from 'firebase-admin/auth';
import { initializeFirebase } from '../ConfigFB';
import { IFireBase } from '../model/IFireBase.interface';

class FireBaseProvider implements IFireBase {
  constructor() {
    initializeFirebase();
  }

  async createUserWithEmailAndPassword(
    email: string,
    password: string,
    usu_id: string,
  ): Promise<UserRecord> {
    try {
      const userRecord = await admin.auth().createUser({
        email,
        password,
        // adiciona o id do usuario no firebase
        uid: usu_id,
      });
      return userRecord;
    } catch (error) {
      console.dir(error);
      throw new UnknownError(
        'Ocorreu um erro desconhecido, nos desculpe pelo transtorno',
      );
    }
  }

  async signIn(uid: string): Promise<string> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_API_KEY}`;

    try {
      const userCredential = await admin.auth().createCustomToken(uid);

      try {
        const respose = await axios.post(url, {
          token: userCredential,
          returnSecureToken: true,
        });

        return respose.data.idToken;
      } catch (error) {
        throw new UnknownError(
          'Ocorreu um erro desconhecido, nos desculpe pelo transtorno',
        );
      }
    } catch (error) {
      throw new UnknownError(
        'Ocorreu um erro desconhecido, nos desculpe pelo transtorno',
      );
    }
  }

  async signOut(uid: string): Promise<void> {
    try {
      await admin.auth().revokeRefreshTokens(uid);
    } catch (error) {
      throw new UnknownError(
        'Ocorreu um erro desconhecido, nos desculpe pelo transtorno',
      );
    }
  }

  async verifyIdToken(idToken: string): Promise<DecodedIdToken> {
    try {
      // recebe o token e um booleano que indica para o firebase que é para verificar se o token é valido
      const decodedToken = await admin.auth().verifyIdToken(idToken, true);
      return decodedToken;
    } catch (error) {
      throw new AuthorizationError('Usuário não autorizado');
    }
  }

  // bucket operations

  async uploadFile(fileName: string, fileContent: Buffer): Promise<string> {
    try {
      const bucket = admin.storage().bucket();
      const file = bucket.file(fileName);
      await file.save(fileContent);
      return `File uploaded successfully: ${fileName}`;
    } catch (error) {
      throw new UnknownError(
        'Ocorreu um erro desconhecido, nos desculpe pelo transtorno',
      );
    }
  }

  async downloadFile(fileName: string): Promise<Buffer> {
    try {
      const bucket = admin.storage().bucket();
      const file = bucket.file(fileName);
      const [fileContent] = await file.download();
      return fileContent;
    } catch (error) {
      throw new UnknownError(
        'Ocorreu um erro desconhecido, nos desculpe pelo transtorno',
      );
    }
  }

  async deleteFile(fileName: string): Promise<void> {
    try {
      const bucket = admin.storage().bucket();
      const file = bucket.file(fileName);
      await file.delete();
    } catch (error) {
      throw new UnknownError(
        'Ocorreu um erro desconhecido, nos desculpe pelo transtorno',
      );
    }
  }
}

export { FireBaseProvider };
