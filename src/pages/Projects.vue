<template>
    <div class="projects-container">
        <h1 class="projects-title">Projects & Contributions</h1>
        <div class="masonry-grid">
            <div v-for="(item, index) in projects" :key="index" class="masonry-item"
                :class="{ 'is-featured': item.highlighted }">
                <div class="item-content">
                    <div class="item-header">
                        <span class="material-icons icon">{{ item.icon }}</span>
                        <h3>{{ item.title }}</h3>
                    </div>
                    <p class="item-description">{{ item.tagline }}</p>
                    <div class="item-highlights">
                        <ul>
                            <li v-for="(highlight, idx) in item.highlights" :key="idx">
                                {{ highlight }}
                            </li>
                        </ul>
                    </div>
                    <div class="item-link" v-if="item.link">
                        <a :href="item.link" target="_blank" rel="noopener noreferrer" class="link-button">
                            <span class="material-icons">open_in_new</span>
                            Visit Project
                        </a>
                    </div>
                    <div class="item-link" v-else>
                        <span class="link-placeholder">
                            <span class="material-icons">lock</span>
                            ADD LINK HERE
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Project {
    title: string
    tagline: string
    icon: string
    highlights: string[]
    link?: string
    highlighted?: boolean
}

const projects = ref<Project[]>([
    {
        title: 'wOS',
        tagline: 'High-Performance Multi-Processing OS from Scratch',
        icon: 'memory',
        highlights: [
            'Core Architecture: Custom OS inspired by UNIX-like systems with preemptive multitasking',
            'Virtual Memory Management: Full demand-paging support with efficient TLB handling',
            'File System: UNIX-like Virtual File System (VFS) with modular filesystem drivers',
            'Multi-Core Support: True multi-core CPU scheduling with load balancing',
            'Networking Stack: TCP/IP networking implementation with socket API',
            'Process Model: Highly parallelizable multi-processing architecture',
            'Development Status: Actively in development, running under QEMU emulation',
            'Build Status: Unstable build with production-ready component modules',
        ],
        link: 'https://github.com/Pascu-Victor/wos/tree/wos-llvm-main',
        highlighted: true,
    },
    {
        title: 'StockApp',
        tagline: 'Enterprise Stock Management and Bank Simulation Platform',
        icon: 'trending_up',
        highlights: [
            'Team Lead & Major Contributor on this project',
            'Full-featured stock trading simulation with buy/sell/borrow operations',
            'Currency trades and portfolio management',
            'Real-time market data streaming and analysis',
            'Credit and loan management system',
            'Role-Based Access Control (RBAC) for multi-user support',
            'Modern C# backend (ASP.NET Core) with robust REST API',
            'Dual frontend: WinUI3 (Desktop) and ASP.NET (Web)',
            'Production-grade architecture with real-time market data handling',
        ],
        'link': 'https://github.com/BankApp-Org/UBB-SE-2025-Banking',
        highlighted: true,
    },
    {
        title: 'DACIC-ZERO',
        tagline: 'Archaeological Artifact Management & 3D Reconstruction Platform',
        icon: 'history_edu',
        highlights: [
            'Web platform for archaeologists to upload and manage artifact findings',
            '3D scanning integration for lab technicians',
            'Automated artifact reconstruction presentation system',
            'Comprehensive artifact documentation and metadata storage',
            'Talks soon with archeologists to integrate further features',
        ],
        link: 'https://dacic-zero.ro',
    },
    {
        title: 'Path Tracer',
        tagline: 'Advanced Rendering Engine with Vulkan Backend',
        icon: 'light',
        highlights: [
            'C++ 23 support',
            'Vulkan-based path tracing implementation',
            'Volumetric rendering support for complex scene effects',
            'Advanced surface shader system for realistic material properties',
            'High-performance GPU acceleration for real-time and offline rendering',
        ],
        link: 'https://github.com/Pascu-Victor/path_tracer',
        highlighted: true,
    },
    {
        title: 'mlibc Port',
        tagline: 'C Standard Library Implementation for wOS',
        icon: 'code',
        highlights: [
            'Complete port of mlibc to wOS platform',
            'POSIX-compliant C library functions',
            'Optimized for wOS multi-processing architecture',
            'Full support for system calls and I/O operations',
        ],
        link: 'https://github.com/Pascu-Victor/mlibc',
    },
    {
        title: '3DView',
        tagline: 'Advanced 3D Artifact Analysis Software',
        icon: 'view_in_ar',
        highlights: [
            'Specialized 3D slicer for DACIC-ZERO models',
            'Slice visualization at multiple angles and depths',
            'Detailed artifact inspection and measurement tools',
            'Integration with DACIC-ZERO platform',
        ],
        link: 'https://github.com/Pascu-Victor/3dview',
    },
    {
        title: 'ToyLang',
        tagline: 'Interpreted Language with Full Runtime Environment',
        icon: 'terminal',
        highlights: [
            'Custom interpreted language written in Java',
            'Complete lexer with full-program execution',
            'Multi-threading with process forking and synchronization primitives',
            'String handling, file I/O, arithmetic and logical operations',
            'Curly-brace syntax with comprehensive built-in functions',
        ],
        'link': 'https://github.com/Pascu-Victor/toylang',
    },
    {
        title: 'Personal Portfolio',
        tagline: 'My Personal Website & Portfolio',
        icon: 'web',
        highlights: [
            'Vue.js 3 with TypeScript and Vue Router',
            'Responsive design with modern CSS techniques',
            'Showcase of projects, skills, and contact information',
        ],
        link: 'https://github.com/Pascu-Victor/portfolio-site',
    }
])

</script>

<style scoped>
.projects-container {
    padding: clamp(1.5rem, 5vw, 4rem);
    width: 100%;
    display: flex;
    flex-direction: column;
    background: transparent;
    min-height: 100vh;
    box-sizing: border-box;
    overflow-x: hidden;
}

.projects-container::before {
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

.projects-title {
    font-size: clamp(1.75rem, 5vw, 3rem);
    font-weight: 700;
    margin: 0 0 clamp(1.5rem, 4vw, 3rem) 0;
    background: linear-gradient(45deg, #FAA700 15%, #FFCA28 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    letter-spacing: -1px;
}

.masonry-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: clamp(1.25rem, 3vw, 1.75rem);
    flex: 1;
    width: 100%;
    box-sizing: border-box;
}

/* Large desktop - 4 columns */
@media (min-width: 1600px) {
    .masonry-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

/* Desktop - 3 columns */
@media (min-width: 1200px) and (max-width: 1599px) {
    .masonry-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Wider tablet/smaller desktop - 2 columns */
@media (min-width: 768px) and (max-width: 1199px) {
    .masonry-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: clamp(1.25rem, 4vw, 2rem);
    }
}

/* Tablet - responsive */
@media (min-width: 600px) and (max-width: 767px) {
    .masonry-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
}

/* Mobile - single column */
@media (max-width: 599px) {
    .projects-container {
        padding: clamp(1rem, 5vw, 1.5rem);
    }

    .projects-title {
        margin-bottom: clamp(1rem, 3vw, 1.5rem);
    }

    .masonry-grid {
        grid-template-columns: 1fr;
        gap: 1.25rem;
    }
}

.masonry-item {
    background: #1a1a1a;
    border-radius: 1rem;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 8px 32px rgba(102, 153, 255, 0.4);
    border: 1px solid rgba(102, 153, 255, 0.2);
    position: relative;
    min-height: clamp(250px, 60vh, 280px);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
}

.masonry-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%);
    pointer-events: none;
}

.masonry-item.is-featured {
    background: #222222;
    box-shadow: 0 12px 48px hsl(225, 100%, 28%, 0.6);
    border: 2px solid rgba(255, 202, 40, 0.5);
}

.masonry-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(102, 153, 255, 0.55);
}

.masonry-item.is-featured:hover {
    box-shadow: 0 20px 56px hsl(225, 100%, 28%, 0.75);
}

.item-content {
    padding: clamp(1.25rem, 3vw, 1.75rem);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    gap: clamp(0.6rem, 2vw, 0.85rem);
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    overflow: hidden;
}

.item-header {
    display: flex;
    align-items: flex-start;
    gap: clamp(0.6rem, 2vw, 0.9rem);
    margin-bottom: 0.1rem;
}

.icon {
    font-size: clamp(1.8rem, 4vw, 2.2rem);
    color: rgba(255, 255, 255, 0.95);
    flex-shrink: 0;
    margin-top: 0.1rem;
}

.item-content h3 {
    margin: 0;
    font-size: clamp(1.25rem, 3vw, 1.5rem);
    font-weight: 700;
    letter-spacing: -0.3px;
    flex: 1;
    line-height: 1.2;
}

.item-description {
    margin: 0.4rem 0 0 0;
    font-size: clamp(0.8rem, 2vw, 0.95rem);
    opacity: 0.95;
    font-weight: 500;
    line-height: 1.4;
}

.item-highlights {
    flex: 1;
    margin: 0.4rem 0;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
}

.item-highlights ul {
    margin: 0.6rem 0 0 0;
    padding-left: clamp(1rem, 2vw, 1.3rem);
    list-style: disc;
    display: flex;
    flex-direction: column;
    gap: clamp(0.3rem, 1vw, 0.45rem);
}

.item-highlights li {
    font-size: clamp(0.75rem, 1.5vw, 0.88rem);
    opacity: 0.92;
    line-height: 1.4;
    letter-spacing: 0.15px;
}

.item-link {
    display: flex;
    justify-content: center;
    margin-top: auto;
    padding-top: clamp(0.6rem, 2vw, 0.9rem);
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    flex-shrink: 0;
}

.link-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: clamp(0.5rem, 1vw, 0.65rem) clamp(1rem, 2vw, 1.4rem);
    background: rgba(255, 255, 255, 0.15);
    color: white;
    text-decoration: none;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: clamp(0.75rem, 1.5vw, 0.85rem);
    transition: all 0.2s ease;
    border: 1px solid rgba(255, 255, 255, 0.3);
    white-space: nowrap;
    min-width: min-content;
}

.link-button:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.05);
}

.link-button .material-icons {
    font-size: clamp(0.8rem, 1.5vw, 0.95rem);
}

.link-placeholder {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: clamp(0.5rem, 1vw, 0.65rem) clamp(1rem, 2vw, 1.4rem);
    background: rgba(0, 0, 0, 0.2);
    color: rgba(255, 255, 255, 0.65);
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: clamp(0.75rem, 1.5vw, 0.85rem);
    border: 1px dashed rgba(255, 255, 255, 0.3);
    white-space: nowrap;
}

.link-placeholder .material-icons {
    font-size: clamp(0.8rem, 1.5vw, 0.95rem);
}
</style>