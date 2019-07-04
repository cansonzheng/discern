export default {
  template: `
    <div class="mainPadding">
      <van-row gutter="20">
        <van-col :span="v.span?v.span*8:8" v-for="(v,i) in navList" :key="i">
          <uploader :text="v.text" :icon="v.icon" :type="v.type" @done="done"/>
        </van-col>
      </van-row>
    </div>
  `,
  data() {
    return {
      navList: [
        {
          text: "通用物体识别",
          icon: "&#xe619;",
          type: "advancedGeneral"
        },
        {
          text: "车辆识别",
          icon: "&#xe622;",
          type: "carDetect"
        },
        {
          text: "菜品识别",
          icon: "&#xe601;",
          type: "dishDetect"
        }
      ]
    };
  },
  methods: {
    done(v) {
      this.$router.push({
        name:'result',
        params:{
          text:v.text,
          type:v.type,
          data:v.data
        }
      })
    }
  }
}