// Initialize Firebase.
var config = {
    apiKey: "AIzaSyDRC48HbCC3bc_WovvtuvrbDyjzkkdubjc",
    authDomain: "seguro-viagens.firebaseapp.com",
    databaseURL: "https://seguro-viagens.firebaseio.com",
    projectId: "seguro-viagens",
    storageBucket: "seguro-viagens.appspot.com",
    messagingSenderId: "398653166722"
};
firebase.initializeApp(config);

// Shared user variables. 
var email = null;
var displayName = null;
var photoURL = null;
var uid = null;
var user = null;
var links = null;

// Control variables;
var signedout = false;
var access_admin = false;

// Firestore variables and constants.
var firestore = firebase.firestore();
var functions = firebase.functions();
const dbClient = firestore.collection("promotions/");
const dbAdmin = firestore.collection("descontos/");
const dbTest = firestore.collection("test/");

// Shared functions.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        // Catch shared user variables.
        displayName = user.displayName ? user.displayName : null;
        email = user.email ? user.email : null;
        photoURL = user.photoURL ? user.photoURL : null;
        uid = user.uid ? user.uid : null;
        testAuth(uid);
        if ((document.URL === "https://seguroviagens.online/sign.html")) {
            // User is signed in.
            // Reporting status.
            console.log("Signed in.");
            // Update the database.
            createUserDB(email, displayName, photoURL, uid);
            // Redirect to home.
            testDBAuth();
            window.location.href = '/admin.html';
        }
    } else if (!(document.URL === "https://seguroviagens.online/sign.html" || document.URL === "https://seguroviagens.online/admin.html")) {
        // User is signed out.
        // Nullify shared user variables.
        displayName = null;
        email = null;
        photoURL = null;
        uid = null;
        // Reporting status.
        if (!signedout) {
            console.log("Forbidden access.");
        } else {
            console.log("Signed out.");
        }
        // Redirect to login.
        if (!("http://127.0.0.1:5500/public/index.html")) {
            window.location.href = '/';
        }
    }
});

// Create user in firestore.
function createUserDB(_email, _displayName, photoURL, _uid) {
    dbClient.doc(_email).set({
        email: _email,
        displayName: _displayName,
        photoURL: "https://",
        uid: _uid,
    }).then(function () {
        // Handle errors.
        console.log("Stored user.");
    }).catch(function (error) {
        console.log("Got an: ", error);
    });
}

// Logout.
function logout() {
    firebase.auth().signOut().then(function () {
        // Handle errors.
    }).catch(function (error) {
        console.log("Sign out error", error);
        snackbar(error);
    });
}

// Update profile.
function updateProfile(_email, _displayName, _photoURL, _password, _re_password) {
    // Update displayName.
    if (_displayName != displayName && _displayName != null) {
        displayNameUpdate(_displayName);
    } else {
        snackbar("Try another username.");
    }

    // Update photo URL.
    if (_photoURL != photoURL && _photoURL != null) {
        photoURLUpdate(_photoURL);
    } else {
        snackbar("Profile photo don't works.");
    }

    // Update email.
    if (_email != email && _email != null) {
        emailUpdate(_email);
    } else {
        snackbar("A valid email address was not inserted.");
    }

    // Update password.
    if (_password === _re_password && _password != null) {
        passwordUpdate(_password);
    } else {
        snackbar("The  passwords don't match.");
    }
}

// Update display name .
function displayNameUpdate(_displayName, _photoURL) {
    firebase.auth().currentUser.updateProfile({
        displayName: _displayName
    }).then(function () {
        // Handle errors.
        snackbar("Username updated.");
    }).catch(function (error) {
        console.log("Got an: ", error);
        snackbar(error);
    });
}

// Update photo URL.
function photoURLUpdate(_photoURL) {
    firebase.auth().currentUser.updateProfile({
        photoURL: _photoURL
    }).then(function () {
        // Handle errors.
        snackbar("Profile photo updated.");
    }).catch(function (error) {
        console.log("Got an: ", error);
        snackbar(error);
    });
}

// Update email.
function emailUpdate(_email) {
    firebase.auth().updateEmail(_email).then(function () {
        // Handle errors.
        snackbar("Email updated.");
    }).catch(function (error) {
        console.log("Got an: ", error);
        snackbar(error);
    });
}

// Update password.
function passwordUpdate(_password) {
    firebase.auth().updatePassword(_password).then(function () {
        // Handle errors.
        snackbar("Password updated.");
    }).catch(function (error) {
        console.log("Got an: ", error);
        snackbar(error);
    });
}

// Change promotion.
function changePromo(_insurer, _promo, _time, _default) {
    dbClient.doc(_insurer).set({
        promotion: _promo,
        time: _time,
        default: _default,
    }).then(function () {
        // Handle errors.
        console.log("Stored user.");
    }).catch(function (error) {
        console.log("Got an:", error);
    });
    testDBAuth();
}

// Throw links of promotion to client.
function getPromotions(_insurer) {
    dbClient.doc(_insurer).get()
        .then(function (doc) {
            if (doc && doc.exists) {
                let myData = doc.data();
                var session = {
                    insurer: [],
                };
                session.insurer.push({
                    'promotion': myData.promotion,
                    'time': myData.time,
                    'default': myData.default
                });
                localStorage.setItem('session', JSON.stringify(session).replace("insurer", _insurer));
            }
        })
        .catch(function (error) {
            // Show errors.
            console.log("Got an: ", error);
        });
}

// Throw links of promotion to firestore.
function setPromotions(_insurer, _promo, _default) {
    dbAdmin.doc(_insurer).get()
        .then(function (doc) {
            if (doc && doc.exists) {
                let myData = doc.data();
                changePromo(insurerInput.value.toLowerCase(), myData[_promo], timeInput.value, myData[_default]);
                snackbar("Mudanças feitas.");
            }
        })
        .catch(function (error) {
            // Show errors.
            console.log("Got an: ", error);
        });
}

// Not used functions.
function getRealtimeUpdates() {
    dbClient.doc(insurerInput.value.toLowerCase()).onSnapshot(function (doc) {
        if (doc && doc.exists) {
            const myData = doc.data();
            console.log(myData.promotion);
            console.log(myData.time);
            console.log(myData.default);
        }
    });
}
//getRealtimeUpdates();

// Testing functions.
function testDBAuth() {
    dbTest.doc("auth").set({
        auth: "1",
    }).then(function () {
        // Handle errors.
        access_admin = true;
        console.log("Stored user.");
        console.log("Access status: ", access_admin);
    }).catch(function (error) {
        console.log("Got an: ", error);
        access_admin = false;
        console.log("Access status: ", access_admin);
    });
}

function testAuth(_uid) {
    if (logoutButton) {
        if (_uid != null) {
            logoutButton.style.display = "block";
            loginButton.style.display = "none";
        } else {
            logoutButton.style.display = "none";
            loginButton.style.display = "block";
        }
    }
}