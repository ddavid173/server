const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

let decodeText = () => {
  let iteration = 0;
  const target = document.querySelector("h1");
  clearInterval(interval);

  interval = setInterval(() => {
    target.innerText = target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return target.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= target.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 30);
};

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
}

function setCookie(cname, cvalue, exdays = 7) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie =
    cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None;Secure";
}

function deleteCookie(cname) {
  document.cookie =
    cname +
    "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;SameSite=None;Secure";
}
