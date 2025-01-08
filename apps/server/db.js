const router = require("express").Router();

const { getFirestore } = require("firebase-admin/firestore");
const db = getFirestore();
const upload = require("./multer");

// user
const getUsers = async (req, res, next) => {
  const { userList } = req.body;

  const userRef = db.collection("users");
  const snapshot = await userRef.where("id", "in", userList).get();

  const docList = [];
  snapshot.forEach((doc) => {
    docList.push({ ...doc.data(), id: doc.id });
  });

  res.status(200).json(docList);
};
const checkUser = async (req, res, next) => {
  const { username, framework } = req.query;

  const userRef = db.collection("users");
  const snapshot = await userRef
    .where("username", "==", username)
    .where("framework", "==", framework)
    .limit(1)
    .get();

  if (snapshot.empty) {
    console.log("user not exist");
    res.sendStatus(404);
  } else {
    console.log("user exist");
    const doc = snapshot.docs[0];
    console.log(doc.data());
    res.status(200).json({ ...doc.data(), id: doc.id });
  }
};
const addUser = async (req, res, next) => {
  if (!req.file) {
    next("upload error");
  }
  console.log(req.file.filename);

  const { username, framework } = req.body;
  const newUser = {
    username,
    framework,
    profile: `/public/uploads/${req.file.filename}`,
  };

  try {
    const result = await db.collection("users").add(newUser);

    const userData = {
      ...newUser,
      id: result.id,
    };

    console.log(userData);
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

// contents
const getContents = async (req, res, next) => {
  console.log("######################");
  try {
    const contentsRef = db.collection("contents");
    const userRef = db.collection("users");
    const snapshot = await contentsRef.orderBy("date", "asc").get();

    if (snapshot.empty) {
      console.log("contents Not found");
      return res.status(404).send("Not found");
    }

    const docList = [];
    snapshot.forEach((doc) => {
      docList.push({ ...doc.data(), id: doc.id });
    });

    console.log(docList);

    const userPromises = docList.map(async (content) => {
      const userSnap = await userRef.doc(content.userID).get();
      if (!userSnap.empty) {
        const user = userSnap.data();
        return {
          ...content,
          date: content.date.toDate(),
          username: user.username,
          framework: user.framework,
          profile: user.profile,
        };
      }
      return content;
    });

    const result = await Promise.all(userPromises);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
const getContent = async (req, res, next) => {
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
  const { contentID } = req.params;
  console.log(contentID);

  const contentsRef = db.collection("contents");
  const userRef = db.collection("users");

  const doc = await contentsRef.doc(contentID).get();

  if (!doc.exists) {
    console.log("contents Not found");
    return res.status(404).json("Not found");
  }

  const content = doc.data();

  const userDoc = await userRef.doc(content.userID).get();
  if (!userDoc.exists) {
    console.log("user Not found");
    return res.status(404).json("Not found");
  }
  const user = userDoc.data();

  const temp = {
    ...content,
    date: content.date.toDate(),
    username: user.username,
    framework: user.framework,
    profile: user.profile,
  };

  console.log(temp);
  res.status(200).json({ ...temp, id: doc.id });
};
const addContent = async (req, res, next) => {
  console.log(req.body);
  // userID, title, content + date
  const newContent = { ...req.body, date: new Date() };

  try {
    const result = await db.collection("contents").add(newContent);
    res.status(200).json(result.id);
  } catch (error) {
    next(error);
  }
};

// comments
const getComments = async (req, res, next) => {
  const { contentID } = req.query;

  const commentsRef = db.collection("comments");
  const userRef = db.collection("users");
  const snapshot = await commentsRef
    .where("contentID", "==", contentID)
    .orderBy("date", "asc")
    .get();

  if (snapshot.empty) {
    console.log("comments Not found");
    return res.status(404).json("Not found");
  }

  const docList = [];
  snapshot.forEach((doc) => {
    const temp = doc.data();
    temp.date = temp.date.toDate();
    docList.push({ ...temp, id: doc.id });
  });

  console.log("docList", docList);

  const userPromises = docList.map(async (comment) => {
    const userDoc = await userRef.doc(comment.userID).get();

    if (userDoc.exists) {
      const user = userDoc.data();
      return {
        ...comment,
        username: user.username,
        framework: user.framework,
        profile: user.profile,
      };
    }
    return comment;
  });

  const result = await Promise.all(userPromises);

  console.log(result);
  res.status(200).json(result);
};
const addComment = async (req, res, next) => {
  // userID, contentID, comment + date
  const newComment = { ...req.body, date: new Date() };

  try {
    const result = await db.collection("comments").add(newComment);
    res.status(200).json(result.id);
  } catch (error) {
    next(error);
  }
};

router.post("/users", upload.single("profile"), addUser);
router.get("/users/exist", checkUser);
router.post("/users", getUsers);

router.post("/contents", addContent);
router.get("/contents/:contentID", getContent);
router.get("/contents", getContents);

router.post("/comments", addComment);
router.get("/comments", getComments);

module.exports = router;
