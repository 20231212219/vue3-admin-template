<template>
  <div
    class="container"
    :style="
      settingStore.dataScreenBg ? { backgroundImage: `url(${settingStore.dataScreenBg})` } : {}
    "
  >
    <v-scale-screen width="1920" height="1080">
      <div class="screen">
        <div class="top">
          <Top />
        </div>
        <div class="bottom">
          <div class="left">
            <Tourist class="tourist" />
            <Sex class="sex" />
            <Age class="age" />
          </div>
          <div class="center">
            <Map class="map" />
            <Line class="line" />
          </div>
          <div class="right">
            <Rank class="rank" />
            <Year class="year" />
            <Counter class="counter" />
          </div>
        </div>
      </div>
    </v-scale-screen>
  </div>
</template>

<script setup lang="ts">
import Top from './components/Top/index.vue'
import Tourist from './components/Tourist/index.vue'
import Sex from './components/Sex/index.vue'
import Age from './components/Age/index.vue'
import Map from './components/Map/index.vue'
import Line from './components/Line/index.vue'
import Rank from './components/Rank/index.vue'
import Year from './components/Year/index.vue'
import Counter from './components/Counter/index.vue'
import VScaleScreen from 'v-scale-screen'
import useLayOutSettingStore from '@/store/modules/setting'

const settingStore = useLayOutSettingStore()
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  background-color: #111430; /* Dark background fallback */
  background-repeat: no-repeat;
  background-size: cover;

  .screen {
    width: 1920px;
    height: 1080px;
    display: flex;
    flex-direction: column;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      display: flex;
      flex: 1;

      .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 20px;

        .rank {
          flex: 1.5;
        }

        .year {
          flex: 1;
        }

        .counter {
          flex: 1;
        }
      }

      .left {
        flex: 1;
        height: 1040px;
        display: flex;
        flex-direction: column;

        .tourist {
          flex: 1.2;
        }

        .sex {
          flex: 1;
        }

        .age {
          flex: 1;
        }
      }

      .center {
        flex: 2;
        display: flex;
        flex-direction: column;
        margin: 0 20px;

        .map {
          flex: 4;
        }

        .line {
          flex: 1;
        }
      }
    }
  }
}
</style>
