/** @type {import('tailwindcss').Config} */
/* TODO: fix paths and tailwind with uno */

function withOpacity(variable: string) {
  return function({ opacityValue }) {
    if (opacityValue !== null) {
      return `rgba(var(${variable}), ${opacityValue})`
    }
    return `rgb(${variable})`

  }
}

export default {
  content: [
    "./src/content/**/*.md",
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./src/app.vue",
    "./src/error.vue",
  ],
  theme: {
    extend: {
      textColor: {
        skin: {
          base: withOpacity('--color-text-base'),
          'work-tech-highlights': withOpacity('--color-work-tech-highlights')
        }
      },
      backgroundColor: {
        skin: {
          fill: withOpacity('--color-fill'),
          'work-timeline-title-fill': 
            'var(--color-work-timeline-title-fill)',
          'work-timeline-content-text-fill': 
            withOpacity('--color-work-timeline-content-text-fill'),
          'work-section-right-fill': 
            'var(--color-work-section-right-fill)',
          'work-current-job-fill': 
            'rgba(var(--color-work-current-job-position-fill))',
          'work-completed-job-position-fill': 
            'rgba(var(--color-work-completed-job-position-fill))',
          'education-timeline-heading-fill': 
            'rgba(var(--color-education-timeline-heading-fill))',
          'education-coursework-information-heading-fill': 
            'rgba(var(--color-education-coursework-information-heading-fill))'
        }
      },
      
    },
  },
  plugins: [],
  darkMode: 'class'
}
