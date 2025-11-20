function easeOutCubic(t) {
    return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function animateValue(element, start, end, duration) {
    let startTime = null;

    function animationStep(timestamp) {
        if (!startTime) startTime = timestamp;

        const progress = Math.min((timestamp - startTime) / duration, 1);

        const easedProgress = easeOutCubic(progress);

        const value = start + (end - start) * easedProgress;

        if (end === 3.4) {
            element.textContent = value.toFixed(1).replace('.', ',');
        } else {
            element.textContent = Math.floor(value);
        }

        if (progress < 1) {
            requestAnimationFrame(animationStep);
        }
    }

    requestAnimationFrame(animationStep);
}


function isInViewport(elem) {
    const rect = elem.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

const trigger = document.querySelector(".anim_characteristics_checked_start");

const odo1 = document.getElementById("odo1"); // 3,4
const odo2 = document.getElementById("odo2"); // 375
const odo3 = document.getElementById("odo3"); // 510
const odo4 = document.getElementById("odo4"); // 311

let animated = false;

window.addEventListener("scroll", () => {
    if (!animated && isInViewport(trigger)) {
        animated = true;

        animateValue(odo1, 0, 3.4, 2600);
        animateValue(odo2, 0, 375, 2600);
        animateValue(odo3, 0, 510, 2600);
        animateValue(odo4, 0, 311, 2600);
    }
});




//

let i = 1;
for (let li of carousel.querySelectorAll("li")) {
  li.style.position = "relative";
  li.insertAdjacentHTML(
    "beforeend",
    `<span style="position:absolute;left:0;top:0">${i}</span>`
  );
  i++;
}

let width = 465; // ширина картинки
let count = 1; // видимое количество изображений

let list = carousel.querySelector("ul");
let listElems = carousel.querySelectorAll("li");

let position = 0; // положение ленты прокрутки

carousel.querySelector(".prev").onclick = function () {
  // сдвиг влево
  position += width * count;
  // последнее передвижение влево может быть не на 3, а на 2 или 1 элемент
  position = Math.min(position, 0);
  list.style.marginLeft = position + "px";
};

carousel.querySelector(".next").onclick = function () {
  // сдвиг вправо
  position -= width * count;
  // последнее передвижение вправо может быть не на 3, а на 2 или 1 элемент
  position = Math.max(position, -width * (listElems.length - count));
  list.style.marginLeft = position + "px";
};
