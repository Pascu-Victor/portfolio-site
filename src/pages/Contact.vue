<template>
    <div class="contact-container">
        <h1 class="contact-title">Get In Touch</h1>
        <p class="contact-subtitle">Have a question or want to collaborate? I'd love to hear from you!</p>
        <div class="contact-info">
            <div class="info-links">
                <a href="mailto:victor@vpascu.ro" class="info-link">
                    <span class="material-icons">email</span>
                    victor@vpascu.ro
                </a>
                <a href="https://github.com/Pascu-Victor" target="_blank" rel="noopener noreferrer" class="info-link">
                    <span class="material-icons">link</span>
                    GitHub /Pascu-Victor
                </a>
            </div>
        </div>
        <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-group">
                <label for="name" class="form-label">Name</label>
                <input id="name" v-model="form.name" type="text" placeholder="Your name" class="form-input" required />
            </div>

            <div class="form-group">
                <label for="email" class="form-label">Email</label>
                <input id="email" v-model="form.email" type="email" placeholder="your.email@example.com"
                    class="form-input" required />
            </div>

            <div class="form-group">
                <label for="subject" class="form-label">Subject</label>
                <input id="subject" v-model="form.subject" type="text" placeholder="What's this about?"
                    class="form-input" required />
            </div>

            <div class="form-group">
                <label for="message" class="form-label">Message</label>
                <textarea id="message" v-model="form.message" placeholder="Tell me more..." class="form-textarea"
                    rows="6" required></textarea>
            </div>

            <button type="submit" class="submit-button">Send Message</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface ContactForm {
    name: string
    email: string
    subject: string
    message: string
}

const form = ref<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
})

const handleSubmit = () => {
    const { name, email, subject, message } = form.value

    // Create mailto link
    const mailtoLink = `mailto:victor@vpascu.ro?subject=${encodeURIComponent(
        `[Contact Form] ${subject} - from ${name}`
    )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`

    // Open default email client
    window.location.href = mailtoLink

    // Reset form
    form.value = {
        name: '',
        email: '',
        subject: '',
        message: '',
    }
}
</script>

<style scoped>
.contact-container {
    padding: clamp(1.5rem, 5vw, 4rem);
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    background: transparent;
    min-height: 100vh;
    box-sizing: border-box;
    justify-content: center;
    gap: clamp(1.5rem, 4vw, 2.5rem);
}

.contact-container::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    background: hsl(225, 100%, 28%);
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

.contact-title {
    font-size: clamp(2rem, 6vw, 3.5rem);
    font-weight: 700;
    margin: 0;
    background: linear-gradient(45deg, #FAA700 15%, #FFCA28 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    letter-spacing: -1px;
}

.contact-subtitle {
    font-size: clamp(0.95rem, 3vw, 1.1rem);
    color: rgba(255, 255, 255, 0.85);
    text-align: center;
    margin: 0;
    line-height: 1.6;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: clamp(1.25rem, 3vw, 1.75rem);
    background: rgba(26, 26, 26, 0.9);
    border: 1px solid rgba(102, 153, 255, 0.2);
    border-radius: 1rem;
    padding: clamp(1.5rem, 4vw, 2.5rem);
    box-shadow: 0 8px 32px rgba(102, 153, 255, 0.2);
    backdrop-filter: blur(10px);
}

.contact-form::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%);
    pointer-events: none;
    border-radius: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
}

.form-label {
    font-size: clamp(0.9rem, 2vw, 1rem);
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
    letter-spacing: 0.5px;
}

.form-input,
.form-textarea {
    padding: clamp(0.75rem, 2vw, 1rem);
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    color: white;
    font-size: clamp(0.9rem, 2vw, 1rem);
    font-family: inherit;
    transition: all 0.3s ease;
    outline: none;
}

.form-input::placeholder,
.form-textarea::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

.form-input:focus,
.form-textarea:focus {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(102, 153, 255, 0.6);
    box-shadow: 0 0 12px rgba(102, 153, 255, 0.3);
}

.form-textarea {
    resize: vertical;
    min-height: 150px;
}

.submit-button {
    padding: clamp(0.75rem, 2vw, 1.1rem) clamp(1.5rem, 4vw, 2rem);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 700;
    font-size: clamp(0.9rem, 2vw, 1.05rem);
    cursor: pointer;
    transition: all 0.3s ease;
    letter-spacing: 0.5px;
    box-shadow: 0 4px 16px rgba(102, 113, 234, 0.4);
    text-transform: uppercase;
}

.submit-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(102, 113, 234, 0.6);
}

.submit-button:active {
    transform: translateY(0);
    box-shadow: 0 4px 16px rgba(102, 113, 234, 0.4);
}

.contact-info {
    text-align: center;
    padding-top: clamp(1rem, 3vw, 2rem);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.contact-info h3 {
    font-size: clamp(1rem, 3vw, 1.25rem);
    color: rgba(255, 255, 255, 0.95);
    margin: 0 0 clamp(1rem, 2vw, 1.5rem) 0;
}

.info-links {
    display: flex;
    justify-content: center;
    gap: clamp(1rem, 3vw, 2rem);
    flex-wrap: wrap;
}

.info-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(102, 153, 255, 0.15);
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    border-radius: 0.5rem;
    border: 1px solid rgba(102, 153, 255, 0.3);
    transition: all 0.3s ease;
    font-weight: 600;
    font-size: clamp(0.85rem, 2vw, 0.95rem);
}

.info-link:hover {
    background: rgba(102, 153, 255, 0.25);
    border-color: rgba(102, 153, 255, 0.6);
    transform: translateY(-2px);
}

.info-link .material-icons {
    font-size: 1.1rem;
}

@media (max-width: 599px) {
    .contact-container {
        padding: clamp(1rem, 5vw, 1.5rem);
        gap: 1.5rem;
    }

    .contact-form {
        gap: 1rem;
        padding: 1.25rem;
    }
}
</style>
