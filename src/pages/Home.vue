<template>
    <div class="home-container">
        <section class="hero">
            <h1>Hi!
                <Wave class="wave" />
            </h1>
            <h2>I'm Victor Pascu</h2>
            <div class="cta-buttons">
                <RouterLink to="/projects" class="btn btn-primary">Projects</RouterLink>
                <RouterLink to="/contact" class="btn btn-secondary">Contact</RouterLink>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Wave from '../assets/wave.svg';
</script>

<style scoped>
.home-container::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100vh;
    background: #191919;
    backdrop-filter: none;
    background-attachment: fixed;
}

.home-container::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100vh;
    background: var(--secondary-color);
    backdrop-filter: none;
    background-attachment: fixed;
    -webkit-mask-image:
        linear-gradient(90deg, black 1px, transparent 1px),
        linear-gradient(0deg, black 1px, transparent 1px);
    -webkit-mask-size: 8em 8em;
    -webkit-mask-position: 4em 0, 0 0;
    mask-image:
        linear-gradient(90deg, black 1px, transparent 1px),
        linear-gradient(0deg, black 1px, transparent 1px);
    mask-size: 8em 8em;
    mask-position: 4em 0, 0 0;
}

.home-container {
    --secondary-color: hsl(225, 100%, 28%);
    --secondary-transparent: hsla(225, 100%, 28%, 0.2);
    width: fit-content;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.hero {

    text-align: center;
    animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

h1 {
    font-size: 4rem;
    font-weight: 800;
    margin: 0 0 1rem 0;
    background: linear-gradient(45deg, #FAA700 15%, #FFCA28 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

h2 {
    font-size: 2.5rem;
    color: #e0e0e0;
    margin: 0 0 2rem 0;
    font-weight: 600;
}

p {
    font-size: 1.2rem;
    color: #b0b0b0;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.cta-buttons {
    background: #8f8f8f4d;
    padding: 2em;
    backdrop-filter: blur(4px);
    border-radius: 8px;
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 2rem;
}

.btn {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    cursor: pointer;
    display: inline-block;
}

.btn-primary {
    backdrop-filter: saturate(1) brightness(1);
    background: var(--secondary-transparent);
    color: white;
    border: 1px solid var(--secondary-color);
    box-shadow: 0 1px 3px var(--secondary-color);
}

@keyframes shadowWave {
    0% {
        box-shadow: 0 3px 3px var(--secondary-color);
    }

    50% {
        box-shadow: 0 3px 12px transparent;
    }

    100% {
        box-shadow: 0 3px 3px var(--secondary-color);
    }
}

.btn-primary:hover {
    backdrop-filter: saturate(1.2) brightness(1.2);
    transform: translateY(-2px);
    animation: shadowWave 1.5s ease-in-out infinite;
}

.btn-secondary {
    background: transparent;
    color: white;
    border: 1px solid var(--secondary-color);
    box-shadow: 0 1px 3px var(--secondary-color);
}

.btn-secondary:hover {
    transform: translateY(-2px);
    background: #ffffff15;
    animation: shadowWave 1.5s ease-in-out infinite;
}

@keyframes wave-anim {
    0% {
        transform: rotate(0deg);
    }

    15% {
        transform: rotate(14deg);
    }

    30% {
        transform: rotate(0deg);
    }

    45% {
        transform: rotate(14deg);
    }

    60% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(0deg);
    }
}

h1 {
    font-size: 8em;
}


.wave {
    display: inline-block;
    transform-origin: 70% 70%;
    animation: wave-anim 2.5s infinite;
    width: 1em;
    height: 1em;
}

@media (max-width: 768px) {
    .home-container {
        min-height: calc(100vh - 120px);
    }

    h1 {
        font-size: 3rem;
    }

    h2 {
        font-size: 2rem;
    }

    p {
        font-size: 1rem;
    }

    .cta-buttons {
        gap: 1rem;
    }

    .btn {
        padding: 0.8rem 2rem;
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    h1 {
        font-size: 2.5rem;
    }

    h2 {
        font-size: 1.5rem;
    }

    .cta-buttons {
        flex-direction: column;
    }

    .btn {
        width: 100%;
    }
}
</style>
