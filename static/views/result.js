export default {
  template: `
    <div>
      <div :style="{height:'46px'}"></div>
      <van-nav-bar
        :title="text"
        left-text="返回"
        left-arrow
        fixed
        @click-left="$router.replace({name:'home'})"
      />
      <div class="mainPadding" v-if="data">
        <van-panel
          v-for="(v,i) in data"
          :key="i"
          :title="v.title"
          :desc="v.desc"
          :status="v.status"
          class="panel"
        >
          <div v-if="v.description" class="description">{{v.description}}</div>
        </van-panel>
      </div>
    </div>
  `,
  data() {
    return {
      text:'',
      data:null
    };
  },
  methods:{
    dataFormat(data){
      let {type} = this.$route.params;
      this.data=data.result.map(v=>{
        let o={
          title:v.name,
          desc:'',
          status:`可信度：${parseInt(v.score*100)||'<1'}%`,
        }
        switch(type){
          case 'advancedGeneral':
            o.title=v.keyword
            o.desc=`分类：${v.root}`
            break
          case 'carDetect':
            o.desc=`年份：${v.year}`
            break
          case 'dishDetect':
            o.desc=`卡路里：${v.calorie}`
            o.status=`可信度：${parseInt(v.probability*100)||'<1'}%`
            break
          case 'logoSearch':
            o.desc=``
            o.status=`可信度：${parseInt(v.probability*100)||'<1'}%`
            break
        }
        if(v.baike_info){
          o.description=v.baike_info.description
        }
        return o
      })
    }
  },
  mounted() {
    let { data ,type ,text} = this.$route.params
    if (!data||!type||!text) return this.$router.replace({ name: "home" })
    this.text=text
    this.dataFormat(data)
  }
}