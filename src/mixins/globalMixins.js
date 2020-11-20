import storeLocal from 'storejs'
export default {
  data() {
    return {
      uploadUrl: process.env.BASE_API + '/',
      fileurl: process.env.BASE_API + '/api/upload/attachment', // 上传文件地址 attachment
      commonURL: process.env.BASE_API + '/abc_admin/upload/uploads_file', // 公共上传 files
      live800: 'https://chat.hopo.com.cn/live800/chatClient/chatbox.jsp?companyID=9012&configID=17', // 即时沟通
      goosurl: null,
      listLoading: false,
      ISstatus: false, // 数据是否加载
      pickerOptions2: { // 多选日期框，预置
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      batch: false, // 批量操作状态 ，主要是列表中的批量操作
      langs: null, // 中文包
      popdata: { // 弹框参数
        form: null,
        formData: null,
        formLabel: null,
        formRules: null,
        title: ''
      },
      img_header: {
        Authorization: 'Bearer ' + storeLocal.get('token')
      },
      formcopy: null, // 弹框重置参数所用
      timer: null, // 定时器参数
      sendText: { // 定时器参数
        sendText: '获取验证码',
        sendStatus: false
      },
      value6: '',
      errmsg: '请填写必填信息后再进行提交！'
    }
  },
  created: function() {
    if (this.goosurl === null) {
      this.goosurl = location.origin
    }
  },
  methods: {
    downloadFiles(url) {
      // 导出 ，url下载地址
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.src = url
      document.body.appendChild(iframe)
    },
    get_time(value) { // 得到起始时间格式数据,公共方法
      if (value == null) {
        this.query.start_time = ''
        this.query.end_time = ''
      } else {
        this.query.start_time = value[0]
        this.query.end_time = value[1]
      }
    },
    datasend(data, res, list_info) {
      // data:this,
      // res:接口返回数据,
      // list_info：判断值，如果有，则进入另一种赋值,有三个默认值colslog，tablelog，total
      if (list_info) {
        list_info.colslog = res.content.columns
        list_info.tablelog = res.content.page_data.data
        list_info.total = res.content.page_data.total // 分页总数量
        list_info.currentPage = res.content.page_data.current_page
      } else {
        data.colslog = res.content.columns
        data.tablelog = res.content.page_data.data
        data.total = res.content.page_data.total // 分页总数量
        data.currentPage = res.content.page_data.current_page
      }
      data.listLoading = false
    },
    toRouter(path, params) { // 路径传参 val : 路径值 params : 参数
      this.$router.push({ path: path, query: params })
    },
    pRouter(path, params) { // 隐藏式传参
      this.$router.push({ path: path, params: params })
    },
    Handback(val) { // 返回上一页 如果添加参数，则不弹出修改提示
      if (val === 'change') {
        this.$confirm('是否放弃本次修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          history.back()
        }).catch(() => { })
      } else {
        history.back()
      }
    },
    pop() {
      $('.pop').show()
      $('.cover-bg').show()
    },
    closepop() {
      $('.pop').hide()
      $('.cover-bg').hide()
    },
    pop1() {
      $('.pop1').show()
      $('.cover-bg').show()
    },
    closepop1() {
      $('.pop1').hide()
      $('.cover-bg').hide()
    },
    getForm(columns) { // 获取表单字段值
      const formlist = {}
      for (const key in columns) {
        if (key == 'area') { // 如果为区域。则直接定义数据为数组
          formlist[key] = []
        } else {
          formlist[key] = ''
        }
      }
      return formlist
    },
    getRules(formlabel, filter) { // formlabel 格式为 {id:{label:"1"}}数据格式 表单校验获取函数 filter:[]真正要校验的值
      const rules = {}
      if (!filter || filter.length === 0) {
        for (const key in formlabel) {
          if (!formlabel[key].column_info) {
            rules[key] = [
              { required: true, message: '请填写' + formlabel[key].label, trigger: 'blur' }
            ]
          } else {
            rules[key] = [
              { required: true, message: '请填写' + formlabel[key].label, trigger: 'change' }
            ]
          }
        }
        return rules // 返回校验值
      } else {
        for (const key in formlabel) {
          for (let i = 0; i < filter.length; i++) {
            if (filter[i] == key) {
              if (!formlabel[key].column_info) {
                rules[key] = [
                  { required: true, message: '请填写' + formlabel[key].label, trigger: 'blur' }
                ]
              } else {
                rules[key] = [
                  { required: true, message: '请填写' + formlabel[key].label, trigger: 'change' }
                ]
              }
            }
          }
        }
        return rules // 返回校验值
      }
    },
    inRules(formlabel, filter) { // formlabel 格式为 {id:{label:"1"}}数据格式 表单校验获取函数 filter:[]取消要校验的值
      const rules = {}
      for (const key in formlabel) {
        for (let i = 0; i < filter.length; i++) {
          if (filter[i] != key) {
            if (formlabel[key].column_info == undefined) {
              rules[key] = [
                { required: true, message: '请填写' + formlabel[key].label, trigger: 'blur' }
              ]
            } else {
              rules[key] = [
                { required: true, message: '请填写' + formlabel[key].label, trigger: 'change' }
              ]
            }
          }
        }
      }
      return rules // 返回校验值
    },
    formverify(val) {
      this.$refs[val].validate((valid) => {
        if (valid) {
          return true
        } else {
          this.$myGlobalMethod.open4('请填写完必填参数再行提交！')
          return false
        }
      })
    },
    showEdit() { // 鼠标移入显示事件
      this.showOperation = true
    },
    hideEdit() { // 鼠标移出隐藏事件
      this.showOperation = false
    },
    trim(str, is_global) { // 去除字符串空格，is_global=='g' 表示去除所有空格
      let result
      result = str.replace(/(^\s+)|(\s+$)/g, '')
      if (is_global.toLowerCase() == 'g') {
        result = result.replace(/\s/g, '')
      }
      return result
    },
    popset(res) {
      this.formcopy = this.getForm(res.content.columns)
      this.popdata = {
        form: this.formcopy,
        formLabel: res.content.columns
      }
    },
    /**
            * 信息提示
            */
    open1(content) { // 默认信息提醒
      this.$message(content)
    },
    open2(content) { // 成功消息提醒
      this.$message({
        showClose: true, // 是否可关闭
        center: true, // 文字是否居中
        message: content,
        type: 'success'
      })
    },
    open3(content) { // 警告消息提醒
      this.$message({
        showClose: true, // 是否可关闭
        message: content,
        type: 'warning'
      })
    },
    open4(content) { // 错误消息提醒
      this.$message.error(content)
    },
    /**
             * Notification 通知
             * title 信息标题 右边出现
             * content 信息内容
            */
    Notopen1(title, content) { // 普通通知
      this.$notify.info({
        title: title,
        message: content
      })
    },
    Notopen2(content) { // 成功通知
      this.$notify({
        title: '成功',
        message: content,
        type: 'success'
      })
    },
    Notopen3(content) { // 警告通知
      this.$notify({
        title: '警告',
        message: content,
        type: 'warning'
      })
    },
    Notopen4(content) { // 错误通知
      this.$notify.error({
        title: '错误',
        message: content
      })
    },
    setTimer() { // 定时器
      this.timer = setInterval(() => {
        if (this.sendText.sendText > 1) {
          this.sendText.sendText--
        } else {
          clearInterval(this.timer)
          this.sendText = {
            sendStatus: false,
            sendText: '发送验证码'
          }
        }
      }, 1000)
    },
    setTableWidth(row) { // table 表格设置宽度 col：formlabel
      /** 示例
                   *  this.setTableWidth({col:this.colslog,setData:[
                          {column:'rec_id',value:'55'},
                          {column:'company_name',value:'250'},
                      ]})
                  */
      const setData = row.setData // 设置数据
      for (var key in row.col) {
        for (let i = 0; i < setData.length; i++) {
          if (key == setData[i].column) {
            row.col[key].width = setData[i].value
          }
        }
      }
    },
    getParmes(val) { // 拼接url parems
      let aa = ''
      for (const key in val) {
        aa += key + '=' + val[key] + '&'
      }
      return aa
    },
    contactService() {
      window.open(this.live800, '_black')
    },
    isString(str) {
      return (typeof str === 'string') && str.constructor == String
    },
    isArray(obj) {
      return (typeof obj === 'object') && obj.constructor == Array
    },
    isObjects(obj) {
      return (typeof obj === 'object') && obj.constructor == Object
    },
    arrdo(arr) { // 数组去重
      const x = new Set(arr)
      return [...x]
    },
    CgoodsDetail(goods_id, goods_type) { // 一般情况下商品跳转到详情页
      if (!goods_type) {
        window.open(`${this.goosurl}/#/goodsDetail?goods_id=${goods_id}`, '_blank')
      } else {
        window.open(`${this.goosurl}/#/goodsDetail?goods_id=${goods_id}&goods_type=${goods_type}`, '_blank')
      }
    },
    tsgoodsDetail(goods) { // 特殊情况下商品跳转到详情页
      if (!goods.goods_type) {
        window.open(`${this.goosurl}/#/goodsDetail?goods_id=${goods.goods_id}&product_sn=${goods.product_sn}&source=cart`, '_blank')
      } else {
        window.open(`${this.goosurl}/#/goodsDetail?goods_id=${goods.goods_id}&goods_type=${goods.goods_type}&product_sn=${goods.product_sn}&source=cart`, '_blank')
      }
    }
  }
}
