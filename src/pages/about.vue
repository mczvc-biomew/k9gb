<template>
  <div class="main">
    <div class="top-filler"></div>
    <div class="heading-horizontal">
    
      <div class="registry-card mx-auto mr-0 sm:ml-[26%] md:w-[98%] max-w-[333px] lg:max-w-[399px] overflow-x-clip">
        
        <div class="title-text text-3xl md:text-4xl bg-[rgb(0,30,57)] py-2 px-4 flex-basis-[31rem]">
          <div class="title-text-span">
            <span class="text-blue">{{ $t("k9gb")[0] }}</span><span class="text-yellow">{{ $t("k9gb")[1] }}</span><span class="text-purple">{{ $t("k9gb")[2] }}</span><span class="text-blue">{{ $t("k9gb")[3] }}</span>
            <span class="text-[#cd9406]"> ({{ $t("k9gb-full") }})</span>
          </div>
        </div>
        
        <div class="registry-details text-sm flex-wrap md:text-4xl flex flex-basis-[100%] items-center bg-[#b37f00]">
          <span class="founder-text text-2xl md:text-4xl bg-[#cd9406] text-white font-bold p-2 flex-grow-1">Founder</span>
          <div class="founder-name bg-black margin-auto py-4 px-2 flex-basis-[100%] sm:flex-basis-[65%] flex justify-center rounded-[64px]">
            <span class="founder-name-text bg-black text-white text-center">{{ $t("mczvc-full") }}</span>
          </div>
          
          <span class="founded-text flex-grow-1 py-2 px-3 bg-blue-900 text-blue-200 rounded-[64px]">
            {{ $t("founded-on")}}: 
          </span>
          <span class="founding-date-text bg-[#eeac08] py-2 px-4 rounded-64px ml-[-30px] md:ml-0">{{ $t("founding-date") }}</span>
        </div>
      </div>

      <div class="anbu-strip">

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
  const founderNameText = founderName?.textContent;
  
  const dateAnimatePending = ref(false);
  const dateText = ref('');
  
  const foundingDate = document.querySelector('.founding-date-text');
  const foundingDateText = foundingDate.textContent;
  
  animateTypewriting(founderNameText, titleAnimatePending, founderName as HTMLElement, titleText, 8, true, 120, 2700 );
  
  animateTypewriting(foundingDateText, dateAnimatePending, foundingDate as HTMLElement, dateText, 6, true, 120, 3700);

 
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
    }
    
    .founder-name {
      opacity: 1;
      transform: scale(1.0);
    }
    
    .founding-date-text {
      transform: scale(1.0);
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
    transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s, opacity cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
    
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
    transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s 2s;

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