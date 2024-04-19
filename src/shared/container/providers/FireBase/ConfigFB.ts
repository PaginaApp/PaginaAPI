import admin from 'firebase-admin';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require('@shared/container/providers/FireBase/pagina-82307-firebase-adminsdk-gsb36-a34e3e7516.json');

export function initializeFirebase() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.BUCKET_NAME,
  });
}
