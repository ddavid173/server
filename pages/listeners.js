document.querySelector("h1").onmouseover = decodeText
document.querySelector("h1").onload = decodeText()

function createCookie() {
    fetch(
        window.location.origin + "/create-session",
        {
            method: "POST",
        }).then((response) => {
            return response.json()
        }).then((data) => {
            setCookie("session_id", data.id)
        }).catch((error) => {
            console.log(error)
        })
}

if (getCookie("session_id")) {
    fetch(
        window.location.origin + "/session",
        {
            method: "GET",
            headers: {
                "id": getCookie("session_id")
            }
        }).then((response) => {
            if (response.status === 409) {
                deleteCookie("session_id")
                createCookie()
            } else if (response.status !== 200) {
                throw response.status
            }
        }).catch((error) => {
            console.log(error)
        })

} else {
    createCookie()
}

const animatedScreens = document.querySelectorAll(".screen-image")
const animationAverage = 25
const keyframes = ['pan-image1', 'pan-image2', 'pan-image3']
let imgs = ['https://i.imgur.com/V1q2eIC.jpeg', 'https://i.imgur.com/kEx9EhD.png', 'https://i.imgur.com/OBy1ekN.jpeg']

animatedScreens.forEach((screen) => {
    screen.style.animationDuration = Math.floor((Math.random() - 0.5) * 10) + animationAverage + "s"
    screen.style.animationName = keyframes[Math.floor(Math.random() * keyframes.length)]
    screen.style.backgroundImage = "url(" + imgs[Math.floor(Math.random() * imgs.length)] + ")"
})

const popup = document.querySelector(".popup")

const openPopup = () => {
    popup.showModal()
}

const closePopup = () => {
    popup.close()
}

const downArrow = document.querySelector("button.downToContent")

downArrow.addEventListener("click", () => {
    console.log("clicked")
    downArrow.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" })
})