// Profile Image
const profileInput = document.querySelector("#profile");
const profileImage = document.querySelector("#profile-image");
let profile = "";

profileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  console.log(file);

  if (!file) {
    profileImage.src = "/public/user-transparent.svg";
    return;
  }
  const reader = new FileReader();

  reader.onload = () => {
    profileImage.src = reader.result;
  };
  reader.readAsDataURL(file);
});

// User Name

const usernameInput = document.querySelector("#username");

// Frameworks

const frameworkLabels = document.querySelectorAll(".framework-label");

const resetBtns = () => {
  frameworkLabels.forEach((label) => {
    const forValue = label.getAttribute("for");
    label.classList.add("framework-label-unselected");
    label.classList.remove(`${forValue}-shadow`);
  });
};

frameworkLabels.forEach((label, i) => {
  label.addEventListener("click", () => {
    resetBtns();
    const forValue = label.getAttribute("for");
    label.classList.remove("framework-label-unselected");
    label.classList.add(`${forValue}-shadow`);
  });
});

// login

const login = (user) => {
  console.log(user);

  const userData = JSON.stringify(user);
  sessionStorage.setItem("user", userData);
  window.location.href = `/${user.framework}`;
};

const loginBtn = document.querySelector(".login-btn");
loginBtn.addEventListener("click", async () => {
  const username = usernameInput.value;
  if (username === "") {
    alert("fill name");
    return;
  }

  const frameworkRadio = document.querySelector(
    "input[name='framework']:checked"
  );
  if (!frameworkRadio) {
    alert("select framework");
    return;
  }
  const framework = frameworkRadio.id;

  const image = profileInput.files[0];

  // check user exist
  try {
    const response = await fetch(
      `/api/users/exist/?username=${username}&framework=${framework}`,
      {
        method: "get",
      }
    );
    if (response.status === 404) {
      console.log("user not exists");
    }

    if (response.ok) {
      console.log("user exists");

      const result = await response.json();
      login(result);
      return;
    }
  } catch (error) {
    console.log(error);
  }

  // add user
  if (image === undefined) {
    alert("select image");
    return;
  }

  const formData = new FormData();
  formData.append("profile", image);
  formData.append("username", username);
  formData.append("framework", framework);

  try {
    const response = await fetch("/api/users", {
      method: "post",
      body: formData,
    });

    if (!response.ok) {
      console.log("add user error");
    }

    const result = await response.json();
    login(result);
  } catch (error) {
    console.log(error);
  }
});
