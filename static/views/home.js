import uploader from '../components/uploader.js'
export default {
  template: `
    <div class="mainPadding">
      <transition>
        <div v-if="title" class="maintitle animated bounceInDown">AI物体识别</div>
      </transition>
      <transition>
        <van-row gutter="20" v-if="menu.length" class="animated bounceInUp">
          <van-col :span="v.span?v.span*8:8" v-for="(v,i) in menu" :key="i" :style="{margin:'10px 0'}" v-if="!v.disabled">
            <uploader :text="v.text" :icon="v.icon" :type="v.type" @done="done"/>
          </van-col>
        </van-row>
      </transition>
    </div>
  `,
  components:{
    uploader
  },
  data() {
    return {
      title:false,
      menu: []
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
    },
    async getmenu(){
      let res=await axios.get('/menu.json')
      this.menu=res.data
    }
  },
  created(){
    this.title=true
    this.getmenu()
  }
}