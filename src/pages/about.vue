<template>
  <div class="main">
    <div class="top-filler"></div>
    <img class="logo absolute top-0 left-0 aspect-[81/23] w-[40vw] md:w-[24vw] bg-[#333] ml-4 p-2 rounded-2xl opacity-80 hover:opacity-95 " src="~/assets/images/mczvc-web-services.svg">
    <div class="heading-horizontal">
    
      <div class="registry-card mx-auto mr-0 sm:ml-[26%] md:w-[98%] max-w-[333px] lg:max-w-[399px] border border-solid border-[rgb(238_172_8)] overflow-x-clip">
        
        <div class="title-text text-3xl md:text-4xl bg-[rgb(0,30,57)] hover:bg-[rgb(0_63_57)] py-2 px-4 flex-basis-[31rem] font-gotham">
          <div class="title-text-span">
            <span class="text-blue">{{ $t("k9gb")[0] }}</span><span class="text-yellow">{{ $t("k9gb")[1] }}</span><span class="text-purple">{{ $t("k9gb")[2] }}</span><span class="text-blue">{{ $t("k9gb")[3] }}</span>
            <span class="text-[#cd9406]"> ({{ $t("k9gb-full") }})</span>
          </div>
        </div>
        
        <div class="registry-details text-sm sm:text-2xl flex-wrap md:text-4xl flex flex-basis-[100%] items-center bg-[#b37f00]">
          <span class="founder-text text-2xl md:text-4xl bg-[#cd9406] text-white font-bold p-2 mb-[-13px] sm:mb-[-16px] md:mb-[-15px] flex-grow-1 font-merriweather">Founder</span>
          <div class="founder-name bg-black margin-auto py-4 px-2 flex-basis-[100%] sm:flex-basis-[66%] flex justify-center rounded-[64px]">
            <span class="founder-name-text font-droid-serif bg-black text-white text-center">{{ $t("mczvc-full") }}</span>
          </div>
          
          <span class="founded-text flex-grow-1 sm:flex-basis-[100%] py-2 px-3 bg-blue-900 text-blue-200 rounded-[64px] font-droid-serif-bold">
            {{ $t("founded-on")}}: 
          </span>
          <span class="founding-date-text inline-block hover:!translate-x-10 hover:!transition-delay-0 bg-[#eeac08] py-2 px-4 rounded-64px ml-[-30px] sm:ml-0 font-droid-serif">{{ $t("founding-date") }}</span>
        </div>
      </div>

      <div class="anbu-strip blur-1 hover:blur-0">

      </div>
    </div>

    <img class="pointer-events-none" src="~/assets/images/mczvc-founder.png">
    <div>
      <img class="pointer-events-none" src="~/assets/images/Youmeka.png">
    </div>

  </div>
</template>

<script setup lang="ts">

definePageMeta({ layout: "about",
});

const { locale, locales, t } = useI18n();

let titleMarqueeOffset = 0;

onMounted( () => {
  
  const titleAnimatePending = ref(false);
  const titleText = ref('');
  
  const founderName = document.querySelector('.founder-name-text');
  const founderNameText = founderName!.textContent;
  
  const dateAnimatePending = ref(false);
  const dateText = ref('');
  
  const foundingDate = document.querySelector('.founding-date-text')!;
  const foundingDateText = foundingDate.textContent;
  
  animateTypewriting(founderNameText, titleAnimatePending, founderName as HTMLElement, titleText, 9, true, 120, 3700 );
  
  animateTypewriting(foundingDateText, dateAnimatePending, foundingDate as HTMLElement, dateText, 8, true, 120, 4700);
  
 
  setTimeout(() => {
    
    document.querySelector('.heading-horizontal')?.classList.add('delay-animation');
    
    const titleTextEl = document.querySelector('.title-text-span')!;
    
    const value = (titleTextEl as HTMLElement).style.transition;
    
    setTimeout( () => {
      setInterval( () => {
        titleMarqueeOffset -= 8;
        if (titleMarqueeOffset < -titleTextEl.getBoundingClientRect().width + 80) {
          console.log('hello');
          (titleTextEl as HTMLElement).style.transition = 'unset';
          titleMarqueeOffset = titleTextEl.getBoundingClientRect().width + 50;
          setTimeout( () => {
            (titleTextEl as HTMLElement).style.transition = value;
          }, 150);
        }
        (titleTextEl as HTMLElement).style.transform = `translateX(${titleMarqueeOffset}px)`;
      }, 100);

      (foundingDate as HTMLElement).style.transitionDelay = `0ms`;

    
    }, 1000);
  }, 1000);
});
</script>

<style lang="less" scoped>
.main {
  background-image: url('');
  background-size: cover;
  background-color: #cd9406;
  
  height: 100%;

  .top-filler {
  background-image: url('~/assets/images/Anbu-strip-horizontal.png');
  background-size: contain;
  background-repeat: no-repeat;
  aspect-ratio: 3200 / 363;
  }

  .logo {
    transition: opacity cubic-bezier(0.075, 0.82, 0.165, 1) 1s, border-radius cubic-bezier(0.075, 0.82, 0.165, 1) 1s;

    &:hover {
      border-radius: 0;
    }
  }

  .registry-card {
    --un-shadow: var(--un-shadow-inset) 0 1px 4px 3px var(--un-shadow-color, rgb(0 0 0 / 0.1)),var(--un-shadow-inset) 0 -8px 1px 2px var(--un-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--un-ring-offset-shadow), var(--un-ring-shadow), var(--un-shadow);
  }
}

.heading-horizontal {  
  display: flex;
  
  transform: rotateX(39deg) scale(0);
  transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
  height: 0;
  
  &.delay-animation {
    transform: rotateX(0deg) scale(1);
    height: unset;

    .registry-details {
      opacity: 1;
    }
    
    .title-text {
      opacity: 1;
      transform: translateX(0);
    }

    .title-text-span {
      // transform: translateX(v-bind(titleMarquee));
    }
    
    .founder-text {
      opacity: 1;
      transform: translateY(0) rotateX(0);
    }
    
    .founded-text {
      transform: translateY(0) scale(1.0);

      &:hover {
        border-radius: 0;
      }
    }
    
    .founder-name {
      opacity: 1;
      transform: scale(1.0);

      transition-delay: 0s;
      
      &:hover {
        transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
        transform: translateX(2.5rem);
        transition-delay: 0s;
      }
    }
    
    .founding-date-text {
      transform: scale(1.0);
      transition-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .anbu-strip {
      opacity: 1;
    }
  }

  .registry-details {
    opacity: 0;
    transition: opacity cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
  }
  
  .title-text {
    transform: translateX(-100%);
    opacity: 0;
    transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s, opacity cubic-bezier(0.075, 0.82, 0.165, 1) 1s, background-color cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
    
    box-shadow: -4px 3px 2px 4px rgba(85, 64, 16, 0.31);
  }

  .title-text-span {
    width: max-content;

    transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
  }
  
  .founder-text {
    opacity: 0;
    transform: translateY(-100%) rotateX(25deg);
    transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s 1s, opacity cubic-bezier(0.075, 0.82, 0.165, 1) 1s 1s;
  }
  
  .founded-text {
    transform: translateY(100%) scale(0);
    transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s 2s, border-radius cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
    
    box-shadow: -4px -3px 2px 4px rgba(83, 58, 0, 0.31);
  }
  
  .founder-name {
    opacity: 0;
    transform: scale(0);
    transition: transform ease 1s 1.5s, opacity cubic-bezier(0.075, 0.82, 0.165, 1) 1s;

    box-shadow: -4px -3px 2px 4px rgba(83, 58, 0, 0.31);
  }

  .founder-name-text.tick::after {
    content: '|';
  }
  
  .founding-date-text {
    transform: scale(0);
    transition: transform ease 1s 2.5s;

    --un-text-shadow: 0 1px 2px var(--un-text-shadow-color, rgb(30 29 39 / 0.19)),
    1px 2px 4px var(--un-text-shadow-color, rgb(54 64 147 / 0.18));
  text-shadow: var(--un-text-shadow);
    
    &.tick::after {
      content: '_';
    }
  }

  .anbu-strip {
    background-image: url("~/assets/images/Anbu-strip.png");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: top left;
    flex-basis: 12%;

    opacity: 0;

    transition: opacity cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
  }

}

</style>