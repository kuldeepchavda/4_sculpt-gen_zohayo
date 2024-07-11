const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");
const auth = getAuth();



exports.signUpFunction = async (req, res) => {
  const { email, password } = req.body;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const tokenResponse = userCredential._tokenResponse;
      const { idToken, refreshToken, expiresIn, localId, email } =
        tokenResponse;
      res.status(200).send({
        message: "Sign Up successful",
        user: {
          uid: user.uid,
          email: email,
          idToken: idToken,
          refreshToken: refreshToken,
          expiresIn: expiresIn,
          localId: localId,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.loginFunction = async (req, res) => {
  const { email, password } = req.body;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const tokenResponse = userCredential._tokenResponse;
      const { idToken, refreshToken, expiresIn, localId, email } =
        tokenResponse;

      res.status(200).send({
        message: "Login successful",
        user: {
          uid: user.uid,
          email: email,
          idToken: idToken,
          refreshToken: refreshToken,
          expiresIn: expiresIn,
          localId: localId,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
