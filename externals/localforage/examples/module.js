import localforage from "../dist/localforage.js";

localforage.ready(function () {
    var key = 'STORE_KEY';
    var value = 'What we save offline';
    var UNKNOWN_KEY = 'unknown_key';

    localforage.setItem(key, value, function () {
        console.log('SAVING', value);

        localforage.getItem(key, function (readValue) {
            console.log('READING', readValue);
        });
    });

    // Promises code.
    localforage.setItem('promise', 'ring', function () {
        localforage.getItem('promise').then(function (readValue) {
            console.log('YOU PROMISED!', readValue);
        });
    });

    // Since this key hasn't been set yet, we'll get a null value
    localforage.getItem(UNKNOWN_KEY, function (readValue) {
        console.log('FAILED READING', UNKNOWN_KEY, readValue);
    });
});

localforage.ready().then(function () {
    console.log("You can use ready from Promises too");
});
