
export default {
  install: function(Vue, options) {
    // 1. 添加全局方法或属性
    Vue.prototype.$myGlobalMethod = {
      screenheight: { // 界面高度
        height: (document.documentElement.clientHeight - 190) + 'px'
      },
      resize(data) { // 界面高度检测并变化
        window.onresize = () => {
          return (() => {
            data.screenheight.height = (document.documentElement.clientHeight - 190) + 'px'
          })()
        }
      },
      printContent(e) { // 打印
        const subOutputRankPrint = document.getElementById('subOutputRank-print')
        const newContent = subOutputRankPrint.innerHTML
        const oldContent = document.body.innerHTML
        document.body.innerHTML = newContent
        window.print()
        window.location.reload()
        document.body.innerHTML = oldContent
        return false
      },
      // 消息提示
      open1(content) { // 默认信息提醒
        Vue.prototype.$message(content)
      },
      open2(content) { // 成功消息提醒
        Vue.prototype.$message({
          showClose: true, // 是否可关闭
          center: true, // 文字是否居中
          message: content,
          type: 'success'
        })
      },
      open3(content) { // 警告消息提醒
        Vue.prototype.$message({
          showClose: true, // 是否可关闭
          message: content,
          type: 'warning'
        })
      },
      open4(content) { // 错误消息提醒
        Vue.prototype.$message.error(content)
      },
      // 弹框
      // content 弹框内容
      // success 弹框成功后返回的内容信息
      // error 弹框取消或者失败后返回的内容信息
      boxopen(content, success, error) { // 当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭
        Vue.prototype.$alert(content, {
          confirmButtonText: '确定',
          callback: action => {
            this.open(success)
          }
        })
      },
      boxopen2(content, success, error) { // 提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。
        Vue.prototype.$confirm(content, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.open2(success)
        }).catch(() => {
          this.open(error)
        })
      },
      // Notification 通知
      // title 信息标题
      // content 信息内容
      Notopen1(title, content) { // 普通通知
        Vue.prototype.$notify.info({
          title: title,
          message: content
        })
      },
      Notopen2(content) { // 成功通知
        Vue.prototype.$notify({
          title: '成功',
          message: content,
          type: 'success'
        })
      },
      Notopen3(content) { // 警告通知
        Vue.prototype.$notify({
          title: '警告',
          message: content,
          type: 'warning'
        })
      },
      Notopen4(content) { // 错误通知
        Vue.prototype.$notify.error({
          title: '错误',
          message: content
        })
      },
      // 倒计时
      countdown(that) { // 最后输出date+"天"+hours+"小时"+ minutes+"分"+ seconds+"秒"+ ms
        var d1 = new Date()// 获取到当前的时间
        var d1Ms = d1.getTime()
        var d2 = new Date('11 11,2018')
        var d2Ms = d2.getTime()
        var differMs = d2Ms - d1Ms
        var date = parseInt(differMs / (3600 * 24 * 1000))// 天
        var hours = parseInt((differMs % (3600 * 24 * 1000)) / (3600 * 1000))// 1小时=3600s
        var minutes = parseInt((differMs % (3600 * 1000)) / (60 * 1000))// 分钟
        var seconds = parseInt((differMs % (60 * 1000)) / 1000)// 秒
        var ms = differMs % 1000// 毫秒
        // 当前分秒为个位数字时，对其进行的处理
        hours = hours < 10 ? '0' + hours : hours
        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds
        that.date = date
        return date
      }

    }
    // 2. 添加全局资源
    Vue.directive('drag', function(el, binding) { // 拖拉拽实现v-drag
      const odiv = el // 获取当前元素
      odiv.onmousedown = (e) => {
        // 算出鼠标相对元素的位置
        const disX = e.clientX - odiv.offsetLeft
        const disY = e.clientY - odiv.offsetTop
        document.onmousemove = (e) => {
          // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          const left = e.clientX - disX
          const top = e.clientY - disY
          // 绑定元素位置到positionX和positionY上面
          // this.positionX = top;
          // this.positionY = left;
          // 移动当前元素
          odiv.style.left = left + 'px'
          odiv.style.top = top + 'px'
        }
        document.onmouseup = (e) => {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    })

    // 3. 注入组件
    Vue.mixin({
      created: function() {
        // 逻辑...
      }
    })

    // 4. 添加实例方法
    Vue.prototype.$myMethod = function(methodOptions) {
      // 逻辑...
    }
  }
}
