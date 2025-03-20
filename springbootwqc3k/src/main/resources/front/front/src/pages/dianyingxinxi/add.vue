<template>
<div :style='{"width":"1200px","padding":"20px","margin":"0px auto","position":"relative","background":"none"}'>
    <el-form
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
    >
          <el-form-item :style='{"border":"3px solid #c6ecc6","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="电影名称" prop="dianyingmingcheng">
            <el-input v-model="ruleForm.dianyingmingcheng" 
                placeholder="电影名称" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"3px solid #c6ecc6","padding":"10px","margin":"0 0 10px","background":"#fff"}'  label="电影类型" prop="dianyingleixing">
            <el-select v-model="ruleForm.dianyingleixing" placeholder="请选择电影类型"  >
              <el-option
                  v-for="(item,index) in dianyingleixingOptions"
                  :key="index"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"border":"3px solid #c6ecc6","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="电影封面" v-if="type!='cross' || (type=='cross' && !ro.dianyingfengmian)" prop="dianyingfengmian">
            <file-upload
            tip="点击上传电影封面"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.dianyingfengmian?ruleForm.dianyingfengmian:''"
            @change="dianyingfengmianUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"border":"3px solid #c6ecc6","padding":"10px","margin":"0 0 10px","background":"#fff"}' class="upload" v-else label="电影封面" prop="dianyingfengmian">
                <img v-if="ruleForm.dianyingfengmian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.dianyingfengmian.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.dianyingfengmian.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"border":"3px solid #c6ecc6","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="电影票数" prop="dianyingpiaoshu">
            <el-input v-model="ruleForm.dianyingpiaoshu" 
                placeholder="电影票数" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"3px solid #c6ecc6","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="电影片段" prop="dianyingpianduan">
            <file-upload
            tip="点击上传电影片段"
            action="file/upload"
            :limit="1"
            :multiple="true"
            :fileUrls="ruleForm.dianyingpianduan?ruleForm.dianyingpianduan:''"
            @change="dianyingpianduanUploadChange"
            ></file-upload>
          </el-form-item> 
          <el-form-item :style='{"border":"3px solid #c6ecc6","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="电影地区" prop="dianyingdiqu">
            <el-input v-model="ruleForm.dianyingdiqu" 
                placeholder="电影地区" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"3px solid #c6ecc6","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="场次" prop="changci">
            <el-input v-model="ruleForm.changci" 
                placeholder="场次" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"3px solid #c6ecc6","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="电影语言" prop="dianyingyuyan">
            <el-input v-model="ruleForm.dianyingyuyan" 
                placeholder="电影语言" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"3px solid #c6ecc6","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="导演" prop="daoyan">
            <el-input v-model="ruleForm.daoyan" 
                placeholder="导演" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"3px solid #c6ecc6","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="上映时间" prop="shangyingshijian" >
              <el-date-picker
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  v-model="ruleForm.shangyingshijian" 
                  type="date"
                  placeholder="上映时间">
              </el-date-picker> 
          </el-form-item>
          <el-form-item :style='{"border":"3px solid #c6ecc6","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="价格" prop="price">
            <el-input v-model="ruleForm.price" 
                placeholder="价格" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"3px solid #c6ecc6","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="座位总数" prop="number">
            <el-input v-model="ruleForm.number" 
                placeholder="座位总数" clearable ></el-input>
          </el-form-item>
          <el-form-item :style='{"border":"3px solid #c6ecc6","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="主演" prop="zhuyan">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="主演"
              v-model="ruleForm.zhuyan">
            </el-input>
          </el-form-item>
          <el-form-item :style='{"border":"3px solid #c6ecc6","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="已选座位[用,号隔开]" prop="selected">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="已选座位[用,号隔开]"
              v-model="ruleForm.selected">
            </el-input>
          </el-form-item>
          <el-form-item :style='{"border":"3px solid #c6ecc6","padding":"10px","margin":"0 0 10px","background":"#fff"}' label="电影简介" prop="dianyingjianjie">
            <editor 
                :style='{"padding":"0","boxShadow":"0 0 6px rgba(75,223,201,.5)","margin":"0","borderColor":"#ccc","backgroundColor":"#fff","borderRadius":"0","borderWidth":"0","width":"100%","borderStyle":"solid","height":"auto"}'
                v-model="ruleForm.dianyingjianjie" 
                class="editor" 
                action="file/upload">
            </editor>
          </el-form-item>

      <el-form-item :style='{"padding":"0","margin":"0"}'>
        <el-button :style='{"cursor":"pointer","padding":"0","margin":"0 20px 0 0","borderColor":"#59b450","color":"#333","outline":"none","borderRadius":"4px","background":"#c6ecc6","borderWidth":"4px 0","width":"128px","fontSize":"14px","borderStyle":"solid","height":"40px"}'  type="primary" @click="onSubmit">提交</el-button>
        <el-button :style='{"cursor":"pointer","padding":"0","margin":"0","borderColor":"#999999","color":"#333","outline":"none","borderRadius":"4px","background":"#dddddd","borderWidth":"4px 0","width":"128px","fontSize":"14px","borderStyle":"solid","height":"40px"}' @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
      return {
        id: '',
        baseUrl: '',
        ro:{
            dianyingmingcheng : false,
            dianyingleixing : false,
            dianyingfengmian : false,
            dianyingpiaoshu : false,
            dianyingpianduan : false,
            dianyingdiqu : false,
            changci : false,
            dianyingyuyan : false,
            daoyan : false,
            zhuyan : false,
            dianyingjianjie : false,
            shangyingshijian : false,
            thumbsupnum : false,
            crazilynum : false,
            clicktime : false,
            clicknum : false,
            price : false,
            number : false,
            selected : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          dianyingmingcheng: '',
          dianyingleixing: '',
          dianyingfengmian: '',
          dianyingpiaoshu: '',
          dianyingpianduan: '',
          dianyingdiqu: '',
          changci: '',
          dianyingyuyan: '',
          daoyan: '',
          zhuyan: '',
          dianyingjianjie: '',
          shangyingshijian: '',
          thumbsupnum: '',
          crazilynum: '',
          clicktime: '',
          clicknum: '',
          price: '',
          number: '',
          selected: '',
        },
        dianyingleixingOptions: [],
        rules: {
          dianyingmingcheng: [
          ],
          dianyingleixing: [
          ],
          dianyingfengmian: [
          ],
          dianyingpiaoshu: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          dianyingpianduan: [
          ],
          dianyingdiqu: [
          ],
          changci: [
          ],
          dianyingyuyan: [
          ],
          daoyan: [
          ],
          zhuyan: [
          ],
          dianyingjianjie: [
          ],
          shangyingshijian: [
          ],
          thumbsupnum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          crazilynum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          clicktime: [
          ],
          clicknum: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          price: [
            { required: true, message: '价格不能为空', trigger: 'blur' },
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
          number: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          selected: [
          ],
        },
      };
    },
    computed: {



    },
    components: {
    },
    created() {
	  //this.bg();
      let type = this.$route.query.type ? this.$route.query.type : '';
      this.init(type);
      this.baseUrl = this.$config.baseUrl;
    },
    methods: {
      getMakeZero(s) {
          return s < 10 ? '0' + s : s;
      },
      // 下载
      download(file){
        window.open(`${file}`)
      },
      // 初始化
      init(type) {
        this.type = type;
        if(type=='cross'){
          var obj = JSON.parse(localStorage.getItem('crossObj'));
          for (var o in obj){
            if(o=='dianyingmingcheng'){
              this.ruleForm.dianyingmingcheng = obj[o];
              this.ro.dianyingmingcheng = true;
              continue;
            }
            if(o=='dianyingleixing'){
              this.ruleForm.dianyingleixing = obj[o];
              this.ro.dianyingleixing = true;
              continue;
            }
            if(o=='dianyingfengmian'){
              this.ruleForm.dianyingfengmian = obj[o].split(",")[0];
              this.ro.dianyingfengmian = true;
              continue;
            }
            if(o=='dianyingpiaoshu'){
              this.ruleForm.dianyingpiaoshu = obj[o];
              this.ro.dianyingpiaoshu = true;
              continue;
            }
            if(o=='dianyingpianduan'){
              this.ruleForm.dianyingpianduan = obj[o];
              this.ro.dianyingpianduan = true;
              continue;
            }
            if(o=='dianyingdiqu'){
              this.ruleForm.dianyingdiqu = obj[o];
              this.ro.dianyingdiqu = true;
              continue;
            }
            if(o=='changci'){
              this.ruleForm.changci = obj[o];
              this.ro.changci = true;
              continue;
            }
            if(o=='dianyingyuyan'){
              this.ruleForm.dianyingyuyan = obj[o];
              this.ro.dianyingyuyan = true;
              continue;
            }
            if(o=='daoyan'){
              this.ruleForm.daoyan = obj[o];
              this.ro.daoyan = true;
              continue;
            }
            if(o=='zhuyan'){
              this.ruleForm.zhuyan = obj[o];
              this.ro.zhuyan = true;
              continue;
            }
            if(o=='dianyingjianjie'){
              this.ruleForm.dianyingjianjie = obj[o];
              this.ro.dianyingjianjie = true;
              continue;
            }
            if(o=='shangyingshijian'){
              this.ruleForm.shangyingshijian = obj[o];
              this.ro.shangyingshijian = true;
              continue;
            }
            if(o=='thumbsupnum'){
              this.ruleForm.thumbsupnum = obj[o];
              this.ro.thumbsupnum = true;
              continue;
            }
            if(o=='crazilynum'){
              this.ruleForm.crazilynum = obj[o];
              this.ro.crazilynum = true;
              continue;
            }
            if(o=='clicktime'){
              this.ruleForm.clicktime = obj[o];
              this.ro.clicktime = true;
              continue;
            }
            if(o=='clicknum'){
              this.ruleForm.clicknum = obj[o];
              this.ro.clicknum = true;
              continue;
            }
            if(o=='price'){
              this.ruleForm.price = obj[o];
              this.ro.price = true;
              continue;
            }
            if(o=='number'){
              this.ruleForm.number = obj[o];
              this.ro.number = true;
              continue;
            }
            if(o=='selected'){
              this.ruleForm.selected = obj[o];
              this.ro.selected = true;
              continue;
            }
          }
        }
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
          }
        });
        this.$http.get('option/dianyingleixing/dianyingleixing', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.dianyingleixingOptions = res.data.data;
          }
        });
      },

    // 多级联动参数
      // 多级联动参数
      info(id) {
        this.$http.get('dianyingxinxi/detail/${id}', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 提交
      onSubmit() {

        //更新跨表属性
        var crossuserid;
        var crossrefid;
        var crossoptnum;
        this.$refs["ruleForm"].validate(valid => {
          if(valid) {
            if(this.type=='cross'){
                 var statusColumnName = localStorage.getItem('statusColumnName');
                 var statusColumnValue = localStorage.getItem('statusColumnValue');
                 if(statusColumnName && statusColumnName!='') {
                     var obj = JSON.parse(localStorage.getItem('crossObj'));
                     if(!statusColumnName.startsWith("[")) {
                         for (var o in obj){
                             if(o==statusColumnName){
                                 obj[o] = statusColumnValue;
                             }
                         }
                         var table = localStorage.getItem('crossTable');
                         this.$http.post(table+'/update', obj).then(res => {});
                     } else {
                            crossuserid=Number(localStorage.getItem('userid'));
                            crossrefid=obj['id'];
                            crossoptnum=localStorage.getItem('statusColumnName');
                            crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                     }
                 }
            }
            if(crossrefid && crossuserid) {
                 this.ruleForm.crossuserid=crossuserid;
                 this.ruleForm.crossrefid=crossrefid;
                 var params = {
                     page: 1,
                     limit: 10,
                     crossuserid:crossuserid,
                     crossrefid:crossrefid,
                 }
                 this.$http.get('dianyingxinxi/list', {
                  params: params
                 }).then(res => {
                     if(res.data.data.total>=crossoptnum) {
                         this.$message({
                          message: localStorage.getItem('tips'),
                          type: 'success',
                          duration: 1500,
                         });
                          return false;
                     } else {
                         // 跨表计算


                          this.$http.post('dianyingxinxi/add', this.ruleForm).then(res => {
                              if (res.data.code == 0) {
                                  this.$message({
                                      message: '操作成功',
                                      type: 'success',
                                      duration: 1500,
                                      onClose: () => {
                                          this.$router.go(-1);
                                      }
                                  });
                              } else {
                                  this.$message({
                                      message: res.data.msg,
                                      type: 'error',
                                      duration: 1500
                                  });
                              }
                          });
                     }
                 });
             } else {


                  this.$http.post('dianyingxinxi/add', this.ruleForm).then(res => {
                     if (res.data.code == 0) {
                          this.$message({
                              message: '操作成功',
                              type: 'success',
                              duration: 1500,
                              onClose: () => {
                                  this.$router.go(-1);
                              }
                          });
                      } else {
                          this.$message({
                              message: res.data.msg,
                              type: 'error',
                              duration: 1500
                          });
                      }
                  });
             }
          }
        });
      },
      // 获取uuid
      getUUID () {
        return new Date().getTime();
      },
      // 返回
      back() {
        this.$router.go(-1);
      },
      dianyingfengmianUploadChange(fileUrls) {
          this.ruleForm.dianyingfengmian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
      },
      dianyingpianduanUploadChange(fileUrls) {
          this.ruleForm.dianyingpianduan = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  padding: 0 10px 0 0;
	  color: #666;
	  font-weight: 500;
	  width: 80px;
	  font-size: 14px;
	  line-height: 40px;
	  text-align: right;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 80px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  border: 0;
	  border-radius: 4px;
	  padding: 0 12px;
	  outline: none;
	  color: #333;
	  background: #eff8ee;
	  width: 400px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  border: 0;
	  border-radius: 4px;
	  padding: 0 10px;
	  outline: none;
	  color: #333;
	  background: #eff8ee;
	  width: 200px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  border: 0;
	  border-radius: 4px;
	  padding: 0 10px 0 30px;
	  outline: none;
	  color: #333;
	  background: #eff8ee;
	  width: 200px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .upload .upload-img {
	  border: 1px dashed #333;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #666;
	  background: #eff8ee;
	  width: 100px;
	  font-size: 32px;
	  line-height: 100px;
	  text-align: center;
	  height: 100px;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  border: 1px dashed #333;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #666;
	  background: #eff8ee;
	  width: 100px;
	  font-size: 32px;
	  line-height: 100px;
	  text-align: center;
	  height: 100px;
	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  border: 1px dashed #333;
	  cursor: pointer;
	  border-radius: 6px;
	  color: #666;
	  background: #eff8ee;
	  width: 100px;
	  font-size: 32px;
	  line-height: 100px;
	  text-align: center;
	  height: 100px;
	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  border: 0;
	  border-radius: 4px;
	  padding: 12px;
	  outline: none;
	  color: #333;
	  background: #eff8ee;
	  width: 400px;
	  font-size: 14px;
	  height: 120px;
	}
</style>
