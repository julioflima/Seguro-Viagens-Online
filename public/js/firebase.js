if (!(document.URL === "http://127.0.0.1:5500/public/sign.html" || document.URL === "http://127.0.0.1:5500/public/admin.html")) {
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

    // Shared constants.
    const profilePhoto = document.querySelector(".image");
    const loginBox = document.querySelector("#container-box");
    const enterKey = document.querySelector("#keyEnter");
    const reportText = document.querySelector("#report");
    const titleText = document.querySelector("#title");
    const usernameText = document.querySelector("#txtUsername");
    const emailText = document.querySelector("#txtEmail");
    const photoURLText = document.querySelector("#txtphotoURL");
    const passText = document.querySelector("#txtPassword");
    const repassText = document.querySelector("#txtRePassword");
    const budgetText = document.querySelector("#txtBudget");
    const enterButton = document.querySelector("#btnEnter");
    const backButton = document.querySelector("#btnBack");
    const accountButton = document.querySelector("#btnAccount");
    const bugButton = document.querySelector("#btnBug");
    const codeButton = document.querySelector("#btnCode");
    const upButton = document.querySelector("#btnUp");
    const updateButton = document.querySelector("#btnUpdate");
    const fireButton = document.querySelector("#btnFire");
    const sendButton = document.querySelector("#btnSend");
    const sign_upButton = document.querySelector("#btnSingUp");
    const closeButton = document.querySelector("#btnClose");
    const logoutButton = document.querySelector("#btnLogout");
    const loginButton = document.querySelector("#btnLogin");
    const testDataBase = document.querySelector("#testDB");
    var insurerInput = document.querySelector("#insurer");
    var promoInput = document.querySelector("#promo");
    var timeInput = document.querySelector("#time");
    var defaultInput = document.querySelector("#default");

    // Shared variables. 
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
    const dbClient = firestore.collection("promotions/");
    const dbAdmin = firestore.collection("descontos/");
    const dbTest = firestore.collection("test/");

    //Main functions.
    document.addEventListener('DOMContentLoaded', function () {
        if (document.URL === "https://seguroviagens.online/") {
            var insurer = "sulamerica";
            getClientPromotions(insurer);
            let restoredSession = JSON.parse(localStorage.getItem('session'));
            let _promo = restoredSession[insurer][0]['promotion'];
            let _time = restoredSession[insurer][0]['time'];
            let _default = restoredSession[insurer][0]['default'];
            links = new Array(_promo, _default);
        }
    });

    // Login functions.
    if (testDataBase) {
        testDataBase.addEventListener("click", function () {
            // Display components.
            testDB();

        });
    }

    if (sign_upButton) {
        sign_upButton.addEventListener("click", function () {
            // Display components.
            titleText.innerHTML = "Cadastrar-se";
            closeButton.style.display = "flex";
            sign_upButton.style.display = "none";
            enterButton.innerHTML = "confirmar";
            var data = {
                message: 'test ' + toString(++counter)
            };
            snackbarContainer.MaterialSnackbar.showSnackbar(data);

        })
    }

    if (closeButton) {
        closeButton.addEventListener("click", function () {
            // Display components.
            sign_upButton.style.display = "inline-block";
            titleText.innerHTML = "Entrar";
            closeButton.style.display = "none";
            enterButton.innerHTML = "entrar";
            loginBox.style.display = "block";
            reportText.style.display = "none";
        })
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            logout();
            window.location.href = '/';
        })
    }

    if (backButton) {
        backButton.addEventListener("click", function () {
            logout();
            window.location.href = '/';
        })
    }

    if (enterButton) {
        enterButton.addEventListener("click", function () {
            if (closeButton) {
                if (closeButton.style.display === "flex") {
                    firebase.auth().createUserWithEmailAndPassword(emailText.value, passText.value).then(function () {
                        // Display components.
                        closeButton.style.display = "flex";
                        loginBox.style.display = "none";
                        reportText.style.display = "block";
                        console.log("Created account!");
                        // Handle errors.
                    }).catch(function (error) {
                        console.log("Got an: ", error);
                        snackbar(error);
                    });
                } else {
                    firebase.auth().signInWithEmailAndPassword(emailText.value, passText.value).then(function () {
                        // Handle errors.
                    }).catch(function (error) {
                        console.log("Got an: ", error);
                        snackbar(error);
                    });
                    signedout = false;
                }
            }
            if (document.URL === "https://seguroviagens.online/admin.html") {
                if (defaultInput.value === "") {
                    snackbar("O campo padrão não pode ficar vazio.");
                } else {
                    getAdminPromotions(insurerInput.value.toLowerCase(), promoInput.value, defaultInput.value);
                }
            }
        })
    }

    if (enterKey) {
        enterKey.addEventListener("keyup", function (e) {
            e.preventDefault();
            if (e.keyCode == 13) {
                enterButton.click();
            }
        });
    }

    // Home functions.
    if (accountButton) {
        accountButton.addEventListener("click", function () {
            emailText.value = email;
            usernameText.value = displayName;
            photoURLText.value = photoURL;
            profilePhoto.style.background = "url('" + photoURL + "')";
            // Display components.
            document.querySelector('.photo-dirty').classList.add('is-dirty');
            document.querySelector('.username-dirty').classList.add('is-dirty');
            document.querySelector('.email-dirty').classList.add('is-dirty');
        });
    }

    if (updateButton) {
        updateButton.addEventListener("click", function () {
            updateProfile(emailText.value, usernameText.value, photoURLText.value, passText.value, repassText.value);
        });
    }

    if (sendButton) {
        sendButton.addEventListener("click", function () {});
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            logout();
            signedout = true;
        });
    }

    if (insurerInput) {
        insurerInput.addEventListener("change", function () {
            if (document.URL === "https://seguroviagens.online/admin.html") {
                getClientPromotions(insurerInput.value.toLowerCase());
                let restoredSession = JSON.parse(localStorage.getItem('session'));
                let time = restoredSession[insurerInput.value.toLowerCase()][0]['time'];
                getTimer(time);
            }
        });
    }

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

    // General functions.
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

    function logout() {
        firebase.auth().signOut().then(function () {
            // Handle errors.
        }).catch(function (error) {
            console.log("Sign out error", error);
            snackbar(error);
        });
    }

    function updateProfile(_email, _displayName, _photoURL, _password, _re_password) {
        // Update displayName.
        if (_displayName != displayName && _displayName != null) {
            displayNameUpdate(_displayName);
        } else {
            snackbar("Try another username.");
        }

        // Update photoURL.
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

    function displayNameUpdate(_displayName, _photoURL) {
        // Update displayName .
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

    function photoURLUpdate(_photoURL) {
        // Update photoURL.
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

    function emailUpdate(_email) {
        // Update email.
        firebase.auth().updateEmail(_email).then(function () {
            // Handle errors.
            snackbar("Email updated.");
        }).catch(function (error) {
            console.log("Got an: ", error);
            snackbar(error);
        });
    }

    function passwordUpdate(_password) {
        // Update password.
        firebase.auth().updatePassword(_password).then(function () {
            // Handle errors.
            snackbar("Password updated.");
        }).catch(function (error) {
            console.log("Got an: ", error);
            snackbar(error);
        });
    }

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

    function getClientPromotions(_insurer) {
        dbClient.doc(_insurer).get().then(function (doc) {
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
        }).catch(function (error) {
            // Show errors.
            console.log("Got an: ", error);
        });
    }

    function getAdminPromotions(_insurer, _promo, _default) {
        dbAdmin.doc(_insurer).get().then(function (doc) {
            if (doc && doc.exists) {
                let myData = doc.data();
                links = new Array(myData[_promo], );
                changePromo(insurerInput.value.toLowerCase(), myData[_promo], timeInput.value, myData[_default]);
                snackbar("Mudanças feitas.");
            }
        }).catch(function (error) {
            // Show errors.
            console.log("Got an: ", error);
        });
    }

    getRealtimeUpdates = function () {
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

    function requestPromo() {
        document.querySelector("body").innerHTML = '\
        <a id="btn-back" onclick="requestBack()" class="section-btn btn btn-success">\
        <i class="fa fa-angle-left"></i></a>\
        <iframe frameborder="0 " style=" height: 100vh !important; width: 100vw !important; margin: 0; border: none; overflow: hidden;"\
        scrolling="no " src="' + links[1] + '" >< /iframe>\
        <script src="js/firebase.js "></script>';

    }

    function requestBack() {
        window.location.href = "/";
    }

}