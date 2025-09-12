<template>
  <main>
  <transition :name="backgroundAnimName">
    <div class="main" v-show="okEnter">
      <NuxtLink v-for="locale in otherLocales" 
      :to="switchLocalePath(locale.code)" 
      :key="locale.code"
      class="language-selector__wrapper text-yellow-600">
        <div class="language-selector">{{ locale.name }}</div>
      </NuxtLink>
      <h1 class="mt-26">
        <span class="text-yellow">Welcome</span> <span class="inline-block hover:scale-[1.4] hover:translate-10 transition-[transform]">{{ $t("k9gb") }} {{ $t("member") }}!</span>
      </h1>
      <div class="content">
        <div class="spacer"></div>
        <nuxt-link class="text-[#dbbc7b] hover:scale-[1.4] transition-[transform] cursor-pointer" @click.preventDefault="onAboutLinkClick">About</nuxt-link>
      </div>
    </div>
  </transition>
  </main>
</template>

<script setup lang="ts">

definePageMeta({ 
  layout: "индекс"
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
  
  h1 {
    transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s 1s;
    transform: scale(0.5);
  
  }
  
  &.delay-animation {
    transform: scale(1.0) rotateY(360deg);
    
    h1 {
      transform: scale(1.0);
    }
  }
}

.content {
  display: grid;
  grid-template-rows: 40vh 100%;
  grid-template-columns: 100%;
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