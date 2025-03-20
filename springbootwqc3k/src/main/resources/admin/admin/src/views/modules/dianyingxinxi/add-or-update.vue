<template>
	<div class="addEdit-block" :style='{"padding":"30px"}' style="width: 100%;">
		<el-form
			:style='{"padding":"30px","boxShadow":"0 0px 0px #999","borderRadius":"6px","background":"url(http://codegen.caihongy.cn/20221014/5e767dc0afa649ec9fbc71f9da086ab3.jpg)"}'
			class="add-update-preview"
			ref="ruleForm"
			:model="ruleForm"
			:rules="rules"
			label-width="80px"
		>
			<template >
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="电影名称" prop="dianyingmingcheng">
					<el-input v-model="ruleForm.dianyingmingcheng" placeholder="电影名称" clearable  :readonly="ro.dianyingmingcheng"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="电影名称" prop="dianyingmingcheng">
					<el-input v-model="ruleForm.dianyingmingcheng" placeholder="电影名称" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="select" v-if="type!='info'"  label="电影类型" prop="dianyingleixing">
					<el-select :disabled="ro.dianyingleixing" v-model="ruleForm.dianyingleixing" placeholder="请选择电影类型" >
						<el-option
							v-for="(item,index) in dianyingleixingOptions"
							v-bind:key="index"
							:label="item"
							:value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="电影类型" prop="dianyingleixing">
					<el-input v-model="ruleForm.dianyingleixing"
						placeholder="电影类型" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="upload" v-if="type!='info' && !ro.dianyingfengmian" label="电影封面" prop="dianyingfengmian">
					<file-upload
						tip="点击上传电影封面"
						action="file/upload"
						:limit="3"
						:multiple="true"
						:fileUrls="ruleForm.dianyingfengmian?ruleForm.dianyingfengmian:''"
						@change="dianyingfengmianUploadChange"
					></file-upload>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="upload" v-else-if="ruleForm.dianyingfengmian" label="电影封面" prop="dianyingfengmian">
					<img v-if="ruleForm.dianyingfengmian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.dianyingfengmian.split(',')[0]" width="100" height="100">
					<img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.dianyingfengmian.split(',')" :src="$base.url+item" width="100" height="100">
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="电影票数" prop="dianyingpiaoshu">
					<el-input v-model="ruleForm.dianyingpiaoshu" placeholder="电影票数" clearable  :readonly="ro.dianyingpiaoshu"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="电影票数" prop="dianyingpiaoshu">
					<el-input v-model="ruleForm.dianyingpiaoshu" placeholder="电影票数" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="upload" v-if="type!='info'&& !ro.dianyingpianduan" label="电影片段" prop="dianyingpianduan">
					<file-upload
						tip="点击上传电影片段"
						action="file/upload"
						:limit="1"
						:multiple="true"
						:fileUrls="ruleForm.dianyingpianduan?ruleForm.dianyingpianduan:''"
						@change="dianyingpianduanUploadChange"
					></file-upload>
				</el-form-item> 
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else-if="ruleForm.dianyingpianduan" label="电影片段" prop="dianyingpianduan">
					<el-button :style='{"border":"1px solid #128f90","cursor":"pointer","padding":"0 24px","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"-webkit-linear-gradient(top,#2fc1c2,#037f80)","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="text" size="small" @click="download($base.url+ruleForm.dianyingpianduan)">预览</el-button>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else-if="!ruleForm.dianyingpianduan" label="电影片段" prop="dianyingpianduan">
					<el-button :style='{"border":"1px solid #128f90","cursor":"pointer","padding":"0 24px","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"-webkit-linear-gradient(top,#2fc1c2,#037f80)","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="text" size="small">无</el-button>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="电影地区" prop="dianyingdiqu">
					<el-input v-model="ruleForm.dianyingdiqu" placeholder="电影地区" clearable  :readonly="ro.dianyingdiqu"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="电影地区" prop="dianyingdiqu">
					<el-input v-model="ruleForm.dianyingdiqu" placeholder="电影地区" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="场次" prop="changci">
					<el-input v-model="ruleForm.changci" placeholder="场次" clearable  :readonly="ro.changci"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="场次" prop="changci">
					<el-input v-model="ruleForm.changci" placeholder="场次" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="电影语言" prop="dianyingyuyan">
					<el-input v-model="ruleForm.dianyingyuyan" placeholder="电影语言" clearable  :readonly="ro.dianyingyuyan"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="电影语言" prop="dianyingyuyan">
					<el-input v-model="ruleForm.dianyingyuyan" placeholder="电影语言" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="导演" prop="daoyan">
					<el-input v-model="ruleForm.daoyan" placeholder="导演" clearable  :readonly="ro.daoyan"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="导演" prop="daoyan">
					<el-input v-model="ruleForm.daoyan" placeholder="导演" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="date" v-if="type!='info'" label="上映时间" prop="shangyingshijian">
					<el-date-picker
						format="yyyy 年 MM 月 dd 日"
						value-format="yyyy-MM-dd"
						v-model="ruleForm.shangyingshijian" 
						type="date"
						:readonly="ro.shangyingshijian"
						placeholder="上映时间"
					></el-date-picker> 
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-else-if="ruleForm.shangyingshijian" label="上映时间" prop="shangyingshijian">
					<el-input v-model="ruleForm.shangyingshijian" placeholder="上映时间" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="价格" prop="price">
					<el-input v-model="ruleForm.price" placeholder="价格" clearable  :readonly="ro.price"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="价格" prop="price">
					<el-input v-model="ruleForm.price" placeholder="价格" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="input" v-if="type!='info'"  label="座位总数" prop="number">
					<el-input v-model="ruleForm.number" placeholder="座位总数" clearable  :readonly="ro.number"></el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else class="input" label="座位总数" prop="number">
					<el-input v-model="ruleForm.number" placeholder="座位总数" readonly></el-input>
				</el-form-item>
			</template>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="textarea" v-if="type!='info'" label="主演" prop="zhuyan">
					<el-input
					  style="min-width: 200px; max-width: 600px;"
					  type="textarea"
					  :rows="8"
					  placeholder="主演"
					  v-model="ruleForm.zhuyan" >
					</el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else-if="ruleForm.zhuyan" label="主演" prop="zhuyan">
					<span :style='{"fontSize":"14px","lineHeight":"40px","color":"#00a9aa","fontWeight":"500","display":"inline-block"}'>{{ruleForm.zhuyan}}</span>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' class="textarea" v-if="type!='info'" label="已选座位[用,号隔开]" prop="selected">
					<el-input
					  style="min-width: 200px; max-width: 600px;"
					  type="textarea"
					  :rows="8"
					  placeholder="已选座位[用,号隔开]"
					  v-model="ruleForm.selected" >
					</el-input>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else-if="ruleForm.selected" label="已选座位[用,号隔开]" prop="selected">
					<span :style='{"fontSize":"14px","lineHeight":"40px","color":"#00a9aa","fontWeight":"500","display":"inline-block"}'>{{ruleForm.selected}}</span>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-if="type!='info'"  label="电影简介" prop="dianyingjianjie">
					<editor 
						style="min-width: 200px; max-width: 600px;"
						v-model="ruleForm.dianyingjianjie" 
						class="editor" 
						action="file/upload">
					</editor>
				</el-form-item>
				<el-form-item :style='{"margin":"0 0 20px 0"}' v-else-if="ruleForm.dianyingjianjie" label="电影简介" prop="dianyingjianjie">
                    <span :style='{"fontSize":"14px","lineHeight":"40px","color":"#00a9aa","fontWeight":"500","display":"inline-block"}' v-html="ruleForm.dianyingjianjie"></span>
                </el-form-item>
			<el-form-item :style='{"padding":"0","margin":"0"}' class="btn">
				<el-button :style='{"border":"1px solid #5e9808","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"4px","background":"-webkit-linear-gradient(top,#96d148,#4a7f06)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}'  v-if="type!='info'" type="primary" class="btn-success" @click="onSubmit">提交</el-button>
				<el-button :style='{"border":"1px solid #ccc","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#5b8020","borderRadius":"4px","background":"-webkit-linear-gradient(top,#fff,#ccc)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' v-if="type!='info'" class="btn-close" @click="back()">取消</el-button>
				<el-button :style='{"border":"1px solid #ccc","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#5b8020","borderRadius":"4px","background":"-webkit-linear-gradient(top,#fff,#ccc)","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' v-if="type=='info'" class="btn-close" @click="back()">返回</el-button>
			</el-form-item>
		</el-form>
    

  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isPhone, isMobile,isURL,checkIdCard } from "@/utils/validate";
export default {
	data() {
		let self = this
		var validateIdCard = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!checkIdCard(value)) {
				callback(new Error("请输入正确的身份证号码"));
			} else {
				callback();
			}
		};
		var validateUrl = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isURL(value)) {
				callback(new Error("请输入正确的URL地址"));
			} else {
				callback();
			}
		};
		var validateMobile = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isMobile(value)) {
				callback(new Error("请输入正确的手机号码"));
			} else {
				callback();
			}
		};
		var validatePhone = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isPhone(value)) {
				callback(new Error("请输入正确的电话号码"));
			} else {
				callback();
			}
		};
		var validateEmail = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isEmail(value)) {
				callback(new Error("请输入正确的邮箱地址"));
			} else {
				callback();
			}
		};
		var validateNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isNumber(value)) {
				callback(new Error("请输入数字"));
			} else {
				callback();
			}
		};
		var validateIntNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isIntNumer(value)) {
				callback(new Error("请输入整数"));
			} else {
				callback();
			}
		};
		return {
			id: '',
			type: '',
			
			
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
				clicktime: '',
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
					{ validator: validateIntNumber, trigger: 'blur' },
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
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				crazilynum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				clicktime: [
				],
				clicknum: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				price: [
					{ required: true, message: '价格不能为空', trigger: 'blur' },
					{ validator: validateNumber, trigger: 'blur' },
				],
				number: [
					{ validator: validateIntNumber, trigger: 'blur' },
				],
				selected: [
				],
			}
		};
	},
	props: ["parent"],
	computed: {



	},
    components: {
    },
	created() {
	},
	methods: {
		
		// 下载
		download(file){
			window.open(`${file}`)
		},
		// 初始化
		init(id,type) {
			if (id) {
				this.id = id;
				this.type = type;
			}
			if(this.type=='info'||this.type=='else'){
				this.info(id);
			}else if(this.type=='logistics'){
				this.logistics=false;
				this.info(id);
			}else if(this.type=='cross'){
				var obj = this.$storage.getObj('crossObj');
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
							this.ruleForm.dianyingfengmian = obj[o];
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
			this.$http({
				url: `${this.$storage.get('sessionTable')}/session`,
				method: "get"
			}).then(({ data }) => {
				if (data && data.code === 0) {
					
					var json = data.data;
				} else {
					this.$message.error(data.msg);
				}
			});
			
            this.$http({
				url: `option/dianyingleixing/dianyingleixing`,
				method: "get"
            }).then(({ data }) => {
				if (data && data.code === 0) {
					this.dianyingleixingOptions = data.data;
				} else {
					this.$message.error(data.msg);
				}
            });
			
		},
    // 多级联动参数

    info(id) {
      this.$http({
        url: `dianyingxinxi/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
        this.ruleForm = data.data;
        //解决前台上传图片后台不显示的问题
        let reg=new RegExp('../../../upload','g')//g代表全部
        this.ruleForm.dianyingjianjie = this.ruleForm.dianyingjianjie.replace(reg,'../../../springbootwqc3k/upload');
        } else {
          this.$message.error(data.msg);
        }
      });
    },


    // 提交
    onSubmit() {






	if(this.ruleForm.dianyingfengmian!=null) {
		this.ruleForm.dianyingfengmian = this.ruleForm.dianyingfengmian.replace(new RegExp(this.$base.url,"g"),"");
	}




	if(this.ruleForm.dianyingpianduan!=null) {
		this.ruleForm.dianyingpianduan = this.ruleForm.dianyingpianduan.replace(new RegExp(this.$base.url,"g"),"");
	}





























var objcross = this.$storage.getObj('crossObj');

      //更新跨表属性
       var crossuserid;
       var crossrefid;
       var crossoptnum;
       if(this.type=='cross'){
                var statusColumnName = this.$storage.get('statusColumnName');
                var statusColumnValue = this.$storage.get('statusColumnValue');
                if(statusColumnName!='') {
                        var obj = this.$storage.getObj('crossObj');
                       if(statusColumnName && !statusColumnName.startsWith("[")) {
                               for (var o in obj){
                                 if(o==statusColumnName){
                                   obj[o] = statusColumnValue;
                                 }
                               }
                               var table = this.$storage.get('crossTable');
                             this.$http({
                                 url: `${table}/update`,
                                 method: "post",
                                 data: obj
                               }).then(({ data }) => {});
                       } else {
                               crossuserid=this.$storage.get('userid');
                               crossrefid=obj['id'];
                               crossoptnum=this.$storage.get('statusColumnName');
                               crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                        }
                }
        }
       this.$refs["ruleForm"].validate(valid => {
         if (valid) {
		 if(crossrefid && crossuserid) {
			 this.ruleForm.crossuserid = crossuserid;
			 this.ruleForm.crossrefid = crossrefid;
			let params = { 
				page: 1, 
				limit: 10, 
				crossuserid:this.ruleForm.crossuserid,
				crossrefid:this.ruleForm.crossrefid,
			} 
			this.$http({ 
				url: "dianyingxinxi/page", 
				method: "get", 
				params: params 
			}).then(({ 
				data 
			}) => { 
				if (data && data.code === 0) { 
				       if(data.data.total>=crossoptnum) {
					     this.$message.error(this.$storage.get('tips'));
					       return false;
				       } else {
					 this.$http({
					   url: `dianyingxinxi/${!this.ruleForm.id ? "save" : "update"}`,
					   method: "post",
					   data: this.ruleForm
					 }).then(({ data }) => {
					   if (data && data.code === 0) {
					     this.$message({
					       message: "操作成功",
					       type: "success",
					       duration: 1500,
					       onClose: () => {
						 this.parent.showFlag = true;
						 this.parent.addOrUpdateFlag = false;
						 this.parent.dianyingxinxiCrossAddOrUpdateFlag = false;
						 this.parent.search();
						 this.parent.contentStyleChange();
					       }
					     });
					   } else {
					     this.$message.error(data.msg);
					   }
					 });

				       }
				} else { 
				} 
			});
		 } else {
			 this.$http({
			   url: `dianyingxinxi/${!this.ruleForm.id ? "save" : "update"}`,
			   method: "post",
			   data: this.ruleForm
			 }).then(({ data }) => {
			   if (data && data.code === 0) {
			     this.$message({
			       message: "操作成功",
			       type: "success",
			       duration: 1500,
			       onClose: () => {
				 this.parent.showFlag = true;
				 this.parent.addOrUpdateFlag = false;
				 this.parent.dianyingxinxiCrossAddOrUpdateFlag = false;
				 this.parent.search();
				 this.parent.contentStyleChange();
			       }
			     });
			   } else {
			     this.$message.error(data.msg);
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
      this.parent.showFlag = true;
      this.parent.addOrUpdateFlag = false;
      this.parent.dianyingxinxiCrossAddOrUpdateFlag = false;
      this.parent.contentStyleChange();
    },
    dianyingfengmianUploadChange(fileUrls) {
	    this.ruleForm.dianyingfengmian = fileUrls;
    },
    dianyingpianduanUploadChange(fileUrls) {
	    this.ruleForm.dianyingpianduan = fileUrls;
    },
  }
};
</script>
<style lang="scss" scoped>
	.amap-wrapper {
		width: 100%;
		height: 500px;
	}
	
	.search-box {
		position: absolute;
	}
	
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  	  padding: 0 10px 0 0;
	  	  text-shadow: 0 1px 10px #fff;
	  	  color: #699620;
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
	  	  box-shadow: 0 0 1px #4b681d;
	  	  outline: none;
	  	  color: #00a9aa;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  	  border: 0;
	  	  border-radius: 4px;
	  	  padding: 0 10px;
	  	  box-shadow: 0 0 1px #4b681d;
	  	  outline: none;
	  	  color: #00a9aa;
	  	  width: 200px;
	  	  font-size: 14px;
	  	  height: 40px;
	  	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  	  border: 0;
	  	  border-radius: 4px;
	  	  padding: 0 10px 0 30px;
	  	  box-shadow: 0 0 1px #4b681d;
	  	  outline: none;
	  	  color: #00a9aa;
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
	  	  border: 1px dashed #fff;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #fff;
	  	  width: 200px;
	  	  font-size: 32px;
	  	  line-height: 100px;
	  	  text-align: center;
	  	  height: 100px;
	  	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  	  border: 1px dashed #fff;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #fff;
	  	  width: 200px;
	  	  font-size: 32px;
	  	  line-height: 100px;
	  	  text-align: center;
	  	  height: 100px;
	  	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  	  border: 1px dashed #fff;
	  	  cursor: pointer;
	  	  border-radius: 6px;
	  	  color: #fff;
	  	  width: 200px;
	  	  font-size: 32px;
	  	  line-height: 100px;
	  	  text-align: center;
	  	  height: 100px;
	  	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  	  border: 0;
	  	  border-radius: 4px;
	  	  padding: 12px;
	  	  box-shadow: 0 0 1px #4b681d;
	  	  outline: none;
	  	  color: #00a9aa;
	  	  width: 400px;
	  	  font-size: 14px;
	  	  height: auto;
	  	}
</style>
