<template>
  <main>
  <transition :name="backgroundAnimName">
    <div class="main" v-show="okEnter">
      <NuxtLink v-for="(locale, n) in otherLocales" 
      :to="switchLocalePath(locale.code)" 
      :key="locale.code"
      class="language-selector__wrapper text-yellow-600">
        <div class="language-selector" :data-anim-order="n">{{ locale.name }}</div>
      </NuxtLink>
      <h1 class="heading-welcome mt-26">
        <span class="text-yellow">Welcome</span> <span class="member-text inline-block hover:scale-[1.4] hover:translate-10" ref="memberTextEl">{{ $t("k9gb") }} {{ $t("member") }}!</span>
      </h1>
      <div class="content">
        <div class="spacer"></div>
        <nuxt-link class="about-link text-[#dbbc7b] hover:scale-[1.4] transition-[transform] cursor-pointer" @click.preventDefault="onAboutLinkClick">About</nuxt-link>
      </div>
    </div>
  </transition>
  </main>
</template>

<script setup lang="ts">
const mainEl = ref<HTMLElement>();

definePageMeta({ 
  layout: "индекс",
  pageTransition: {
    onAfterEnter: () => {
      const mainEl = document.querySelector('.main');
      lessCSSClass(mainEl!, 'delay-animation')
      setTimeout( () => {
        addCSSClass('.heading-welcome', 'slide-from-right');
        addCSSClass(mainEl!, 'delay-animation');

        setTimeout( () => {
          lessCSSClass('.heading-welcome', 'slide-from-right');
        }, 1600);
      }, 100);
    }
  }
});

useHead({
  link: [{ rel: 'icon', type: 'image/svg',
    href: getSrc('/assets/favicon.svg')
  }]
});

const { locale, locales, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();

const otherLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
});



const backgroundAnimName = ref('');
const okEnter = ref(true);

const onAboutLinkClick = async () => {
  backgroundAnimName.value = 'zoom';
  
  okEnter.value = false;
  setTimeout( () => { okEnter.value = true}, 200);
  
  await sleep(750);
  useRouter().push(localePath('/about'));
  
  backgroundAnimName.value = '';
}

onMounted(() => {
  document.querySelector('.main')?.classList.add('delay-animation');

  const languages = document.querySelectorAll('.language-selector');

  languages.forEach( (lang) => {
  
    (lang as HTMLElement).style.transitionProperty = 'transform, opacity';
    (lang as HTMLElement).style.transitionDelay = `${Number.parseInt(lang.attributes.getNamedItem('data-anim-order')?.textContent || "0") * 500 + 1500}ms`;

    setTimeout(() => {
      (lang as HTMLElement).style.transitionDelay = `unset`;
    }, 2000);
  

  });
});

</script>

<style lang="less" scoped>

main {
  background-color: black;
}

.zoom-enter-to > h1 {
  position: absolute;
}

.main {
  background-image: url('~/assets/images/who-dares-wins.jpg');
  background-size: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #000;
  height: 100vh;
  
  color: white;
  font-size: 32px;
  
  display: flex;
  align-items:  center;
  
  flex-direction: column;
  
  transform: scale(2.0) rotateY(180deg);
  transition: transform ease 1s;

  overflow-y: clip;
  
    
  h1 {
    transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s 1s, opacity ease 700ms;
    transform: scale(0.5);
    opacity: 0.1;
  
  }
  
  .heading-welcome {
    &.slide-from-right {
      transform: translateX(100%);
    }
  }
  
  &.delay-animation {
    transform: scale(1.0) rotateY(360deg);
    
    h1 {
      transform: scale(1.0);
      
      opacity: 1.0;
    }
    
    .language-selector {
      --t-scale: 1.0;
      transform: translate3d(0, 0, 0) scale(var(--t-scale));
      
      &:hover {
        --t-scale: 1.2;
        transition-delay: 0ms !important;
      }
      
      opacity: 1;
    }

    .member-text {
      transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s, color cubic-bezier(0.165, 0.84, 0.44, 1) 2s 1.7s;
      color: #ffad00;
    }
  }

  .language-selector {
    transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s 1s, opacity ease 1s 2.5s;
    
    transform: translateX(50%) translateY(-100%);
    
    opacity: 0;
    
    --un-text-shadow: 0 1px 2px var(--un-text-shadow-color, rgb(30 29 39 / 0.19)),
    1px 2px 4px var(--un-text-shadow-color, rgb(54 64 147 / 0.18));
    --un-text-light: 0 1px 2px var(--un-text-light-color, #880000),
    1px 2px 4px var(--un-text-light-color, #000000);
  text-shadow: var(--un-text-shadow), var(--un-text-light);
  }

  .member-text {
    color: white;
    
    --un-text-shadow: 0 1px 2px var(--un-text-shadow-color, rgb(30 29 39 / 0.19)),
    1px 2px 4px var(--un-text-shadow-color, rgb(54 64 147 / 0.18));
    --un-text-light: 0 1px 2px var(--un-text-light-color, #880000),
    1px 2px 4px var(--un-text-light-color, #000000);
  text-shadow: var(--un-text-shadow), var(--un-text-light);
  }

  .about-link {
    @media (max-height: 416px) {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}

.content {
  display: grid;
  grid-template-rows: 0vh 100%;
  grid-template-columns: 100%;
  
  @media (min-height: 416px) {
    grid-template-rows: 20vh 100%;
  }
  @media (min-height: 493px) {
    grid-template-rows: 30vh 100%;
  }
  @media (min-height: 575px) {
    grid-template-rows: 40vh 100%;
  }
}

.zoom-enter-active,
.zoom-leave-active {
  transition: transform 500ms cubic-bezier(0.075, 0.82, 0.165, 1), opacity 700ms ease;
}

.zoom-enter-to {
  transform: rotate(0) scale(1.4) !important;
  opacity: 0;
}
</style>