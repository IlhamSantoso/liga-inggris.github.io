var webPush = require('web-push');

const vapidKeys = {
        "publicKey": "BB579OW8-HDneLhPvkmnxp3IXvZB-a8kFuCEgpzM2KeXpttHOQYJXy3s3UeBYIrLQPq8RBvnDvT2T33onhF3lN4",
        "privateKey": "nD0Z06m5ySEU-9oW9VOcNEw96trnVx9SwrksOeWfbdY"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
const pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/cZTo-k8ha7k:APA91bHNZN-tQfuBxYpXIeKCX_A2DGQlTs9fIgXbG67ChSnSS_BxlSXSNWFPC-MSyzLPCXGEptnRS8oiYrpq6xaGjzBQXKCmiIhWrUHUvRegL1ZPmat1Oy56uVRFmIsKoui8M0_9vAzH",
    "keys": {
        "p256dh": "BIyP9omRpW1aNn3IOx1GiUNq5X1xJeozsedkr4PLXQBCKruAaDVXXKlMaG4Etx9O+TPKsTWQe29CGluaPTMwqOU=",
        "auth": "g/N/6hFi5ZiOGizaLZVQFw=="
    }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
    gcmAPIKey: '296482534801',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);