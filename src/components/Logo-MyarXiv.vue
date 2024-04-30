<template>
<svg viewBox="0 0 600 200">
    <text x="0" y="70%"> MyArXiv </text>
</svg> 
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Bangers&family=Homemade+Apple&family=Sacramento&display=swap");

svg {
    width: 25rem;
    height: 10rem;
    margin: auto;
}

svg text {
    text-transform: uppercase;
    animation: stroke 3s infinite alternate;
    letter-spacing: 1rem;
    font-size: 10rem;
    font-family: "Bangers", cursive;
}
@keyframes stroke {
    0% {
        fill: rgba(72, 138, 20, 0);
        stroke: rgba(54, 95, 160, 1);
        stroke-dashoffset: 25%;
        stroke-dasharray: 0 50%;
        stroke-width: 0.2;
    }
    50% {
        fill: rgba(72, 138, 20, 0);
        stroke: rgba(54, 95, 160, 1);
        stroke-width: 0.5;
    }
    70% {
        fill: rgba(72, 138, 20, 0);
        stroke: rgba(54, 95, 160, 1);
        stroke-width: 1;
    }
    90%,
    100% {
        fill: rgba(72, 138, 204, 1);
        stroke: rgba(54, 95, 160, 0);
        stroke-dashoffset: -25%;
        stroke-dasharray: 50% 0;
        stroke-width: 0;
    }
}


</style>