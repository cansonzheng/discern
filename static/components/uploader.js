Vue.component('uploader', {
  props: ["icon", "text", "type"],
  data() {
    return {
      file: []
    };
  },
  methods: {
    // 压缩图片
    dealImage(path, callback) {
      var img = new Image();
      img.src = path;
      img.onload = function() {
        //默认按比例压缩
        // var w = this.width,
        //   h = this.height;
        let w = 1000;
        let h = (w / this.width) * this.height;
        var quality = 0.7; // 默认图片质量为0.7

        //生成canvas
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");

        // 创建属性节点
        canvas.setAttribute("width", 1000);
        canvas.setAttribute("height", h);

        ctx.drawImage(this, 0, 0, w, h);
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL("image/jpeg", quality);
        // 回调函数返回base64的值
        callback(base64);
      };
    },
    // 提交
    afterRead(file, detail) {
      this.$toast.loading({
        message: "正在识别",
        mask: true
      });
      this.dealImage(file.content, base64 => {
        axios
          .post("/api/detect", {
            type: this.type,
            image: base64,
          })
          .then(res => {
            if(res.data.err) {
              this.$toast.clear()
              this.$toast("识别失败");
              return;
            }
            if (res.data.error_code) {
              this.$toast(res.data.error_msg);
            } else {
              this.$emit("done", {
                type:this.type,
                text:this.text,
                data:res.data,
              });
            }
            this.$toast.clear()
          })
          .catch(e => {
            this.$toast.clear();
            this.$toast("识别失败");
          });
      });
      this.file=[]
    },
    // 清除
    del() {
      this.$emit("del");
    }
  },
  template: `
    <div class="uploader">
      <van-uploader
        v-model="file"
        :max-count="1"
        :preview-image="false"
        :after-read="afterRead"
        @delete="del"
      >
        <div>
          <div class="iconfont" v-html="icon"></div>
          <div class="text">{{text}}</div>
        </div>
      </van-uploader>
    </div>
  `
})